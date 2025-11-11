import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Trophy, 
  Swords, 
  Shield,
  Coins,
  Menu,
  X,
  MessageCircle,
  Star,
  DollarSign,
  Lock,
  Bell,
  AlertTriangle,
  HelpCircle,
  TrendingUp
} from "lucide-react";
import adenaIcon from "../assets/adena_icon.png";
import questIcon from "../assets/quest_icon.png";
import itemIcon from "../assets/item_icon.png";

const AdenaIcon = () => <img src={adenaIcon} alt="Adena Icon" className="w-4 h-4" />;
const QuestIcon = () => <img src={questIcon} alt="Quest Icon" className="w-4 h-4" />;
const ItemIcon = () => <img src={itemIcon} alt="Item Icon" className="w-4 h-4" />;

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  path?: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { id: "home", label: "HOME", icon: <Home size={16} />, path: "/" },
  { id: "marketplace", label: "LOJA", icon: <ShoppingCart size={16} />, badge: "NEW", path: "/marketplace" },
  { id: "create-order", label: "CRIAR ANÚNCIO", icon: <Swords size={16} />, path: "/create-order" },
  { id: "exchange", label: "EXCHANGE", icon: <TrendingUp size={16} />, path: "/exchange" },
  { id: "chat", label: "CHAT", icon: <MessageCircle size={16} />, path: "/chat" },
  { id: "reviews", label: "AVALIAÇÕES", icon: <Star size={16} />, path: "/reviews" },
  { id: "buy-tokens", label: "COMPRAR TOKENS", icon: <DollarSign size={16} />, path: "/buy-tokens" },
  { id: "profile", label: "PERFIL", icon: <Users size={16} />, path: "/profile" },
  { id: "notifications", label: "NOTIFICAÇÕES", icon: <Bell size={16} />, path: "/notifications" },
  { id: "reports", label: "DENUNCIAR", icon: <AlertTriangle size={16} />, path: "/reports" },
  { id: "support", label: "SUPORTE", icon: <HelpCircle size={16} />, path: "/support" },
  { id: "admin", label: "ADMIN", icon: <Lock size={16} />, path: "/admin" },
];

export default function LeftSidebar() {
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getActiveItem = () => {
    const item = menuItems.find(m => m.path === location);
    return item?.id || "home";
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      setLocation(item.path);
    }
    setIsOpen(false);
  };

  const activeItem = getActiveItem();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden btn-mario"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-72 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-mario-brown border-r-4 border-mario-black
        `}
      >
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b-4 border-mario-black bg-mario-red">
            <h3 className="font-bold text-xs text-mario-white text-center">MENU</h3>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  menu-item-mario w-full flex items-center gap-2 px-3 py-2 text-xs
                  ${activeItem === item.id ? 'active bg-mario-red text-mario-white' : 'bg-mario-white text-mario-black hover:bg-mario-yellow'}
                  border-2 border-mario-black transition-all
                `}
              >
                <span>{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-1 text-xs bg-mario-red text-mario-white border border-mario-black">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Footer Stats */}
          <div className="p-4 space-y-3 border-t-4 border-mario-black bg-mario-yellow">
            <div className="text-center">
              <p className="text-xs font-bold text-mario-black">ONLINE</p>
              <p className="text-lg font-bold text-mario-red">1.247</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-mario-black">TRADES</p>
              <p className="text-lg font-bold text-mario-blue">89</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
