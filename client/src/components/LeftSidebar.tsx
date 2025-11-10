import { useState } from "react";
import { 
  Home, 
  ShoppingCart, 
  Users, 
  Trophy, 
  Swords, 
  Shield,
  Coins,
  Menu,
  X
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { id: "home", label: "HOME", icon: <Home size={16} /> },
  { id: "marketplace", label: "LOJA", icon: <ShoppingCart size={16} />, badge: "NEW" },
  { id: "trading", label: "TROCAS", icon: <Coins size={16} /> },
  { id: "items", label: "ITENS", icon: <Swords size={16} /> },
  { id: "accounts", label: "CONTAS", icon: <Shield size={16} /> },
  { id: "rankings", label: "RANKING", icon: <Trophy size={16} /> },
  { id: "community", label: "GUILDA", icon: <Users size={16} /> },
];

export default function LeftSidebar() {
  const [activeItem, setActiveItem] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

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
                onClick={() => {
                  setActiveItem(item.id);
                  setIsOpen(false);
                }}
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
