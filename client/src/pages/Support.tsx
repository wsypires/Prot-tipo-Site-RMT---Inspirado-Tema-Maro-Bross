import { useState } from "react";
import { HelpCircle, MessageSquare, BookOpen, Mail, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export default function Support() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"faq" | "contact">("faq");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const faqItems: FAQItem[] = [
    {
      id: 1,
      category: "tokens",
      question: "Como funciona o sistema de tokens?",
      answer:
        "Cada usuário começa com 10 TOKENS. Criar uma ordem consome 1 TOKEN, editar uma ordem consome 0,5 TOKEN, e cada ordem ativa consome 1 TOKEN a cada 24 horas. Você pode comprar mais tokens na taxa de 1000 TOKENS = $1.00.",
    },
    {
      id: 2,
      category: "tokens",
      question: "Como compro tokens?",
      answer:
        "Acesse a página 'Comprar Tokens' no menu, escolha o pacote desejado e complete o pagamento via Stripe. Os tokens serão creditados instantaneamente em sua conta.",
    },
    {
      id: 3,
      category: "orders",
      question: "Como crio uma ordem de venda?",
      answer:
        "Clique em 'Criar Anúncio', selecione o tipo de item (Adena, Item ou Conta), preencha os detalhes e confirme. A ordem será publicada no marketplace e consumirá 1 TOKEN.",
    },
    {
      id: 4,
      category: "orders",
      question: "Posso editar uma ordem após criá-la?",
      answer:
        "Sim, você pode editar qualquer ordem ativa clicando no botão 'Editar' na página da ordem. Editar uma ordem consome 0,5 TOKEN.",
    },
    {
      id: 5,
      category: "orders",
      question: "Como deleto uma ordem?",
      answer:
        "Clique no botão 'Deletar' na página da ordem. Ordens deletadas podem ser recriadas, mas você não terá reembolso dos tokens gastos.",
    },
    {
      id: 6,
      category: "chat",
      question: "Como entro em contato com outro trader?",
      answer:
        "Clique no botão 'MENSAGEM' em qualquer ordem. Você será redirecionado para o chat onde poderá negociar os detalhes da transação em tempo real.",
    },
    {
      id: 7,
      category: "chat",
      question: "As mensagens são criptografadas?",
      answer:
        "Sim, todas as mensagens são armazenadas de forma segura no nosso servidor. Recomendamos não compartilhar informações sensíveis como senhas ou dados bancários no chat.",
    },
    {
      id: 8,
      category: "reputation",
      question: "Como funciona o sistema de reputação?",
      answer:
        "Após completar uma transação, ambos os traders podem deixar uma avaliação (positiva ou negativa). Seu índice de confiança é calculado automaticamente baseado no histórico de avaliações e número de trades completados.",
    },
    {
      id: 9,
      category: "reputation",
      question: "Como aumento meu índice de confiança?",
      answer:
        "Complete transações com sucesso e receba avaliações positivas. Quanto mais trades bem-sucedidos, maior será seu índice de confiança. Evite comportamentos suspeitos ou reclamações.",
    },
    {
      id: 10,
      category: "security",
      question: "Como protejo minha conta?",
      answer:
        "Use uma senha forte e única, não compartilhe suas credenciais, e ative a autenticação de dois fatores se disponível. Nunca compartilhe seus tokens ou informações sensíveis com outros usuários.",
    },
    {
      id: 11,
      category: "security",
      question: "E se minha conta for hackeada?",
      answer:
        "Entre em contato com nosso suporte imediatamente. Mudaremos sua senha e investigaremos qualquer atividade suspeita. Recomendamos denunciar a atividade suspeita na página de denúncias.",
    },
    {
      id: 12,
      category: "marketplace",
      question: "Como filtro ordens no marketplace?",
      answer:
        "Use os filtros disponíveis para buscar por Servidor, Tipo de Ordem (Compra/Venda), e Tipo de Item (Adena/Item/Conta). Você também pode usar a busca por texto para encontrar itens específicos.",
    },
  ];

  const categories = [
    { id: "all", label: "TODAS" },
    { id: "tokens", label: "TOKENS" },
    { id: "orders", label: "ORDENS" },
    { id: "chat", label: "CHAT" },
    { id: "reputation", label: "REPUTAÇÃO" },
    { id: "security", label: "SEGURANÇA" },
    { id: "marketplace", label: "MARKETPLACE" },
  ];

  const filteredFAQ =
    selectedCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--mario-sky)" }}>
      <Header />
      <LeftSidebar />
      <RightSidebar />

      <main className="lg:ml-72 xl:mr-80 pt-20">
        {/* Page Header */}
        <section className="bg-mario-green border-b-4 border-mario-black p-6">
          <div className="container">
            <div className="flex items-center gap-3">
              <HelpCircle size={32} className="text-mario-white" />
              <h1 className="text-3xl md:text-5xl font-bold text-mario-white drop-shadow" style={{ textShadow: "3px 3px 0 rgba(0,0,0,0.3)" }}>
                SUPORTE
              </h1>
            </div>
            <p className="text-xs text-mario-white/90 mt-2">Encontre respostas para suas dúvidas</p>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-mario-white border-b-4 border-mario-black p-4">
          <div className="container flex gap-4">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2 border-2 border-mario-black font-bold text-xs ${
                activeTab === "faq"
                  ? "bg-mario-green text-mario-white"
                  : "bg-mario-white text-mario-black"
              }`}
            >
              <BookOpen className="inline mr-2" size={16} />
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-4 py-2 border-2 border-mario-black font-bold text-xs ${
                activeTab === "contact"
                  ? "bg-mario-blue text-mario-white"
                  : "bg-mario-white text-mario-black"
              }`}
            >
              <Mail className="inline mr-2" size={16} />
              CONTATO
            </button>
          </div>
        </section>

        {/* Content */}
        <section className="p-6" style={{ backgroundColor: "var(--mario-sky)" }}>
          <div className="container max-w-3xl">
            {activeTab === "faq" ? (
              <>
                {/* Category Filter */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1 border-2 border-mario-black font-bold text-xs ${
                        selectedCategory === cat.id
                          ? "bg-mario-green text-mario-white"
                          : "bg-mario-white text-mario-black"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* FAQ Items */}
                <div className="space-y-3">
                  {filteredFAQ.map((item) => (
                    <div
                      key={item.id}
                      className="mario-panel bg-mario-white border-2 border-mario-black"
                    >
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === item.id ? null : item.id)
                        }
                        className="w-full p-4 flex justify-between items-center hover:bg-mario-white/80 transition"
                      >
                        <h3 className="text-sm font-bold text-mario-black text-left">
                          {item.question}
                        </h3>
                        <ChevronDown
                          size={20}
                          className={`flex-shrink-0 text-mario-black transition ${
                            expandedId === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedId === item.id && (
                        <div className="border-t-2 border-mario-black p-4 bg-mario-white/50">
                          <p className="text-xs text-mario-black/80 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Contact Form */}
                <div className="mario-panel bg-mario-white p-6">
                  <h2 className="text-lg font-bold text-mario-black mb-4">
                    📧 ENTRE EM CONTATO
                  </h2>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-mario-black mb-2">
                        ASSUNTO
                      </label>
                      <input
                        type="text"
                        placeholder="Descreva o assunto..."
                        className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-mario-black mb-2">
                        CATEGORIA
                      </label>
                      <select className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none">
                        <option>Selecione uma categoria...</option>
                        <option>Problema Técnico</option>
                        <option>Denúncia de Fraude</option>
                        <option>Sugestão de Recurso</option>
                        <option>Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-mario-black mb-2">
                        MENSAGEM
                      </label>
                      <textarea
                        placeholder="Descreva seu problema em detalhes..."
                        rows={6}
                        className="w-full px-3 py-2 bg-mario-white border-2 border-mario-black text-mario-black text-xs font-bold focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-mario blue w-full flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16} />
                      ENVIAR MENSAGEM
                    </button>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mario-panel bg-mario-yellow p-4">
                    <h3 className="text-sm font-bold text-mario-black mb-2">📧 EMAIL</h3>
                    <p className="text-xs text-mario-black/70">support@gamemarketplace.com</p>
                  </div>

                  <div className="mario-panel bg-mario-blue text-mario-white p-4">
                    <h3 className="text-sm font-bold mb-2">💬 DISCORD</h3>
                    <p className="text-xs opacity-80">Junte-se ao nosso servidor Discord para suporte rápido</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
