import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Search } from "lucide-react";

export default function Exchange() {
  const [server, setServer] = useState<string>("");
  const [itemType, setItemType] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data: buyOrders = [], isLoading: buyLoading } = trpc.marketplace.getOrders.useQuery({
    server: server || undefined,
    itemType: (itemType as any) || undefined,
    orderType: "buy",
    search: search || undefined,
  });

  const { data: sellOrders = [], isLoading: sellLoading } = trpc.marketplace.getOrders.useQuery({
    server: server || undefined,
    itemType: (itemType as any) || undefined,
    orderType: "sell",
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Page Header */}
        <section className="bg-mario-yellow border-b-4 border-mario-black p-6">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold text-mario-black drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
              EXCHANGE
            </h1>
            <p className="text-xs text-mario-black mt-2">Book de ordens de compra e venda</p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-mario-white border-b-4 border-mario-black p-6">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Books */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Buy Orders */}
              <div>
                <h2 className="text-lg font-bold text-mario-blue mb-4 drop-shadow" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}>
                  📊 ORDENS DE COMPRA
                </h2>

                {buyLoading ? (
                  <div className="text-center text-mario-black text-xs font-bold">Carregando...</div>
                ) : buyOrders.length === 0 ? (
                  <div className="mario-panel bg-mario-white text-center py-6">
                    <p className="text-xs text-mario-black/70">Nenhuma ordem de compra</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {buyOrders.map((order) => (
                      <div key={order.id} className="mario-card bg-mario-blue text-mario-white">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-xs font-bold">{order.server}</p>
                            <p className="text-xs opacity-80">{getItemTypeLabel(order.itemType)}</p>
                          </div>
                          <p className="text-sm font-bold">{formatPrice(order.price)}</p>
                        </div>

                        {order.itemType === "adena" && (
                          <p className="text-xs opacity-80">Qtd: {order.adenaQuantity?.toLocaleString()}kk</p>
                        )}
                        {order.itemType === "item" && (
                          <p className="text-xs opacity-80">{order.itemName}</p>
                        )}
                        {order.itemType === "account" && (
                          <p className="text-xs opacity-80 truncate">{order.accountDescription}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sell Orders */}
              <div>
                <h2 className="text-lg font-bold text-mario-green mb-4 drop-shadow" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.2)" }}>
                  📈 ORDENS DE VENDA
                </h2>

                {sellLoading ? (
                  <div className="text-center text-mario-black text-xs font-bold">Carregando...</div>
                ) : sellOrders.length === 0 ? (
                  <div className="mario-panel bg-mario-white text-center py-6">
                    <p className="text-xs text-mario-black/70">Nenhuma ordem de venda</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {sellOrders.map((order) => (
                      <div key={order.id} className="mario-card bg-mario-green text-mario-white">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-xs font-bold">{order.server}</p>
                            <p className="text-xs opacity-80">{getItemTypeLabel(order.itemType)}</p>
                          </div>
                          <p className="text-sm font-bold">{formatPrice(order.price)}</p>
                        </div>

                        {order.itemType === "adena" && (
                          <p className="text-xs opacity-80">Qtd: {order.adenaQuantity?.toLocaleString()}kk</p>
                        )}
                        {order.itemType === "item" && (
                          <p className="text-xs opacity-80">{order.itemName}</p>
                        )}
                        {order.itemType === "account" && (
                          <p className="text-xs opacity-80 truncate">{order.accountDescription}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
