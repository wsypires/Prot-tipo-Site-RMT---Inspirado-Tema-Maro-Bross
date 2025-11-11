import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Send, MessageCircle, AlertCircle } from "lucide-react";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  senderId: number;
  message: string;
  createdAt: Date;
}

export default function ChatWebSocket() {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState<number>(0);
  const [recipientId, setRecipientId] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: initialMessages = [] } = trpc.chat.getMessages.useQuery(orderId, {
    enabled: orderId > 0,
  });

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = io(window.location.origin, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      if (user?.id) {
        socket.emit("join", user.id);
      }
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    });

    socket.on("newMessage", (data: ChatMessage) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("userTyping", (data: { userId: number; isTyping: boolean }) => {
      if (data.userId !== user?.id) {
        setIsTyping(data.isTyping);
      }
    });

    socket.on("notification", (notification: any) => {
      console.log("Notification received:", notification);
      // Handle notifications (e.g., show toast)
    });

    socket.on("error", (error: string) => {
      console.error("WebSocket error:", error);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [user?.id]);

  // Load initial messages
  useEffect(() => {
    setMessages(
      initialMessages.map((msg: any) => ({
        senderId: msg.senderId,
        message: msg.message,
        createdAt: new Date(msg.createdAt),
      }))
    );
  }, [initialMessages]);

  // Join order room when orderId changes
  useEffect(() => {
    if (orderId > 0 && socketRef.current) {
      socketRef.current.emit("joinOrder", orderId);
    }
  }, [orderId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId || !recipientId || !messageText.trim() || !socketRef.current) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Send via WebSocket
    socketRef.current.emit("sendMessage", {
      orderId,
      senderId: user?.id,
      recipientId,
      message: messageText,
    });

    setMessageText("");

    // Stop typing indicator
    if (socketRef.current) {
      socketRef.current.emit("typing", {
        orderId,
        userId: user?.id,
        isTyping: false,
      });
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);

    // Send typing indicator
    if (socketRef.current && orderId > 0) {
      socketRef.current.emit("typing", {
        orderId,
        userId: user?.id,
        isTyping: true,
      });

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        if (socketRef.current) {
          socketRef.current.emit("typing", {
            orderId,
            userId: user?.id,
            isTyping: false,
          });
        }
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Page Header */}
        <section className="bg-mario-red border-b-4 border-mario-black p-6">
          <div className="container">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-5xl font-bold text-mario-yellow drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
                CHAT
              </h1>
              <div className={`px-3 py-1 rounded-none border-2 border-mario-black ${isConnected ? "bg-mario-green text-mario-white" : "bg-mario-yellow text-mario-black"}`}>
                <p className="text-xs font-bold">{isConnected ? "🟢 CONECTADO" : "🔴 DESCONECTADO"}</p>
              </div>
            </div>
            <p className="text-xs text-mario-white mt-2">Comunique-se com outros traders em tempo real</p>
          </div>
        </section>

        {/* Chat Interface */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-4xl">
            <div className="mario-panel bg-mario-white flex flex-col h-96">
              {/* Chat Header */}
              <div className="border-b-4 border-mario-black p-4 bg-mario-blue text-mario-white">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle size={20} />
                  <h2 className="text-sm font-bold">CONVERSA EM TEMPO REAL</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">ID DA ORDEM</label>
                    <input
                      type="number"
                      value={orderId}
                      onChange={(e) => setOrderId(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 bg-mario-white text-mario-black text-xs font-bold focus:outline-none border border-mario-black"
                      placeholder="ID da ordem"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">ID DO DESTINATÁRIO</label>
                    <input
                      type="number"
                      value={recipientId}
                      onChange={(e) => setRecipientId(parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 bg-mario-white text-mario-black text-xs font-bold focus:outline-none border border-mario-black"
                      placeholder="ID do usuário"
                    />
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-mario-sky">
                {!isConnected && (
                  <div className="flex items-center gap-2 p-3 bg-mario-yellow border-2 border-mario-black rounded-none">
                    <AlertCircle size={16} className="text-mario-black" />
                    <p className="text-xs text-mario-black font-bold">Conectando ao servidor...</p>
                  </div>
                )}

                {orderId === 0 || recipientId === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-xs text-mario-black/70 text-center">
                      Selecione uma ordem e um destinatário para iniciar a conversa
                    </p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-xs text-mario-black/70">Nenhuma mensagem ainda. Comece a conversa!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.senderId === user?.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-none border-2 border-mario-black ${
                          msg.senderId === user?.id
                            ? "bg-mario-blue text-mario-white"
                            : "bg-mario-yellow text-mario-black"
                        }`}
                      >
                        <p className="text-xs font-bold">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-3 py-2 bg-mario-yellow text-mario-black border-2 border-mario-black">
                      <p className="text-xs font-bold">Digitando...</p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="border-t-4 border-mario-black p-4 bg-mario-white flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={handleTyping}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                  disabled={orderId === 0 || recipientId === 0 || !isConnected}
                />
                <button
                  type="submit"
                  disabled={orderId === 0 || recipientId === 0 || !isConnected}
                  className="btn-mario green p-2 flex items-center gap-1 disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
