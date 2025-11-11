import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { AlertTriangle, Users, ShoppingCart, BarChart3, Ban, CheckCircle } from "lucide-react";

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"orders" | "users" | "reports">("orders");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Check if user is admin
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
        <Header />
        <main className="lg:ml-72 xl:mr-80 pt-20 flex items-center justify-center">
          <div className="mario-panel bg-mario-red text-mario-white p-8 text-center">
            <AlertTriangle size={48} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">ACESSO NEGADO</h1>
            <p className="text-sm mb-4">Você não tem permissão para acessar esta página.</p>
            <button
              onClick={() => setLocation("/")}
              className="btn-mario yellow"
            >
              Voltar ao Home
            </button>
          </div>
        </main>
      </div>
    );
  }

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
              PAINEL ADMIN
            </h1>
            <p className="text-xs text-mario-white mt-2">Gerenciar ordens, usuários e relatórios</p>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-mario-white border-b-4 border-mario-black p-4">
          <div className="container flex gap-4">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 border-2 border-mario-black font-bold text-xs ${
                activeTab === "orders"
                  ? "bg-mario-yellow text-mario-black"
                  : "bg-mario-white text-mario-black"
              }`}
            >
              <ShoppingCart className="inline mr-2" size={16} />
              ORDENS
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 border-2 border-mario-black font-bold text-xs ${
                activeTab === "users"
                  ? "bg-mario-blue text-mario-white"
                  : "bg-mario-white text-mario-black"
              }`}
            >
              <Users className="inline mr-2" size={16} />
              USUÁRIOS
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 border-2 border-mario-black font-bold text-xs ${
                activeTab === "reports"
                  ? "bg-mario-green text-mario-white"
                  : "bg-mario-white text-mario-black"
              }`}
            >
              <BarChart3 className="inline mr-2" size={16} />
              RELATÓRIOS
            </button>
          </div>
        </section>

        {/* Content */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container">
            {activeTab === "orders" && (
              <div>
                <h2 className="text-lg font-bold text-mario-black mb-4">MODERAÇÃO DE ORDENS</h2>
                <div className="mario-panel bg-mario-white p-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-mario-yellow border-2 border-mario-black rounded-none">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-mario-black">Ordem #12345</p>
                          <p className="text-xs text-mario-black/70">Venda de 5kk Adena - Servidor Aden</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn-mario green px-3 py-1 text-xs">
                            <CheckCircle size={14} className="inline mr-1" />
                            Aprovar
                          </button>
                          <button className="btn-mario red px-3 py-1 text-xs">
                            <Ban size={14} className="inline mr-1" />
                            Rejeitar
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-mario-yellow border-2 border-mario-black rounded-none">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold text-mario-black">Ordem #12346</p>
                          <p className="text-xs text-mario-black/70">Compra de Conta - Servidor Gludio</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn-mario green px-3 py-1 text-xs">
                            <CheckCircle size={14} className="inline mr-1" />
                            Aprovar
                          </button>
                          <button className="btn-mario red px-3 py-1 text-xs">
                            <Ban size={14} className="inline mr-1" />
                            Rejeitar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <h2 className="text-lg font-bold text-mario-black mb-4">GERENCIAMENTO DE USUÁRIOS</h2>
                <div className="mario-panel bg-mario-white p-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-mario-blue text-mario-white border-2 border-mario-black rounded-none">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold">Usuário: DragonSlayer</p>
                          <p className="text-xs opacity-80">ID: 050809 | Trades: 342 | Confiança: 98%</p>
                        </div>
                        <button className="btn-mario red px-3 py-1 text-xs">
                          <Ban size={14} className="inline mr-1" />
                          Banir
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-mario-blue text-mario-white border-2 border-mario-black rounded-none">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold">Usuário: MysticMage</p>
                          <p className="text-xs opacity-80">ID: 123456 | Trades: 45 | Confiança: 65%</p>
                        </div>
                        <button className="btn-mario red px-3 py-1 text-xs">
                          <Ban size={14} className="inline mr-1" />
                          Banir
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-mario-blue text-mario-white border-2 border-mario-black rounded-none">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs font-bold">Usuário: ShadowNinja</p>
                          <p className="text-xs opacity-80">ID: 789012 | Trades: 12 | Confiança: 30% ⚠️</p>
                        </div>
                        <button className="btn-mario red px-3 py-1 text-xs">
                          <Ban size={14} className="inline mr-1" />
                          Banir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div>
                <h2 className="text-lg font-bold text-mario-black mb-4">RELATÓRIOS</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="mario-card bg-mario-yellow">
                    <p className="text-xs text-mario-black/70 mb-2">TOTAL DE ORDENS</p>
                    <p className="text-3xl font-bold text-mario-black">1,247</p>
                  </div>

                  <div className="mario-card bg-mario-blue text-mario-white">
                    <p className="text-xs opacity-70 mb-2">USUÁRIOS ATIVOS</p>
                    <p className="text-3xl font-bold">342</p>
                  </div>

                  <div className="mario-card bg-mario-green text-mario-white">
                    <p className="text-xs opacity-70 mb-2">TRADES COMPLETADOS</p>
                    <p className="text-3xl font-bold">892</p>
                  </div>

                  <div className="mario-card bg-mario-red text-mario-white">
                    <p className="text-xs opacity-70 mb-2">DENÚNCIAS PENDENTES</p>
                    <p className="text-3xl font-bold">23</p>
                  </div>
                </div>

                <div className="mt-6 mario-panel bg-mario-white p-4">
                  <h3 className="text-sm font-bold text-mario-black mb-3">ATIVIDADE RECENTE</h3>
                  <div className="space-y-2 text-xs">
                    <p className="text-mario-black/70">📊 1,247 ordens criadas este mês</p>
                    <p className="text-mario-black/70">💰 $1,234.56 em volume de tokens</p>
                    <p className="text-mario-black/70">⭐ Índice de confiança médio: 85%</p>
                    <p className="text-mario-black/70">🚨 5 usuários banidos esta semana</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
