import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";

export default function Reviews() {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number>(0);
  const [rating, setRating] = useState<"positive" | "negative">("positive");
  const [comment, setComment] = useState<string>("");

  const { data: userReviews = [] } = trpc.reviews.getUserReviews.useQuery(
    selectedUserId || 0,
    { enabled: !!selectedUserId }
  );

  const createReviewMutation = trpc.reviews.createReview.useMutation();

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId || orderId === 0) {
      alert("Por favor, selecione um usuário e uma ordem");
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        orderId,
        revieweeId: selectedUserId,
        rating,
        comment: comment || undefined,
      });

      setComment("");
      setOrderId(0);
      setRating("positive");
      alert("Review criado com sucesso!");
    } catch (err: any) {
      alert("Erro ao criar review: " + err.message);
    }
  };

  const positiveCount = userReviews.filter((r) => r.rating === "positive").length;
  const negativeCount = userReviews.filter((r) => r.rating === "negative").length;
  const totalReviews = positiveCount + negativeCount;
  const trustPercentage = totalReviews > 0 ? (positiveCount / totalReviews) * 100 : 0;

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
              AVALIAÇÕES
            </h1>
            <p className="text-xs text-mario-black mt-2">Deixe e visualize avaliações de traders</p>
          </div>
        </section>

        {/* Content */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Review Form */}
              <div className="lg:col-span-1">
                <div className="mario-panel bg-mario-white sticky top-24">
                  <h2 className="text-lg font-bold text-mario-black mb-4">DEIXAR AVALIAÇÃO</h2>

                  <form onSubmit={handleCreateReview} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-mario-black mb-2">ID DO USUÁRIO</label>
                      <input
                        type="number"
                        value={selectedUserId || ""}
                        onChange={(e) => setSelectedUserId(parseInt(e.target.value) || null)}
                        className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                        placeholder="ID do usuário"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-mario-black mb-2">ID DA ORDEM</label>
                      <input
                        type="number"
                        value={orderId}
                        onChange={(e) => setOrderId(parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-mario-yellow border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                        placeholder="ID da ordem"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-mario-black mb-2">AVALIAÇÃO</label>
                      <div className="flex gap-2">
                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                          <input
                            type="radio"
                            value="positive"
                            checked={rating === "positive"}
                            onChange={(e) => setRating(e.target.value as "positive")}
                            className="w-4 h-4"
                          />
                          <ThumbsUp size={16} className="text-mario-green" />
                          <span className="text-xs font-bold text-mario-black">POSITIVA</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer flex-1">
                          <input
                            type="radio"
                            value="negative"
                            checked={rating === "negative"}
                            onChange={(e) => setRating(e.target.value as "negative")}
                            className="w-4 h-4"
                          />
                          <ThumbsDown size={16} className="text-mario-red" />
                          <span className="text-xs font-bold text-mario-black">NEGATIVA</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-mario-black mb-2">COMENTÁRIO (Opcional)</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                        placeholder="Deixe um comentário..."
                        rows={3}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={createReviewMutation.isPending}
                      className="w-full btn-mario blue px-4 py-2 disabled:opacity-50"
                    >
                      {createReviewMutation.isPending ? "ENVIANDO..." : "ENVIAR"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Reviews Display */}
              <div className="lg:col-span-2">
                {selectedUserId ? (
                  <>
                    {/* Trust Stats */}
                    <div className="mario-panel bg-mario-blue text-mario-white mb-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-xs font-bold mb-2">CONFIANÇA</p>
                          <p className="text-2xl font-bold">{trustPercentage.toFixed(1)}%</p>
                        </div>
                        <div className="text-center border-l-2 border-r-2 border-mario-white">
                          <p className="text-xs font-bold mb-2">POSITIVAS</p>
                          <p className="text-2xl font-bold text-mario-green">{positiveCount}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold mb-2">NEGATIVAS</p>
                          <p className="text-2xl font-bold text-mario-red">{negativeCount}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-mario-black">TODAS AS AVALIAÇÕES ({totalReviews})</h2>

                      {userReviews.length === 0 ? (
                        <div className="mario-panel bg-mario-white text-center py-8">
                          <p className="text-xs text-mario-black/70">Nenhuma avaliação encontrada</p>
                        </div>
                      ) : (
                        userReviews.map((review) => (
                          <div
                            key={review.id}
                            className={`mario-card ${review.rating === "positive" ? "bg-mario-green text-mario-white" : "bg-mario-red text-mario-white"}`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {review.rating === "positive" ? (
                                  <ThumbsUp size={16} />
                                ) : (
                                  <ThumbsDown size={16} />
                                )}
                                <span className="text-xs font-bold">
                                  {review.rating === "positive" ? "POSITIVA" : "NEGATIVA"}
                                </span>
                              </div>
                              <span className="text-xs opacity-70">Ordem #{review.orderId}</span>
                            </div>

                            {review.comment && (
                              <p className="text-xs mt-2 opacity-90">{review.comment}</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mario-panel bg-mario-white text-center py-12">
                    <Star className="mx-auto mb-4 text-mario-yellow" size={40} />
                    <p className="text-xs text-mario-black/70">Selecione um usuário para ver suas avaliações</p>
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
