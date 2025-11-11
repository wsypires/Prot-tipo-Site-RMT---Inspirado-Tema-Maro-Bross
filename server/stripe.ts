import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

if (!stripeSecretKey) {
  console.warn("[Stripe] STRIPE_SECRET_KEY not configured");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-10-29.clover" as any,
});

/**
 * Create a Stripe checkout session for token purchase
 */
export async function createCheckoutSession(params: {
  userId: number;
  tokens: number;
  amount: number; // in dollars
  successUrl: string;
  cancelUrl: string;
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${params.tokens} Game Tokens`,
              description: `Purchase ${params.tokens} tokens for your marketplace account`,
            },
            unit_amount: Math.round(params.amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: {
        userId: params.userId.toString(),
        tokens: params.tokens.toString(),
      },
    });

    return session;
  } catch (error) {
    console.error("[Stripe] Error creating checkout session:", error);
    throw error;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string,
  webhookSecret: string
) {
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("[Stripe] Webhook signature verification failed:", error);
    throw error;
  }
}

/**
 * Handle successful payment
 */
export async function handlePaymentSuccess(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.metadata?.userId || !session.metadata?.tokens) {
      throw new Error("Invalid session metadata");
    }

    return {
      userId: parseInt(session.metadata.userId),
      tokens: parseInt(session.metadata.tokens),
      amount: (session.amount_total || 0) / 100, // Convert from cents
    };
  } catch (error) {
    console.error("[Stripe] Error handling payment success:", error);
    throw error;
  }
}
