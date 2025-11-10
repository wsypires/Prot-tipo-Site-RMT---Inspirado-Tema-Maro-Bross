import { Bell, Zap, Star, Users2, Gem, Trophy } from "lucide-react";

interface NewsItem {
  title: string;
  time: string;
}

const recentNews: NewsItem[] = [
  { title: "NOVO ITEM LENDARIO!", time: "2h" },
  { title: "MANUTENCAO 15/11", time: "5h" },
  { title: "2X MOEDAS ATIVO", time: "1d" },
];

interface TopTrader {
  name: string;
  trades: number;
}

const topTraders: TopTrader[] = [
  { name: "DragonSlayer", trades: 342 },
  { name: "MysticMage", trades: 298 },
  { name: "ShadowNinja", trades: 276 },
];

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block fixed right-0 top-0 h-screen w-80 z-30">
      <div className="relative h-full flex flex-col gap-3 p-3 overflow-y-auto border-l-4 border-mario-black" style={{ backgroundColor: 'var(--mario-sky)' }}>
        
        {/* Notifications Panel */}
        <div className="mario-panel bg-mario-white">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-mario-black">
            <Bell size={16} className="text-mario-red" />
            <h3 className="text-xs font-bold text-mario-black">AVISOS</h3>
          </div>
          
          <div className="space-y-2">
            {recentNews.map((news, index) => (
              <div
                key={index}
                className="p-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs"
              >
                <p className="font-bold mb-1">{news.title}</p>
                <p className="text-xs opacity-70">{news.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Traders Panel */}
        <div className="mario-panel bg-mario-red text-mario-white">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-mario-black">
            <Trophy size={16} />
            <h3 className="text-xs font-bold">TOP TRADERS</h3>
          </div>
          
          <div className="space-y-2">
            {topTraders.map((trader, index) => (
              <div
                key={index}
                className="p-2 bg-mario-white text-mario-black border-2 border-mario-black"
              >
                <p className="text-xs font-bold">{index + 1}. {trader.name}</p>
                <p className="text-xs opacity-70">{trader.trades} trades</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats Panel */}
        <div className="mario-panel bg-mario-blue text-mario-white">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-mario-black">
            <Zap size={16} />
            <h3 className="text-xs font-bold">STATS</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center p-2 bg-mario-white text-mario-black border-2 border-mario-black">
              <Gem size={16} className="mx-auto mb-1 text-mario-yellow" />
              <p className="text-sm font-bold">2.4K</p>
              <p className="text-xs">ITENS</p>
            </div>
            <div className="text-center p-2 bg-mario-white text-mario-black border-2 border-mario-black">
              <Users2 size={16} className="mx-auto mb-1 text-mario-green" />
              <p className="text-sm font-bold">1.2K</p>
              <p className="text-xs">USUARIOS</p>
            </div>
            <div className="text-center p-2 bg-mario-white text-mario-black border-2 border-mario-black">
              <Star size={16} className="mx-auto mb-1 text-mario-red" />
              <p className="text-sm font-bold">98%</p>
              <p className="text-xs">RATING</p>
            </div>
            <div className="text-center p-2 bg-mario-white text-mario-black border-2 border-mario-black">
              <Trophy size={16} className="mx-auto mb-1 text-mario-yellow" />
              <p className="text-sm font-bold">89</p>
              <p className="text-xs">HOJE</p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
