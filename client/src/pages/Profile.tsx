import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Trophy, Star, Coins, TrendingUp } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [country, setCountry] = useState("");
  const [nickname, setNickname] = useState("");

  const { data: profile } = trpc.profile.getProfile.useQuery();
  const { data: tokenBalance = 0 } = trpc.tokens.getBalance.useQuery();
  const { data: userOrders = [] } = trpc.marketplace.getUserOrders.useQuery();
  const updateProfileMutation = trpc.profile.updateProfile.useMutation();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileMutation.mutateAsync({ country, nickname });
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const trustIndex = profile?.trustIndex ? parseFloat(profile.trustIndex.toString()) : 100;
  const totalReviews = (profile?.positiveReviews || 0) + (profile?.negativeReviews || 0);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Profile Header */}
        <section className="bg-mario-green border-b-4 border-mario-black p-6">
          <div className="container">
            <h1 className="text-3xl md:text-5xl font-bold text-mario-yellow drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
              MEU PERFIL
            </h1>
            <p className="text-xs text-mario-white mt-2">Gerencie sua conta e visualize suas estatísticas</p>
          </div>
        </section>

        {/* Profile Content */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-2">
                <div className="mario-panel bg-mario-white">
                  <h2 className="text-lg font-bold text-mario-black mb-4">INFORMAÇÕES PESSOAIS</h2>

                  {!isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-mario-black/70">ID DO USUÁRIO</p>
                        <p className="text-sm font-bold text-mario-black">{profile?.userId || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-mario-black/70">NICKNAME</p>
                        <p className="text-sm font-bold text-mario-black">{profile?.nickname || "Não definido"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-mario-black/70">PAÍS</p>
                        <p className="text-sm font-bold text-mario-black">{profile?.country || "Não definido"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-mario-black/70">EMAIL</p>
                        <p className="text-sm font-bold text-mario-black">{profile?.email || "N/A"}</p>
                      </div>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="btn-mario blue px-6 py-2 mt-4"
                      >
                        EDITAR PERFIL
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-mario-black mb-2">NICKNAME</label>
                        <input
                          type="text"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                          placeholder="Seu nickname"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-mario-black mb-2">PAÍS</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                          placeholder="Seu país"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={updateProfileMutation.isPending}
                          className="btn-mario red px-6 py-2"
                        >
                          {updateProfileMutation.isPending ? "SALVANDO..." : "SALVAR"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="btn-mario blue px-6 py-2"
                        >
                          CANCELAR
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-4">
                {/* Tokens Card */}
                <div className="mario-card bg-mario-yellow">
                  <div className="flex items-center gap-2 mb-3">
                    <Coins className="text-mario-black" size={20} />
                    <h3 className="text-sm font-bold text-mario-black">TOKENS</h3>
                  </div>
                  <p className="text-2xl font-bold text-mario-black">{tokenBalance}</p>
                  <button className="btn-mario red w-full mt-3 py-2 text-xs">
                    COMPRAR TOKENS
                  </button>
                </div>

                {/* Trust Index Card */}
                <div className="mario-card bg-mario-blue text-mario-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy size={20} />
                    <h3 className="text-sm font-bold">CONFIANÇA</h3>
                  </div>
                  <p className="text-2xl font-bold">{trustIndex.toFixed(1)}%</p>
                  <div className="mt-2 bg-mario-white/20 h-2 border border-mario-white">
                    <div
                      className="bg-mario-yellow h-full"
                      style={{ width: `${trustIndex}%` }}
                    />
                  </div>
                </div>

                {/* Stats Card */}
                <div className="mario-card bg-mario-red text-mario-white">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} />
                        <span className="text-xs font-bold">TRADES</span>
                      </div>
                      <span className="text-lg font-bold">{profile?.totalTrades || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star size={16} />
                        <span className="text-xs font-bold">AVALIAÇÕES</span>
                      </div>
                      <span className="text-lg font-bold">{totalReviews}</span>
                    </div>
                    <div className="border-t border-mario-white/30 pt-2">
                      <p className="text-xs font-bold">
                        👍 {profile?.positiveReviews || 0} | 👎 {profile?.negativeReviews || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Orders Section */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-mario-black mb-4">MINHAS ORDENS ({userOrders.length})</h2>

              {userOrders.length === 0 ? (
                <div className="mario-panel bg-mario-white text-center py-8">
                  <p className="text-xs text-mario-black/70">Você não tem ordens ativas</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div key={order.id} className="mario-card">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-mario-black">{order.server}</p>
                          <p className="text-xs text-mario-black/70">{order.itemType.toUpperCase()}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-bold border-2 border-mario-black ${
                          order.orderType === "buy"
                            ? "bg-mario-blue text-mario-white"
                            : "bg-mario-green text-mario-white"
                        }`}>
                          {order.orderType === "buy" ? "COMPRA" : "VENDA"}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-mario-yellow mt-2">${parseFloat(order.price.toString()).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
