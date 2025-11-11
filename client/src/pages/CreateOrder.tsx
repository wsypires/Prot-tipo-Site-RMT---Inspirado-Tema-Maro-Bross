import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { AlertCircle } from "lucide-react";

export default function CreateOrder() {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [orderType, setOrderType] = useState<"buy" | "sell">("sell");
  const [itemType, setItemType] = useState<"adena" | "item" | "account">("adena");
  const [server, setServer] = useState<string>("");
  const [adenaQuantity, setAdenaQuantity] = useState<number>(0);
  const [itemName, setItemName] = useState<string>("");
  const [itemDescription, setItemDescription] = useState<string>("");
  const [accountDescription, setAccountDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const { data: tokenBalance = 0 } = trpc.tokens.getBalance.useQuery();
  const createOrderMutation = trpc.marketplace.createOrder.useMutation();

  const servers = ["L2 Classic", "L2 Essence", "Tibia", "WoW", "FF14"];

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!server) {
      setError("Por favor, selecione um servidor");
      return;
    }

    if (price <= 0) {
      setError("O preço deve ser maior que zero");
      return;
    }

    if (itemType === "adena" && adenaQuantity <= 0) {
      setError("A quantidade de Adena deve ser maior que zero");
      return;
    }

    if (itemType === "item" && !itemName) {
      setError("Por favor, insira o nome do item");
      return;
    }

    if (itemType === "account" && !accountDescription) {
      setError("Por favor, insira a descrição da conta");
      return;
    }

    try {
      await createOrderMutation.mutateAsync({
        orderType,
        itemType,
        server,
        adenaQuantity: itemType === "adena" ? adenaQuantity : undefined,
        itemName: itemType === "item" ? itemName : undefined,
        itemDescription: itemType === "item" ? itemDescription : undefined,
        accountDescription: itemType === "account" ? accountDescription : undefined,
        price,
      });

      // Redirect to marketplace
      setLocation("/marketplace");
    } catch (err: any) {
      setError(err.message || "Erro ao criar ordem");
    }
  };

  const pricePerKk = itemType === "adena" && adenaQuantity > 0 ? price / adenaQuantity : 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Page Header */}
        <section className="bg-mario-blue border-b-4 border-mario-black p-6">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold text-mario-yellow drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
              CRIAR ORDEM
            </h1>
            <p className="text-xs text-mario-white mt-2">Crie uma nova ordem para comprar ou vender</p>
          </div>
        </section>

        {/* Token Balance Alert */}
        {tokenBalance < 1 && (
          <section className="bg-mario-red border-b-4 border-mario-black p-4">
            <div className="container flex items-center gap-3">
              <AlertCircle className="text-mario-yellow" size={20} />
              <div>
                <p className="text-xs font-bold text-mario-white">SALDO INSUFICIENTE DE TOKENS</p>
                <p className="text-xs text-mario-white/80">Você precisa de pelo menos 1 TOKEN para criar uma ordem</p>
              </div>
              <button className="ml-auto btn-mario yellow px-4 py-2 text-xs">
                COMPRAR TOKENS
              </button>
            </div>
          </section>
        )}

        {/* Form Section */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-2xl">
            <form onSubmit={handleCreateOrder} className="mario-panel bg-mario-white">
              {error && (
                <div className="mb-6 p-4 bg-mario-red border-2 border-mario-black">
                  <p className="text-xs font-bold text-mario-white">{error}</p>
                </div>
              )}

              {/* Order Type */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-mario-black mb-3">TIPO DE ORDEM</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="sell"
                      checked={orderType === "sell"}
                      onChange={(e) => setOrderType(e.target.value as "sell")}
                      className="w-4 h-4"
                    />
                    <span className="text-xs font-bold text-mario-black">VENDER</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="buy"
                      checked={orderType === "buy"}
                      onChange={(e) => setOrderType(e.target.value as "buy")}
                      className="w-4 h-4"
                    />
                    <span className="text-xs font-bold text-mario-black">COMPRAR</span>
                  </label>
                </div>
              </div>

              {/* Item Type */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-mario-black mb-3">TIPO DE ITEM</label>
                <div className="flex gap-4">
                  {["adena", "item", "account"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value={type}
                        checked={itemType === type}
                        onChange={(e) => setItemType(e.target.value as any)}
                        className="w-4 h-4"
                      />
                      <span className="text-xs font-bold text-mario-black">{type.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Server */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-mario-black mb-2">SERVIDOR</label>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                >
                  <option value="">Selecione um servidor</option>
                  {servers.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Item-specific fields */}
              {itemType === "adena" && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-mario-black mb-2">QUANTIDADE (em kk)</label>
                  <input
                    type="number"
                    value={adenaQuantity}
                    onChange={(e) => setAdenaQuantity(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                    placeholder="Ex: 100"
                  />
                  <p className="text-xs text-mario-black/70 mt-1">1kk = 1.000.000 Adena</p>
                </div>
              )}

              {itemType === "item" && (
                <>
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-mario-black mb-2">NOME DO ITEM</label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                      placeholder="Ex: Espada +15"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-bold text-mario-black mb-2">DESCRIÇÃO (Opcional)</label>
                    <textarea
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                      placeholder="Descreva o item..."
                      rows={3}
                    />
                  </div>
                </>
              )}

              {itemType === "account" && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-mario-black mb-2">DESCRIÇÃO DA CONTA</label>
                  <textarea
                    value={accountDescription}
                    onChange={(e) => setAccountDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                    placeholder="Descreva a conta (nível, items, etc)..."
                    rows={3}
                  />
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-mario-black mb-2">PREÇO ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                  placeholder="Ex: 10.50"
                />
                {itemType === "adena" && adenaQuantity > 0 && (
                  <p className="text-xs text-mario-black/70 mt-1">
                    ${pricePerKk.toFixed(2)} por 1kk
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={createOrderMutation.isPending || tokenBalance < 1}
                  className="flex-1 btn-mario red px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createOrderMutation.isPending ? "CRIANDO..." : "GERAR ORDEM"}
                </button>
                <button
                  type="button"
                  onClick={() => setLocation("/marketplace")}
                  className="flex-1 btn-mario blue px-6 py-3"
                >
                  CANCELAR
                </button>
              </div>

              {/* Token Cost Info */}
              <div className="mt-6 p-4 bg-mario-yellow border-2 border-mario-black">
                <p className="text-xs font-bold text-mario-black">⚠️ CUSTO: 1 TOKEN</p>
                <p className="text-xs text-mario-black/70 mt-1">Seu saldo: {tokenBalance} TOKENS</p>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
