import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // RMT Marketplace Fields
  userId: varchar("userId", { length: 6 }).unique(), // 6-digit random ID (e.g., "050809")
  country: varchar("country", { length: 100 }),
  nickname: varchar("nickname", { length: 100 }).unique(),
  tokens: int("tokens").default(10).notNull(), // Starting with 10 tokens
  totalTrades: int("totalTrades").default(0).notNull(),
  positiveReviews: int("positiveReviews").default(0).notNull(),
  negativeReviews: int("negativeReviews").default(0).notNull(),
  trustIndex: decimal("trustIndex", { precision: 5, scale: 2 }).default("100.00").notNull(), // 0-100
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Orders table
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  orderType: mysqlEnum("orderType", ["buy", "sell"]).notNull(), // Buy or Sell
  itemType: mysqlEnum("itemType", ["adena", "item", "account"]).notNull(), // Type of item
  server: varchar("server", { length: 100 }).notNull(), // Server name
  
  // For Adena orders
  adenaQuantity: int("adenaQuantity"), // Quantity in millions (1kk)
  
  // For Item orders
  itemName: varchar("itemName", { length: 255 }),
  itemDescription: text("itemDescription"),
  
  // For Account orders
  accountDescription: text("accountDescription"),
  
  // Common fields
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Price in $
  status: mysqlEnum("status", ["active", "completed", "cancelled"]).default("active").notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// Token transactions table
export const tokenTransactions = mysqlTable("tokenTransactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  amount: int("amount").notNull(), // Positive for add, negative for consume
  reason: varchar("reason", { length: 255 }).notNull(), // e.g., "create_order", "edit_order", "daily_maintenance", "purchase"
  orderId: int("orderId"), // Reference to order if applicable
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TokenTransaction = typeof tokenTransactions.$inferSelect;
export type InsertTokenTransaction = typeof tokenTransactions.$inferInsert;

// Chat messages table
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  senderId: int("senderId").notNull(),
  recipientId: int("recipientId").notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// Reviews/Ratings table
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  reviewerId: int("reviewerId").notNull(), // User who wrote the review
  revieweeId: int("revieweeId").notNull(), // User being reviewed
  rating: mysqlEnum("rating", ["positive", "negative"]).notNull(),
  comment: text("comment"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;