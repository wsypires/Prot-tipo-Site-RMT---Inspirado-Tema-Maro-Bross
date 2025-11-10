import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  progress: number;
  requirement: string;
}

const badges: Badge[] = [
  {
    id: "mushroom",
    name: "SUPER MUSHROOM",
    description: "Realiza 10 trades com sucesso",
    image: "/badge-mushroom.png",
    unlocked: true,
    progress: 100,
    requirement: "10 trades",
  },
  {
    id: "fire-flower",
    name: "FIRE FLOWER",
    description: "Atinge 100 moedas em vendas",
    image: "/badge-fire-flower.png",
    unlocked: true,
    progress: 100,
    requirement: "100 moedas",
  },
  {
    id: "star",
    name: "INVINCIBILITY STAR",
    description: "Obtém 50 avaliações 5 estrelas",
    image: "/badge-star.png",
    unlocked: false,
    progress: 35,
    requirement: "50 avaliações",
  },
];

export default function BadgeShowcase() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold text-mario-yellow mb-2 drop-shadow"
          style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}
        >
          ACHIEVEMENTS
        </h2>
        <div className="w-24 h-1 bg-mario-black mx-auto" />
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`
              mario-card cursor-pointer transition-all
              ${
                badge.unlocked
                  ? "hover-mario-lift animate-mario-bounce"
                  : "opacity-60 hover:opacity-80"
              }
            `}
            style={{
              animationDelay: badge.unlocked ? "0s" : "0s",
            }}
          >
            {/* Badge Image */}
            <div className="relative mb-4 flex justify-center">
              <div
                className={`
                  w-24 h-24 flex items-center justify-center
                  border-4 border-mario-black
                  ${badge.unlocked ? "bg-mario-yellow" : "bg-mario-white"}
                `}
              >
                {badge.unlocked ? (
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="w-20 h-20 object-contain pixel-perfect"
                  />
                ) : (
                  <Lock size={32} className="text-mario-black" />
                )}
              </div>

              {/* Status Badge */}
              <div
                className={`
                  absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center
                  border-2 border-mario-black text-xs font-bold
                  ${badge.unlocked ? "bg-mario-green text-mario-white" : "bg-mario-red text-mario-white"}
                `}
              >
                {badge.unlocked ? "✓" : "?"}
              </div>
            </div>

            {/* Badge Info */}
            <div className="text-center space-y-2">
              <h3 className="text-xs font-bold text-mario-black uppercase">
                {badge.name}
              </h3>
              <p className="text-xs text-mario-black">{badge.description}</p>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full h-3 bg-mario-white border-2 border-mario-black">
                  <div
                    className="h-full bg-mario-green transition-all duration-300"
                    style={{ width: `${badge.progress}%` }}
                  />
                </div>
                <p className="text-xs text-mario-black mt-1">
                  {badge.progress}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="mario-panel bg-mario-yellow max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-2 right-2 w-6 h-6 bg-mario-red text-mario-white border-2 border-mario-black font-bold text-xs"
            >
              ✕
            </button>

            {/* Badge Large Display */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center bg-mario-white border-4 border-mario-black">
                {selectedBadge.unlocked ? (
                  <img
                    src={selectedBadge.image}
                    alt={selectedBadge.name}
                    className="w-28 h-28 object-contain pixel-perfect"
                  />
                ) : (
                  <Lock size={48} className="text-mario-black" />
                )}
              </div>

              <h3 className="text-lg font-bold text-mario-black mb-2">
                {selectedBadge.name}
              </h3>
              <p className="text-xs text-mario-black mb-4">
                {selectedBadge.description}
              </p>

              {/* Status */}
              <div
                className={`
                  inline-block px-4 py-2 border-2 border-mario-black
                  font-bold text-xs
                  ${
                    selectedBadge.unlocked
                      ? "bg-mario-green text-mario-white"
                      : "bg-mario-red text-mario-white"
                  }
                `}
              >
                {selectedBadge.unlocked ? "DESBLOQUEADO ✓" : "BLOQUEADO"}
              </div>
            </div>

            {/* Progress Details */}
            <div className="space-y-3 border-t-4 border-mario-black pt-4">
              <div>
                <p className="text-xs font-bold text-mario-black mb-2">
                  PROGRESSO: {selectedBadge.progress}%
                </p>
                <div className="w-full h-4 bg-mario-white border-2 border-mario-black">
                  <div
                    className="h-full bg-mario-blue transition-all duration-300"
                    style={{ width: `${selectedBadge.progress}%` }}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-mario-black">
                  <span className="font-bold">REQUISITO:</span>{" "}
                  {selectedBadge.requirement}
                </p>
              </div>

              {!selectedBadge.unlocked && (
                <div className="text-center pt-2">
                  <p className="text-xs text-mario-black">
                    Faltam{" "}
                    <span className="font-bold">
                      {100 - selectedBadge.progress}%
                    </span>{" "}
                    para desbloquear!
                  </p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedBadge(null)}
              className="w-full mt-4 btn-mario red"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
