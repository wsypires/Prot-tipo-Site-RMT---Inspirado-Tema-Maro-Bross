import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Send, MessageCircle } from "lucide-react";

export default function Chat() {
  const { user } = useAuth();
  const [orderId, setOrderId] = useState<number>(0);
  const [recipientId, setRecipientId] = useState<number>(0);
  const [messageText, setMessageText] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], refetch: refetchMessages } = trpc.chat.getMessages.useQuery(orderId, {
    enabled: orderId > 0,
  });

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: () => {
      setMessageText("");
      refetchMessages();
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId || !recipientId || !messageText.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    try {
      await sendMessageMutation.mutateAsync({
        orderId,
        recipientId,
        message: messageText,
      });
    } catch (err: any) {
      alert("Erro ao enviar mensagem: " + err.message);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Refresh messages every 2 seconds
  useEffect(() => {
    if (orderId > 0) {
      const interval = setInterval(() => {
        refetchMessages();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [orderId, refetchMessages]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Page Header */}
        <section className="bg-mario-red border-b-4 border-mario-black p-6">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold text-mario-yellow drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
              CHAT
            </h1>
            <p className="text-xs text-mario-white mt-2">Comunique-se com outros traders</p>
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
                  <h2 className="text-sm font-bold">CONVERSA</h2>
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
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="border-t-4 border-mario-black p-4 bg-mario-white flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                  disabled={orderId === 0 || recipientId === 0}
                />
                <button
                  type="submit"
                  disabled={sendMessageMutation.isPending || orderId === 0 || recipientId === 0}
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
