import { useState } from "react";
<<<<<<< HEAD
import { useLocation } from "wouter";
=======
>>>>>>> 827dd1509dd4ba6b459d5d3ce5057f0eab356045
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Trophy, 
  Swords, 
  Shield,
  Coins,
  Menu,
<<<<<<< HEAD
  X,
  MessageCircle,
  Star,
  DollarSign,
  Lock,
  Bell,
  AlertTriangle,
  HelpCircle,
  TrendingUp
=======
  X
>>>>>>> 827dd1509dd4ba6b459d5d3ce5057f0eab356045
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
<<<<<<< HEAD
  path?: string;
=======
>>>>>>> 827dd1509dd4ba6b459d5d3ce5057f0eab356045
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
<<<<<<< HEAD
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

=======
  { id: "home", label: "HOME", icon: <Home size={16} /> },
  { id: "marketplace", label: "LOJA", icon: <ShoppingCart size={16} />, badge: "NEW" },
  { 
    id: "announce", 
    label: "ANUNCIAR", 
    icon: <Coins size={16} />,
    subItems: [
      { id: "sell-quest", label: "Vender Quest", icon: <QuestIcon /> },
      { id: "sell-items", label: "Vender Itens", icon: <ItemIcon /> },
      { id: "sell-adena", label: "Vender Adena", icon: <AdenaIcon /> },
      { id: "sell-account", label: "Vender Account", icon: <Coins size={16} /> },
      { id: "buy-quest", label: "Comprar Quest", icon: <QuestIcon /> },
      { id: "buy-items", label: "Comprar Itens", icon: <ItemIcon /> },
      { id: "buy-adena", label: "Comprar Adena", icon: <AdenaIcon /> },
      { id: "buy-account", label: "Comprar Account", icon: <Coins size={16} /> },
    ]
  },
  { id: "items", label: "CRIAR ANUNCIO DE VENDA", icon: <Swords size={16} /> },
  { id: "accounts", label: "CONTAS", icon: <Shield size={16} /> },
  { id: "rankings", label: "RANKING", icon: <Trophy size={16} /> },
  { id: "community", label: "GUILDA", icon: <Users size={16} /> },
];

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleItemClick = (item: MenuItem) => {
    if (item.subItems) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      setActiveItem(item.id);
      setIsOpen(false);
      setOpenSubmenu(null); // Fecha qualquer submenu aberto ao selecionar um item principal
    }
  };

>>>>>>> 827dd1509dd4ba6b459d5d3ce5057f0eab356045
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
<<<<<<< HEAD
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
=======
              <div key={item.id}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={`
                    menu-item-mario w-full flex items-center gap-2 px-3 py-2 text-xs
                    ${activeItem === item.id && !item.subItems ? 'active bg-mario-red text-mario-white' : 'bg-mario-white text-mario-black hover:bg-mario-yellow'}
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
                  {item.subItems && (
                    <span className="ml-auto transform transition-transform duration-200">
                      {openSubmenu === item.id ? '▲' : '▼'}
                    </span>
                  )}
                </button>

                {/* Submenu */}
                {item.subItems && openSubmenu === item.id && (
                  <div className="pl-6 pt-1 space-y-1 transition-all duration-300 ease-in-out">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleItemClick(subItem)}
                        className={`
                          w-full flex items-center gap-2 px-2 py-1 text-xs
                          ${activeItem === subItem.id ? 'bg-mario-red text-mario-white shadow-mario-lg' : 'text-mario-black hover:bg-mario-yellow/50'}
                          rounded-sm transition-all duration-150 transform hover:scale-[1.02] active:shadow-mario-lg
                        `}
                      >
                        <span>{subItem.icon}</span>
                        <span className="flex-1 text-left">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
>>>>>>> 827dd1509dd4ba6b459d5d3ce5057f0eab356045
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
