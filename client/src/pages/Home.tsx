import { Users, Coins, Swords, Star, Shield, Zap, Heart, Trophy, Sparkles } from "lucide-react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Header from "@/components/Header";
import BadgeShowcase from "@/components/BadgeShowcase";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--mario-sky)' }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      {/* Main Content */}
      <main className="lg:ml-72 xl:mr-80 pt-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--mario-sky)' }}>

          {/* Hero Content */}
          <div className="container text-center space-y-8 py-20">
            <div className="inline-block px-6 py-3 bg-mario-red border-4 border-mario-black mb-4 animate-mario-bounce">
              <p className="text-xs font-bold text-mario-white uppercase tracking-wider">
                ⭐ MARKETPLACE OFICIAL ⭐
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-mario-yellow drop-shadow-lg" style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}>
              BEM-VINDO AO<br />
              RMT GLOBAL
            </h1>

            <p className="text-xs md:text-sm font-bold text-mario-black max-w-2xl mx-auto leading-relaxed drop-shadow">
              O MAIOR MARKETPLACE DE TRADING PARA MMORPGS!<br />
              COMPRE, VENDA E TROQUE COM SEGURANÇA TOTAL!
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto">
              {[
                { label: "USUÁRIOS", value: "12K+", icon: <Users size={20} />, color: "text-mario-green" },
                { label: "TRADES", value: "45K+", icon: <Coins size={20} />, color: "text-mario-yellow" },
                { label: "ITENS", value: "8.5K+", icon: <Swords size={20} />, color: "text-mario-blue" },
                { label: "RATING", value: "98%", icon: <Star size={20} />, color: "text-mario-red" },
              ].map((stat, i) => (
                <div key={i} className="mario-card hover-mario-lift animate-mario-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`${stat.color} mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <p className="text-lg font-bold text-mario-black">{stat.value}</p>
                  <p className="text-xs text-mario-black mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button className="btn-mario red px-8 py-4">
                COMEÇAR AGORA
              </button>
              <button className="btn-mario blue px-8 py-4">
                COMO FUNCIONA
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative bg-mario-white border-t-4 border-mario-black">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-mario-red mb-4 drop-shadow" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}>
                POR QUE ESCOLHER?
              </h2>
              <div className="w-32 h-2 bg-mario-black mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "SEGURANÇA MÁXIMA",
                  description: "Sistema de escrow protegido.",
                  icon: <Shield size={32} />,
                  color: "text-mario-green"
                },
                {
                  title: "TRANSAÇÕES RÁPIDAS",
                  description: "Trades instantâneos em segundos.",
                  icon: <Zap size={32} />,
                  color: "text-mario-yellow"
                },
                {
                  title: "COMUNIDADE ATIVA",
                  description: "Milhões de traders online.",
                  icon: <Users size={32} />,
                  color: "text-mario-blue"
                },
                {
                  title: "ITENS RAROS",
                  description: "Acesso aos melhores itens.",
                  icon: <Sparkles size={32} />,
                  color: "text-mario-red"
                },
                {
                  title: "SISTEMA DE REPUTAÇÃO",
                  description: "Avaliações verificadas.",
                  icon: <Trophy size={32} />,
                  color: "text-mario-green"
                },
                {
                  title: "SUPORTE 24/7",
                  description: "Equipe sempre disponível.",
                  icon: <Heart size={32} />,
                  color: "text-mario-red"
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="mario-card hover-mario-lift"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className={`${feature.color} mb-4 flex justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-bold mb-3 text-mario-black">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-mario-black">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace Preview Section */}
        <section className="py-20 relative border-t-4 border-mario-black" style={{ backgroundColor: 'var(--mario-sky)' }}>
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-mario-blue mb-4 drop-shadow" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}>
                ITENS EM DESTAQUE
              </h2>
              <p className="text-xs text-mario-black">Os melhores itens disponíveis agora!</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                { name: "ESPADA +15", price: "1.250G", rarity: "LENDÁRIO", game: "L2", color: "bg-mario-yellow" },
                { name: "CONTA LV300", price: "3.500G", rarity: "ÉPICO", game: "TIBIA", color: "bg-mario-red" },
                { name: "SET DRAGÃO", price: "890G", rarity: "RARO", game: "WOW", color: "bg-mario-blue" },
                { name: "MOUNT", price: "2.100G", rarity: "MÍTICO", game: "FF14", color: "bg-mario-green" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="mario-card hover-mario-lift"
                >
                  {/* Item Image Placeholder */}
                  <div className={`w-full h-48 ${item.color} rounded-none mb-4 flex items-center justify-center border-4 border-mario-black relative overflow-hidden`}>
                    <Swords className="text-mario-black opacity-40 animate-mario-bounce" size={56} />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-mario-black">{item.name}</h4>
                    <p className="text-xs text-mario-black">{item.game}</p>
                    <div className="flex justify-between items-center pt-2 border-t-2 border-mario-black">
                      <span className="text-xs font-bold text-mario-black">{item.rarity}</span>
                      <span className="text-sm font-bold text-mario-yellow drop-shadow">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="btn-mario blue px-8 py-4">
                VER TODOS OS ITENS →
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative bg-mario-red border-t-4 border-mario-black">
          <div className="container">
            <div className="mario-panel bg-mario-yellow max-w-4xl mx-auto text-center p-12">
              <Sparkles className="text-mario-red mx-auto mb-6 animate-mario-bounce" size={40} />
              
              <h2 className="text-2xl md:text-4xl font-bold text-mario-black mb-4 drop-shadow" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
                PRONTO PARA<br />COMEÇAR?
              </h2>
              
              <p className="text-xs text-mario-black mb-8">
                Junte-se a milhares de traders e comece a ganhar agora!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-mario red px-8 py-4">
                  CRIAR CONTA GRATIS
                </button>
                <button className="btn-mario blue px-8 py-4">
                  SAIBA MAIS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="py-20 relative border-t-4 border-mario-black" style={{ backgroundColor: 'var(--mario-white)' }}>
          <div className="container">
            <BadgeShowcase />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-mario-brown border-t-4 border-mario-black text-mario-white">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold text-sm mb-4 uppercase">RMT GLOBAL</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-mario-yellow transition">Sobre Nós</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">Blog</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">Carreiras</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-4 uppercase">SUPORTE</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-mario-yellow transition">Central de Ajuda</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">Contato</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">Status</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-4 uppercase">LEGAL</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-mario-yellow transition">Privacidade</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">Termos</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">Cookies</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-4 uppercase">COMUNIDADE</h4>
                <ul className="space-y-2 text-xs">
                  <li><a href="#" className="hover:text-mario-yellow transition">Discord</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-mario-yellow transition">YouTube</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-mario-white pt-8 text-center text-xs">
              <p>© 2025 RMT GLOBAL - Todos os Direitos Reservados</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
