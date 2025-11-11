import cron from "node-cron";
import { getDb } from "./db";
import { orders, users } from "../drizzle/schema";
import { eq, and, lt } from "drizzle-orm";

/**
 * Initialize scheduled tasks
 */
export function initializeScheduler() {
  // Run every day at midnight UTC
  cron.schedule("0 0 * * *", async () => {
    console.log("[Scheduler] Running daily token consumption task...");
    await consumeActiveOrderTokens();
  });

  console.log("[Scheduler] Scheduler initialized");
}

/**
 * Consume 1 token for each active order every 24 hours
 */
async function consumeActiveOrderTokens() {
  try {
    const db = await getDb();
    if (!db) {
      console.warn("[Scheduler] Database not available");
      return;
    }

    // Get all active orders (created more than 24 hours ago)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const activeOrders = await db
      .select()
      .from(orders)
      .where(lt(orders.createdAt, twentyFourHoursAgo));

    console.log(
      `[Scheduler] Found ${activeOrders.length} active orders for token consumption`
    );

    // Consume 1 token for each active order
    for (const order of activeOrders) {
      try {
        // Deduct 1 token from user
        const user = await db
          .select()
          .from(users)
          .where(eq(users.id, order.userId))
          .limit(1);

        if (!user[0]) {
          console.warn(`[Scheduler] User ${order.userId} not found`);
          continue;
        }

        const newTokenBalance = Math.max(0, (user[0].tokens || 0) - 1);

        await db
          .update(users)
          .set({ tokens: newTokenBalance })
          .where(eq(users.id, order.userId));

        console.log(
          `[Scheduler] Consumed 1 token from user ${order.userId} for order ${order.id}`
        );

        // If user runs out of tokens, mark order as inactive or delete it
        if (newTokenBalance === 0) {
          console.log(
            `[Scheduler] User ${order.userId} has no tokens left. Order ${order.id} should be reviewed.`
          );
        }
      } catch (error) {
        console.error(
          `[Scheduler] Error processing order ${order.id}:`,
          error
        );
      }
    }

    console.log("[Scheduler] Daily token consumption task completed");
  } catch (error) {
    console.error("[Scheduler] Error in consumeActiveOrderTokens:", error);
  }
}

/**
 * Run token consumption immediately (for testing)
 */
export async function runTokenConsumptionNow() {
  console.log("[Scheduler] Running token consumption immediately...");
  await consumeActiveOrderTokens();
}
