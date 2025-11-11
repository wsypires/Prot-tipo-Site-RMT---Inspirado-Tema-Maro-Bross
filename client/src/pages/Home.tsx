import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Zap, ShoppingCart, MessageSquare, Star, TrendingUp } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
        <Header />
        <LeftSidebar />
        <RightSidebar />

        <main className="lg:ml-72 xl:mr-80 pt-20">
          {/* Hero Section */}
          <section className="bg-mario-red border-b-4 border-mario-black p-6 md:p-12">
            <div className="container">
              <h1 className="text-4xl md:text-6xl font-bold text-mario-yellow drop-shadow mb-4" style={{ textShadow: "4px 4px 0 rgba(0,0,0,0.3)" }}>
                🎮 GAME MARKETPLACE
              </h1>
              <p className="text-lg text-mario-white mb-6 font-bold">Compre, venda e troque itens, adena e contas de jogos com segurança!</p>
              <button
                onClick={() => setLocation("/marketplace")}
                className="btn-mario yellow px-8 py-4 text-lg"
              >
                EXPLORAR MARKETPLACE
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="p-6 md:p-12" style={{ backgroundColor: "var(--mario-sky)" }}>
            <div className="container">
              <h2 className="text-3xl font-bold text-mario-black mb-8 drop-shadow" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}>
                ✨ FUNCIONALIDADES
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tokens Feature */}
                <div className="mario-card bg-mario-yellow">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="text-mario-black" size={24} />
                    <h3 className="text-sm font-bold text-mario-black">SISTEMA DE TOKENS</h3>
                  </div>
                  <p className="text-xs text-mario-black/70">
                    Compre tokens para criar ordens. 1000 TOKENS = $1.00. Receba 10 tokens ao se cadastrar!
                  </p>
                </div>

                {/* Marketplace Feature */}
                <div className="mario-card bg-mario-blue text-mario-white">
                  <div className="flex items-center gap-3 mb-3">
                    <ShoppingCart size={24} />
                    <h3 className="text-sm font-bold">MARKETPLACE DINÂMICO</h3>
                  </div>
                  <p className="text-xs opacity-80">
                    Compre e venda Adena, Itens e Contas com filtros avançados e busca em tempo real.
                  </p>
                </div>

                {/* Chat Feature */}
                <div className="mario-card bg-mario-green text-mario-white">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare size={24} />
                    <h3 className="text-sm font-bold">CHAT INTEGRADO</h3>
                  </div>
                  <p className="text-xs opacity-80">
                    Comunique-se diretamente com outros traders para negociar os melhores preços.
                  </p>
                </div>

                {/* Reviews Feature */}
                <div className="mario-card bg-mario-red text-mario-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Star size={24} />
                    <h3 className="text-sm font-bold">SISTEMA DE AVALIAÇÕES</h3>
                  </div>
                  <p className="text-xs opacity-80">
                    Deixe e receba avaliações. Seu índice de confiança determina sua reputação.
                  </p>
                </div>

                {/* Exchange Feature */}
                <div className="mario-card bg-mario-yellow">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="text-mario-black" size={24} />
                    <h3 className="text-sm font-bold text-mario-black">EXCHANGE</h3>
                  </div>
                  <p className="text-xs text-mario-black/70">
                    Visualize o book de ordens de compra e venda em tempo real com filtros.
                  </p>
                </div>

                {/* Security Feature */}
                <div className="mario-card bg-mario-blue text-mario-white">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🔒</span>
                    <h3 className="text-sm font-bold">100% SEGURO</h3>
                  </div>
                  <p className="text-xs opacity-80">
                    Autenticação segura com OAuth. Seus dados estão sempre protegidos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-mario-green border-t-4 border-mario-black p-6 md:p-12">
            <div className="container text-center">
              <h2 className="text-3xl font-bold text-mario-white mb-4 drop-shadow" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>
                Pronto para começar?
              </h2>
              <p className="text-mario-white mb-6">Faça login e comece a negociar agora mesmo!</p>
              <button
                onClick={() => setLocation("/marketplace")}
                className="btn-mario yellow px-8 py-4 text-lg"
              >
                ACESSAR MARKETPLACE
              </button>
            </div>
          </section>
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
        {/* Welcome Section */}
        <section className="bg-mario-blue border-b-4 border-mario-black p-6">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold text-mario-yellow drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
              BEM-VINDO, {user?.name?.toUpperCase() || "TRADER"}!
            </h1>
            <p className="text-xs text-mario-white mt-2">Seu marketplace de confiança para negociar itens de jogos</p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container">
            <h2 className="text-lg font-bold text-mario-black mb-6">AÇÕES RÁPIDAS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setLocation("/marketplace")}
                className="mario-card bg-mario-yellow hover-mario-lift"
              >
                <ShoppingCart className="text-mario-black mb-2" size={24} />
                <p className="text-xs font-bold text-mario-black">EXPLORAR</p>
                <p className="text-xs text-mario-black/70">Marketplace</p>
              </button>

              <button
                onClick={() => setLocation("/create-order")}
                className="mario-card bg-mario-red hover-mario-lift"
              >
                <Zap className="text-mario-white mb-2" size={24} />
                <p className="text-xs font-bold text-mario-white">CRIAR</p>
                <p className="text-xs text-mario-white/70">Ordem</p>
              </button>

              <button
                onClick={() => setLocation("/exchange")}
                className="mario-card bg-mario-green hover-mario-lift"
              >
                <TrendingUp className="text-mario-white mb-2" size={24} />
                <p className="text-xs font-bold text-mario-white">VER</p>
                <p className="text-xs text-mario-white/70">Exchange</p>
              </button>

              <button
                onClick={() => setLocation("/buy-tokens")}
                className="mario-card bg-mario-blue hover-mario-lift"
              >
                <span className="text-2xl mb-2">💰</span>
                <p className="text-xs font-bold text-mario-white">COMPRAR</p>
                <p className="text-xs text-mario-white/70">Tokens</p>
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container">
            <h2 className="text-lg font-bold text-mario-black mb-6">ESTATÍSTICAS</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="mario-card bg-mario-yellow">
                <p className="text-xs text-mario-black/70 mb-2">ORDENS ATIVAS</p>
                <p className="text-3xl font-bold text-mario-black">0</p>
              </div>

              <div className="mario-card bg-mario-blue text-mario-white">
                <p className="text-xs opacity-70 mb-2">TRADES COMPLETADOS</p>
                <p className="text-3xl font-bold">0</p>
              </div>

              <div className="mario-card bg-mario-green text-mario-white">
                <p className="text-xs opacity-70 mb-2">ÍNDICE DE CONFIANÇA</p>
                <p className="text-3xl font-bold">100%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="bg-mario-yellow border-t-4 border-mario-black p-6">
          <div className="container">
            <h2 className="text-lg font-bold text-mario-black mb-4">💡 DICAS</h2>
            <div className="space-y-2">
              <p className="text-xs text-mario-black">✓ Criar uma ordem consome 1 TOKEN</p>
              <p className="text-xs text-mario-black">✓ Cada ordem ativa consome 1 TOKEN a cada 24 horas</p>
              <p className="text-xs text-mario-black">✓ Editar uma ordem consome 0,5 TOKEN</p>
              <p className="text-xs text-mario-black">✓ Você recebeu 10 TOKENS ao se cadastrar!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
