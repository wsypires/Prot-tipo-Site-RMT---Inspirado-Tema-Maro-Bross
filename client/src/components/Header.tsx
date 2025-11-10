import { APP_LOGO } from "@/const";
import { Search, User, LogIn } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 xl:right-80 z-20 h-20">
      {/* Background */}
      <div className="absolute inset-0 bg-mario-red border-b-4 border-mario-black" />
      
      <div className="relative h-full container flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <img 
            src={APP_LOGO} 
            alt="RMT Global" 
            className="h-12 w-auto object-contain pixel-perfect"
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-mario-black" 
              size={16} 
            />
            <input
              type="text"
              placeholder="BUSCAR ITENS..."
              className="
                w-full pl-10 pr-4 py-2 
                bg-mario-white border-4 border-mario-black
                text-xs font-bold text-mario-black
                focus:outline-none
                placeholder:text-mario-black/50
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search icon for mobile */}
          <button className="md:hidden btn-mario yellow p-2">
            <Search size={16} />
          </button>

          {/* User Menu */}
          <button className="hidden sm:flex items-center gap-2 btn-mario yellow">
            <User size={16} />
            <span className="hidden md:inline">CONTA</span>
          </button>

          {/* Login Button */}
          <button className="btn-mario hidden sm:flex items-center gap-2">
            <LogIn size={16} />
            <span>ENTRAR</span>
          </button>
        </div>
      </div>
    </header>
  );
}
