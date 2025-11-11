import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Coins, ShoppingCart } from "lucide-react";

export default function BuyTokens() {
  const { user } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState<"small" | "medium" | "large" | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(0);

  const { data: tokenBalance = 0 } = trpc.tokens.getBalance.useQuery();
  const buyTokensMutation = trpc.tokens.buyTokens.useMutation();

  const packages = [
    {
      id: "small",
      name: "Iniciante",
      tokens: 1000,
      price: 1.0,
      color: "mario-blue",
      badge: "POPULAR",
    },
    {
      id: "medium",
      name: "Profissional",
      tokens: 5000,
      price: 4.5,
      color: "mario-green",
      badge: "MELHOR VALOR",
    },
    {
      id: "large",
      name: "Empresarial",
      tokens: 10000,
      price: 8.0,
      color: "mario-red",
      badge: "MÁXIMO DESCONTO",
    },
  ];

  const handleBuyPackage = async (packageId: string) => {
    const pkg = packages.find((p) => p.id === packageId);
    if (!pkg) return;

    try {
      await buyTokensMutation.mutateAsync({
        amount: pkg.price,
      });

      alert(`Compra de ${pkg.tokens} tokens realizada com sucesso!`);
      setSelectedPackage(null);
    } catch (err: any) {
      alert("Erro ao comprar tokens: " + err.message);
    }
  };

  const customPrice = customAmount > 0 ? (customAmount / 1000) * 1 : 0;

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
              COMPRAR TOKENS
            </h1>
            <p className="text-xs text-mario-black mt-2">Aumente seu saldo de tokens para criar mais ordens</p>
          </div>
        </section>

        {/* Current Balance */}
        <section className="bg-mario-white border-b-4 border-mario-black p-6">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Coins className="text-mario-yellow" size={32} />
                <div>
                  <p className="text-xs text-mario-black/70">SEU SALDO ATUAL</p>
                  <p className="text-2xl font-bold text-mario-black">{tokenBalance} TOKENS</p>
                </div>
              </div>
              <p className="text-xs text-mario-black/70">
                = ${(tokenBalance / 1000).toFixed(2)}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container">
            {/* Packages Grid */}
            <div className="mb-12">
              <h2 className="text-lg font-bold text-mario-black mb-6">PACOTES DISPONÍVEIS</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`mario-card bg-${pkg.color} text-mario-white relative overflow-hidden`}
                  >
                    {/* Badge */}
                    <div className="absolute top-0 right-0 bg-mario-yellow text-mario-black px-3 py-1 text-xs font-bold border-l-2 border-b-2 border-mario-black">
                      {pkg.badge}
                    </div>

                    {/* Content */}
                    <div className="pt-6">
                      <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>

                      <div className="mb-4 pb-4 border-b-2 border-mario-white/30">
                        <p className="text-3xl font-bold">{pkg.tokens.toLocaleString()}</p>
                        <p className="text-xs opacity-80">TOKENS</p>
                      </div>

                      <div className="mb-6">
                        <p className="text-2xl font-bold">${pkg.price.toFixed(2)}</p>
                        <p className="text-xs opacity-80">
                          ${(pkg.price / pkg.tokens * 1000).toFixed(4)} por 1000 tokens
                        </p>
                      </div>

                      <button
                        onClick={() => handleBuyPackage(pkg.id)}
                        disabled={buyTokensMutation.isPending}
                        className="w-full btn-mario yellow text-mario-black px-4 py-2 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={16} />
                        COMPRAR
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="max-w-2xl">
              <h2 className="text-lg font-bold text-mario-black mb-4">COMPRA PERSONALIZADA</h2>

              <div className="mario-panel bg-mario-white">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-mario-black mb-2">QUANTIDADE DE TOKENS</label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                      placeholder="Ex: 2500"
                      min="0"
                      step="100"
                    />
                    <p className="text-xs text-mario-black/70 mt-1">Mínimo: 100 tokens</p>
                  </div>

                  {customAmount > 0 && (
                    <div className="p-4 bg-mario-blue text-mario-white border-2 border-mario-black">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold">TOKENS:</span>
                        <span className="text-sm font-bold">{customAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold">PREÇO:</span>
                        <span className="text-sm font-bold">${customPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (customAmount < 100) {
                        alert("Mínimo de 100 tokens");
                        return;
                      }
                      // Handle custom purchase
                      buyTokensMutation.mutate({ amount: customPrice });
                      setCustomAmount(0);
                    }}
                    disabled={customAmount < 100 || buyTokensMutation.isPending}
                    className="w-full btn-mario red px-4 py-3 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    {buyTokensMutation.isPending ? "PROCESSANDO..." : "COMPRAR AGORA"}
                  </button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="mario-card bg-mario-red text-mario-white">
                <h3 className="text-sm font-bold mb-2">💰 CONVERSÃO</h3>
                <p className="text-xs">1000 TOKENS = $1.00</p>
              </div>

              <div className="mario-card bg-mario-green text-mario-white">
                <h3 className="text-sm font-bold mb-2">⚡ INSTANTÂNEO</h3>
                <p className="text-xs">Receba seus tokens imediatamente após o pagamento</p>
              </div>

              <div className="mario-card bg-mario-blue text-mario-white">
                <h3 className="text-sm font-bold mb-2">🔒 SEGURO</h3>
                <p className="text-xs">Pagamentos processados com segurança via Stripe</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
