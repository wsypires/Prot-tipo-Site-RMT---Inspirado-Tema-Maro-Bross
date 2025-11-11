import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Bell, Trash2, CheckCircle, AlertCircle, MessageCircle, TrendingUp } from "lucide-react";

interface Notification {
  id: number;
  type: "message" | "order" | "review" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  relatedId?: number;
}

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "message",
      title: "Nova Mensagem",
      message: "DragonSlayer enviou uma mensagem sobre a ordem #12345",
      read: false,
      createdAt: new Date(Date.now() - 5 * 60000),
      relatedId: 12345,
    },
    {
      id: 2,
      type: "order",
      title: "Ordem Atualizada",
      message: "Sua ordem de venda de 5kk Adena foi visualizada 12 vezes",
      read: false,
      createdAt: new Date(Date.now() - 15 * 60000),
      relatedId: 12345,
    },
    {
      id: 3,
      type: "review",
      title: "Nova Avaliação",
      message: "MysticMage deixou uma avaliação positiva ⭐⭐⭐⭐⭐",
      read: true,
      createdAt: new Date(Date.now() - 1 * 3600000),
      relatedId: 123,
    },
    {
      id: 4,
      type: "system",
      title: "Manutenção do Sistema",
      message: "Manutenção programada para hoje às 22:00 UTC",
      read: true,
      createdAt: new Date(Date.now() - 2 * 3600000),
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle size={20} className="text-mario-blue" />;
      case "order":
        return <TrendingUp size={20} className="text-mario-yellow" />;
      case "review":
        return <CheckCircle size={20} className="text-mario-green" />;
      case "system":
        return <AlertCircle size={20} className="text-mario-red" />;
      default:
        return <Bell size={20} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-mario-blue/20 border-mario-blue";
      case "order":
        return "bg-mario-yellow/20 border-mario-yellow";
      case "review":
        return "bg-mario-green/20 border-mario-green";
      case "system":
        return "bg-mario-red/20 border-mario-red";
      default:
        return "bg-mario-white border-mario-black";
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Page Header */}
        <section className="bg-mario-yellow border-b-4 border-mario-black p-6">
          <div className="container">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl md:text-5xl font-bold text-mario-black drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.1)" }}>
                NOTIFICAÇÕES
              </h1>
              {unreadCount > 0 && (
                <div className="bg-mario-red text-mario-white px-4 py-2 border-2 border-mario-black rounded-none">
                  <p className="text-sm font-bold">{unreadCount} NÃO LIDAS</p>
                </div>
              )}
            </div>
            <p className="text-xs text-mario-black/70 mt-2">Fique atualizado com todas as atividades da plataforma</p>
          </div>
        </section>

        {/* Filters and Actions */}
        <section className="bg-mario-white border-b-4 border-mario-black p-4">
          <div className="container flex justify-between items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 border-2 border-mario-black font-bold text-xs ${
                  filter === "all"
                    ? "bg-mario-blue text-mario-white"
                    : "bg-mario-white text-mario-black"
                }`}
              >
                TODAS ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 border-2 border-mario-black font-bold text-xs ${
                  filter === "unread"
                    ? "bg-mario-red text-mario-white"
                    : "bg-mario-white text-mario-black"
                }`}
              >
                NÃO LIDAS ({unreadCount})
              </button>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="btn-mario green text-xs px-3 py-1"
              >
                Marcar Tudo como Lido
              </button>
            )}
          </div>
        </section>

        {/* Notifications List */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-3xl">
            {filteredNotifications.length === 0 ? (
              <div className="mario-panel bg-mario-white p-8 text-center">
                <Bell size={48} className="mx-auto mb-4 text-mario-black/30" />
                <p className="text-sm text-mario-black/70">Nenhuma notificação</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`mario-panel p-4 border-2 ${getNotificationColor(notification.type)} ${
                      !notification.read ? "border-mario-black" : "border-mario-black/30"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 pt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-bold text-mario-black">
                              {notification.title}
                              {!notification.read && (
                                <span className="ml-2 inline-block w-2 h-2 bg-mario-red rounded-full"></span>
                              )}
                            </h3>
                            <p className="text-xs text-mario-black/70 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-mario-black/50 mt-2">
                              {new Date(notification.createdAt).toLocaleString("pt-BR")}
                            </p>
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="btn-mario green px-2 py-1 text-xs"
                                title="Marcar como lido"
                              >
                                <CheckCircle size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(notification.id)}
                              className="btn-mario red px-2 py-1 text-xs"
                              title="Deletar"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Notification Settings */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-3xl">
            <div className="mario-panel bg-mario-white p-6">
              <h2 className="text-lg font-bold text-mario-black mb-4">⚙️ CONFIGURAÇÕES DE NOTIFICAÇÕES</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-bold text-mario-black">
                    Notificações de Mensagens
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-bold text-mario-black">
                    Notificações de Ordens
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-bold text-mario-black">
                    Notificações de Reviews
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-bold text-mario-black">
                    Notificações do Sistema
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-bold text-mario-black">
                    Notificações Push do Navegador
                  </span>
                </label>
              </div>

              <button className="btn-mario blue mt-6 w-full">
                Salvar Configurações
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
