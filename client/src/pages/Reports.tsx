import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import { AlertTriangle, Send, CheckCircle } from "lucide-react";

export default function Reports() {
  const { user } = useAuth();
  const [reportType, setReportType] = useState<"user" | "order">("user");
  const [targetId, setTargetId] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetId || !reason || !description.trim()) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Simulate report submission
    console.log({
      reportType,
      targetId,
      reason,
      description,
      reportedBy: user?.id,
      createdAt: new Date(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setReportType("user");
      setTargetId("");
      setReason("");
      setDescription("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Page Header */}
        <section className="bg-mario-red border-b-4 border-mario-black p-6">
          <div className="container">
            <div className="flex items-center gap-3">
              <AlertTriangle size={32} className="text-mario-yellow" />
              <h1 className="text-3xl md:text-5xl font-bold text-mario-yellow drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
                DENUNCIAR
              </h1>
            </div>
            <p className="text-xs text-mario-white mt-2">Ajude-nos a manter a plataforma segura reportando atividades suspeitas</p>
          </div>
        </section>

        {/* Report Form */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-2xl">
            {submitted ? (
              <div className="mario-panel bg-mario-green text-mario-white p-8 text-center">
                <CheckCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">DENÚNCIA ENVIADA!</h2>
                <p className="text-sm mb-4">
                  Obrigado por ajudar a manter a plataforma segura. Nossa equipe de moderação analisará sua denúncia em breve.
                </p>
                <p className="text-xs opacity-80">Redirecionando...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="mario-panel bg-mario-white p-6">
                {/* Report Type */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-mario-black mb-3">
                    TIPO DE DENÚNCIA
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reportType"
                        value="user"
                        checked={reportType === "user"}
                        onChange={(e) => setReportType(e.target.value as "user" | "order")}
                        className="w-4 h-4"
                      />
                      <span className="text-xs font-bold text-mario-black">Denunciar Usuário</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reportType"
                        value="order"
                        checked={reportType === "order"}
                        onChange={(e) => setReportType(e.target.value as "user" | "order")}
                        className="w-4 h-4"
                      />
                      <span className="text-xs font-bold text-mario-black">Denunciar Ordem</span>
                    </label>
                  </div>
                </div>

                {/* Target ID */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-mario-black mb-2">
                    {reportType === "user" ? "ID DO USUÁRIO" : "ID DA ORDEM"}
                  </label>
                  <input
                    type="text"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    placeholder={reportType === "user" ? "Ex: 050809" : "Ex: 12345"}
                    className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                  />
                </div>

                {/* Reason */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-mario-black mb-2">
                    MOTIVO DA DENÚNCIA
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                  >
                    <option value="">Selecione um motivo...</option>
                    <option value="fraud">Fraude / Golpe</option>
                    <option value="scam">Roubo de Conta</option>
                    <option value="offensive">Comportamento Ofensivo</option>
                    <option value="spam">Spam / Publicidade</option>
                    <option value="fake">Informações Falsas</option>
                    <option value="illegal">Atividade Ilegal</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-mario-black mb-2">
                    DESCRIÇÃO DETALHADA
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o que aconteceu em detalhes..."
                    rows={6}
                    className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none resize-none"
                  />
                  <p className="text-xs text-mario-black/50 mt-2">
                    Máximo 500 caracteres ({description.length}/500)
                  </p>
                </div>

                {/* Important Info */}
                <div className="mb-6 p-3 bg-mario-yellow border-2 border-mario-black rounded-none">
                  <p className="text-xs font-bold text-mario-black mb-2">⚠️ INFORMAÇÕES IMPORTANTES:</p>
                  <ul className="text-xs text-mario-black/70 space-y-1 list-disc list-inside">
                    <li>Denúncias falsas podem resultar em banimento</li>
                    <li>Forneça o máximo de detalhes possível</li>
                    <li>Nossas equipes analisarão em até 24 horas</li>
                    <li>Você será notificado sobre o resultado</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-mario red w-full flex items-center justify-center gap-2"
                >
                  <AlertTriangle size={16} />
                  ENVIAR DENÚNCIA
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-2xl">
            <h2 className="text-lg font-bold text-mario-black mb-4">❓ PERGUNTAS FREQUENTES</h2>

            <div className="space-y-3">
              <div className="mario-panel bg-mario-white p-4">
                <h3 className="text-sm font-bold text-mario-black mb-2">
                  Como faço para denunciar um usuário?
                </h3>
                <p className="text-xs text-mario-black/70">
                  Selecione "Denunciar Usuário", insira o ID do usuário (6 dígitos), escolha o motivo e descreva o que aconteceu em detalhes.
                </p>
              </div>

              <div className="mario-panel bg-mario-white p-4">
                <h3 className="text-sm font-bold text-mario-black mb-2">
                  Quanto tempo leva para processar uma denúncia?
                </h3>
                <p className="text-xs text-mario-black/70">
                  Nossas equipes de moderação analisam denúncias em até 24 horas. Você será notificado sobre o resultado.
                </p>
              </div>

              <div className="mario-panel bg-mario-white p-4">
                <h3 className="text-sm font-bold text-mario-black mb-2">
                  O que acontece se eu fizer denúncias falsas?
                </h3>
                <p className="text-xs text-mario-black/70">
                  Denúncias falsas são contra as nossas políticas. Usuários que fazem denúncias falsas repetidamente podem ser banidos da plataforma.
                </p>
              </div>

              <div className="mario-panel bg-mario-white p-4">
                <h3 className="text-sm font-bold text-mario-black mb-2">
                  Minha denúncia é anônima?
                </h3>
                <p className="text-xs text-mario-black/70">
                  Suas denúncias são registradas com seu ID de usuário para fins de auditoria, mas não são compartilhadas publicamente.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
