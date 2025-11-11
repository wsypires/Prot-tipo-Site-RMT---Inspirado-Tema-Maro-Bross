import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { generateRandomUserId, updateUserTokens, getUserOrders, getActiveOrders, getOrdersByServer, getOrdersByItemType, createTokenTransaction } from "./db";
import { getDb } from "./db";
import { users, orders, tokenTransactions, chatMessages, reviews } from "../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Marketplace routers
  marketplace: router({
    // Get all active orders with optional filters
    getOrders: publicProcedure
      .input(z.object({
        server: z.string().optional(),
        itemType: z.enum(["adena", "item", "account"]).optional(),
        orderType: z.enum(["buy", "sell"]).optional(),
        search: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        
        let conditions = [eq(orders.status, "active")];
        
        if (input?.server) {
          conditions.push(eq(orders.server, input.server));
        }
        if (input?.itemType) {
          conditions.push(eq(orders.itemType, input.itemType));
        }
        if (input?.orderType) {
          conditions.push(eq(orders.orderType, input.orderType));
        }
        
        return await db.select().from(orders).where(and(...conditions));
      }),
    
    // Create a new order
    createOrder: protectedProcedure
      .input(z.object({
        orderType: z.enum(["buy", "sell"]),
        itemType: z.enum(["adena", "item", "account"]),
        server: z.string(),
        adenaQuantity: z.number().optional(),
        itemName: z.string().optional(),
        itemDescription: z.string().optional(),
        accountDescription: z.string().optional(),
        price: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        // Check if user has enough tokens
        const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
        if (!user[0] || user[0].tokens < 1) {
          throw new Error("Insufficient tokens. Please buy more tokens.");
        }
        
        // Create the order
        const result = await db.insert(orders).values({
          userId: ctx.user.id,
          orderType: input.orderType,
          itemType: input.itemType,
          server: input.server,
          adenaQuantity: input.adenaQuantity,
          itemName: input.itemName,
          itemDescription: input.itemDescription,
          accountDescription: input.accountDescription,
          price: input.price.toString(),
          status: "active",
        });
        
        // Consume 1 token
        await updateUserTokens(ctx.user.id, -1);
        const orderId = (result as any).insertId || 1;
        await createTokenTransaction(ctx.user.id, -1, "create_order", orderId);
        
        return { success: true, orderId };
      }),
    
    // Get user's orders
    getUserOrders: protectedProcedure.query(async ({ ctx }) => {
      return await getUserOrders(ctx.user.id);
    }),
    
    // Get order details
    getOrder: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        const result = await db.select().from(orders).where(eq(orders.id, input)).limit(1);
        return result[0] || null;
      }),
  }),
  
  tokens: router({
    // Get user's token balance
    getBalance: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return 0;
      const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
      return user[0]?.tokens || 0;
    }),
    
    // Buy tokens (placeholder - in real app, integrate with payment system)
    buyTokens: protectedProcedure
      .input(z.object({ amount: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // 1000 TOKENS = 1 $
        const tokensToAdd = input.amount * 1000;
        await updateUserTokens(ctx.user.id, tokensToAdd);
        await createTokenTransaction(ctx.user.id, tokensToAdd, "purchase");
        return { success: true, tokensAdded: tokensToAdd };
      }),
  }),
  
  profile: router({
    // Get user profile
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return null;
      const user = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
      return user[0] || null;
    }),
    
    // Update user profile
    updateProfile: protectedProcedure
      .input(z.object({
        country: z.string().optional(),
        nickname: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        await db.update(users).set({
          country: input.country,
          nickname: input.nickname,
        }).where(eq(users.id, ctx.user.id));
        
        return { success: true };
      }),
  }),
  
  chat: router({
    // Send a message
    sendMessage: protectedProcedure
      .input(z.object({
        orderId: z.number(),
        recipientId: z.number(),
        message: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        const result = await db.insert(chatMessages).values({
          orderId: input.orderId,
          senderId: ctx.user.id,
          recipientId: input.recipientId,
          message: input.message,
          isRead: false,
        });
        
        return { success: true, messageId: (result as any).insertId };
      }),
    
    // Get messages for an order
    getMessages: protectedProcedure
      .input(z.number())
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return [];
        
        const messages = await db.select().from(chatMessages).where(
          and(eq(chatMessages.orderId, input))
        );
        
        return messages;
      }),
  }),
  
  reviews: router({
    // Create a review
    createReview: protectedProcedure
      .input(z.object({
        orderId: z.number(),
        revieweeId: z.number(),
        rating: z.enum(["positive", "negative"]),
        comment: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        // Create review
        await db.insert(reviews).values({
          orderId: input.orderId,
          reviewerId: ctx.user.id,
          revieweeId: input.revieweeId,
          rating: input.rating,
          comment: input.comment,
        });
        
        // Update user stats
        const reviewField = input.rating === "positive" ? "positiveReviews" : "negativeReviews";
        await db.update(users).set({
          [reviewField]: sql`${reviewField} + 1`,
          totalTrades: sql`totalTrades + 1`,
        }).where(eq(users.id, input.revieweeId));
        
        // Calculate new trust index
        const user = await db.select().from(users).where(eq(users.id, input.revieweeId)).limit(1);
        if (user[0]) {
          const positive = user[0].positiveReviews + (input.rating === "positive" ? 1 : 0);
          const negative = user[0].negativeReviews + (input.rating === "negative" ? 1 : 0);
          const total = positive + negative;
          const trustIndex = total > 0 ? (positive / total) * 100 : 100;
          
          await db.update(users).set({
            trustIndex: trustIndex.toString(),
          }).where(eq(users.id, input.revieweeId));
        }
        
        return { success: true };
      }),
    
    // Get reviews for a user
    getUserReviews: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        
        return await db.select().from(reviews).where(eq(reviews.revieweeId, input));
      }),
  }),
});

export type AppRouter = typeof appRouter;
