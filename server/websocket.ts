import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { getDb } from "./db";
import { chatMessages } from "../drizzle/schema";

interface ChatMessage {
  orderId: number;
  senderId: number;
  recipientId: number;
  message: string;
  timestamp: Date;
}

export function initializeWebSocket(httpServer: HTTPServer) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Store active connections
  const userConnections = new Map<number, Set<string>>();

  io.on("connection", (socket: Socket) => {
    console.log(`[WebSocket] User connected: ${socket.id}`);

    // Join user to their personal room
    socket.on("join", (userId: number) => {
      socket.join(`user:${userId}`);

      if (!userConnections.has(userId)) {
        userConnections.set(userId, new Set());
      }
      userConnections.get(userId)!.add(socket.id);

      console.log(`[WebSocket] User ${userId} joined room user:${userId}`);
    });

    // Join order chat room
    socket.on("joinOrder", (orderId: number) => {
      socket.join(`order:${orderId}`);
      console.log(`[WebSocket] Socket ${socket.id} joined order room order:${orderId}`);
    });

    // Send message
    socket.on(
      "sendMessage",
      async (data: {
        orderId: number;
        senderId: number;
        recipientId: number;
        message: string;
      }) => {
        try {
          const db = await getDb();
          if (!db) {
            socket.emit("error", "Database not available");
            return;
          }

          // Save message to database
          await db.insert(chatMessages).values({
            orderId: data.orderId,
            senderId: data.senderId,
            recipientId: data.recipientId,
            message: data.message,
            createdAt: new Date(),
          });

          // Broadcast message to order room
          io.to(`order:${data.orderId}`).emit("newMessage", {
            orderId: data.orderId,
            senderId: data.senderId,
            recipientId: data.recipientId,
            message: data.message,
            timestamp: new Date(),
          });

          // Send notification to recipient
          io.to(`user:${data.recipientId}`).emit("notification", {
            type: "new_message",
            orderId: data.orderId,
            senderId: data.senderId,
            message: `Você recebeu uma mensagem sobre a ordem #${data.orderId}`,
          });

          console.log(
            `[WebSocket] Message sent from ${data.senderId} to ${data.recipientId} on order ${data.orderId}`
          );
        } catch (error) {
          console.error("[WebSocket] Error sending message:", error);
          socket.emit("error", "Failed to send message");
        }
      }
    );

    // Typing indicator
    socket.on(
      "typing",
      (data: { orderId: number; userId: number; isTyping: boolean }) => {
        io.to(`order:${data.orderId}`).emit("userTyping", {
          orderId: data.orderId,
          userId: data.userId,
          isTyping: data.isTyping,
        });
      }
    );

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`[WebSocket] User disconnected: ${socket.id}`);

      // Remove from user connections
      userConnections.forEach((sockets, userId) => {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);
          if (sockets.size === 0) {
            userConnections.delete(userId);
          }
        }
      });
    });

    // Error handling
    socket.on("error", (error) => {
      console.error(`[WebSocket] Socket error: ${error}`);
    });
  });

  console.log("[WebSocket] WebSocket server initialized");

  return io;
}

/**
 * Send notification to a user
 */
export function sendNotificationToUser(
  io: SocketIOServer,
  userId: number,
  notification: any
) {
  io.to(`user:${userId}`).emit("notification", notification);
}

/**
 * Send message to order room
 */
export function sendMessageToOrder(
  io: SocketIOServer,
  orderId: number,
  message: ChatMessage
) {
  io.to(`order:${orderId}`).emit("newMessage", message);
}
