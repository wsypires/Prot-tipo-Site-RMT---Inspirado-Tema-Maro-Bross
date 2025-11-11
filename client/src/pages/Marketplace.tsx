import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { MessageCircle, Search } from "lucide-react";

export default function Marketplace() {
  const { user, isAuthenticated } = useAuth();
  const [server, setServer] = useState<string>("");
  const [itemType, setItemType] = useState<string>("");
  const [orderType, setOrderType] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data: orders = [], isLoading } = trpc.marketplace.getOrders.useQuery({
    server: server || undefined,
    itemType: (itemType as any) || undefined,
    orderType: (orderType as any) || undefined,
    search: search || undefined,
  });

  const servers = ["L2 Classic", "L2 Essence", "Tibia", "WoW", "FF14"];
  const itemTypes = ["adena", "item", "account"];

  const formatPrice = (price: string | number) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return `$${num.toFixed(2)}`;
  };

  const getItemTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      adena: "Adena",
      item: "Item",
      account: "Conta",
    };
    return labels[type] || type;
  };

  const getOrderTypeLabel = (type: string) => {
    return type === "buy" ? "Compra" : "Venda";
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Marketplace Header */}
        <section className="bg-mario-red border-b-4 border-mario-black p-6">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold text-mario-yellow drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
              MARKETPLACE
            </h1>
            <p className="text-xs text-mario-white mt-2">Compre, venda e troque com segurança!</p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-mario-white border-b-4 border-mario-black p-6">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Server Filter */}
              <div>
                <label className="block text-xs font-bold text-mario-black mb-2">SERVIDOR</label>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                >
                  <option value="">TODOS</option>
                  {servers.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Item Type Filter */}
              <div>
                <label className="block text-xs font-bold text-mario-black mb-2">TIPO</label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                >
                  <option value="">TODOS</option>
                  {itemTypes.map((t) => (
                    <option key={t} value={t}>
                      {getItemTypeLabel(t)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Order Type Filter */}
              <div>
                <label className="block text-xs font-bold text-mario-black mb-2">ORDEM</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                >
                  <option value="">TODAS</option>
                  <option value="buy">COMPRA</option>
                  <option value="sell">VENDA</option>
                </select>
              </div>

              {/* Search */}
              <div>
                <label className="block text-xs font-bold text-mario-black mb-2">BUSCAR</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-mario-black" size={16} />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none placeholder:text-mario-black/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Orders Grid */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container">
            {isLoading ? (
              <div className="text-center text-mario-black text-xs font-bold">Carregando ordens...</div>
            ) : orders.length === 0 ? (
              <div className="text-center text-mario-black text-xs font-bold">Nenhuma ordem encontrada</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="mario-card hover-mario-lift">
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-4 pb-3 border-b-2 border-mario-black">
                      <div>
                        <p className="text-xs font-bold text-mario-black">{order.server}</p>
                        <p className="text-xs text-mario-black/70">{getItemTypeLabel(order.itemType)}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold border-2 border-mario-black ${
                        order.orderType === "buy"
                          ? "bg-mario-blue text-mario-white"
                          : "bg-mario-green text-mario-white"
                      }`}>
                        {getOrderTypeLabel(order.orderType)}
                      </span>
                    </div>

                    {/* Order Details */}
                    <div className="space-y-2 mb-4">
                      {order.itemType === "adena" && (
                        <div>
                          <p className="text-xs text-mario-black/70">Quantidade</p>
                          <p className="text-sm font-bold text-mario-black">{order.adenaQuantity?.toLocaleString()}kk</p>
                        </div>
                      )}
                      {order.itemType === "item" && (
                        <div>
                          <p className="text-xs text-mario-black/70">Item</p>
                          <p className="text-sm font-bold text-mario-black">{order.itemName}</p>
                          {order.itemDescription && (
                            <p className="text-xs text-mario-black/70 mt-1">{order.itemDescription}</p>
                          )}
                        </div>
                      )}
                      {order.itemType === "account" && (
                        <div>
                          <p className="text-xs text-mario-black/70">Descrição</p>
                          <p className="text-xs text-mario-black">{order.accountDescription}</p>
                        </div>
                      )}
                    </div>

                    {/* Price and Action */}
                    <div className="flex justify-between items-center pt-3 border-t-2 border-mario-black">
                      <p className="text-sm font-bold text-mario-yellow drop-shadow">{formatPrice(order.price)}</p>
                      <button className="btn-mario yellow p-2 flex items-center gap-2">
                        <MessageCircle size={14} />
                        <span className="hidden sm:inline">MENSAGEM</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
