import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { createCheckoutSession } from "../stripe";

export const stripeRouter = router({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        tokens: z.number().min(100),
        amount: z.number().min(0.01),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const session = await createCheckoutSession({
          userId: ctx.user.id,
          tokens: input.tokens,
          amount: input.amount,
          successUrl: `${process.env.VITE_FRONTEND_URL || "http://localhost:5173"}/buy-tokens?success=true`,
          cancelUrl: `${process.env.VITE_FRONTEND_URL || "http://localhost:5173"}/buy-tokens?canceled=true`,
        });

        return {
          success: true,
          sessionId: session.id,
          url: session.url,
        };
      } catch (error: any) {
        console.error("[Stripe] Error creating checkout session:", error);
        throw new Error("Failed to create checkout session");
      }
    }),
});
