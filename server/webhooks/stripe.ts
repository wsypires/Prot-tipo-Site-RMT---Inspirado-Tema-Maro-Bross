import { Request, Response } from "express";
import { verifyWebhookSignature, handlePaymentSuccess } from "../stripe";
import { getDb } from "../db";
import { users, tokenTransactions } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function handleStripeWebhook(req: Request, res: Response) {
  if (!webhookSecret) {
    console.warn("[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured");
    return res.status(400).json({ error: "Webhook secret not configured" });
  }

  const signature = req.headers["stripe-signature"] as string;

  try {
    const event = verifyWebhookSignature(
      req.body,
      signature,
      webhookSecret
    );

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case "payment_intent.succeeded":
        console.log("[Stripe Webhook] Payment intent succeeded");
        break;

      case "payment_intent.payment_failed":
        console.log("[Stripe Webhook] Payment intent failed");
        break;

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error("[Stripe Webhook] Error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  try {
    const paymentData = await handlePaymentSuccess(session.id);

    const db = await getDb();
    if (!db) {
      console.error("[Stripe Webhook] Database not available");
      return;
    }

    // Update user tokens
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, paymentData.userId))
      .limit(1);

    if (!user[0]) {
      console.error(
        `[Stripe Webhook] User ${paymentData.userId} not found`
      );
      return;
    }

    const newTokenBalance = (user[0].tokens || 0) + paymentData.tokens;

    await db
      .update(users)
      .set({ tokens: newTokenBalance })
      .where(eq(users.id, paymentData.userId));

    // Record transaction
    await db.insert(tokenTransactions).values({
      userId: paymentData.userId,
      amount: paymentData.tokens,
      reason: `Stripe payment: ${paymentData.tokens} tokens for $${paymentData.amount}`,
    });

    console.log(
      `[Stripe Webhook] Payment processed: User ${paymentData.userId} received ${paymentData.tokens} tokens`
    );
  } catch (error) {
    console.error("[Stripe Webhook] Error handling checkout session:", error);
  }
}
