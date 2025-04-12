
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Como funciona o processo de reserva?",
    answer:
      "O processo de reserva é simples. Escolha a acomodação, preencha o formulário de solicitação com seus dados e documentos necessários. Nossa equipe entrará em contato em até 24 horas para confirmar a disponibilidade e seguir com os próximos passos.",
    category: "Reservas",
  },
  {
    question: "É necessário pagar antecipadamente?",
    answer:
      "Sim, para garantir sua reserva é necessário um depósito inicial. O valor varia de acordo com a acomodação escolhida. O restante pode ser pago na chegada ou conforme acordado durante o processo de reserva.",
    category: "Pagamentos",
  },
  {
    question: "Posso pagar em Euro ou Real?",
    answer:
      "Sim, oferecemos opções de pagamento tanto em Euro quanto em Real brasileiro. Você pode escolher a moeda que preferir no momento da reserva para sua maior conveniência.",
    category: "Pagamentos",
  },
  {
    question: "Receberei uma carta de acomodação?",
    answer:
      "Sim, após a confirmação da reserva e do pagamento inicial, enviamos a carta oficial de acomodação que pode ser utilizada para processos de visto ou comprovação junto à escola.",
    category: "Documentação",
  },
  {
    question: "Que documentos preciso enviar para fazer a reserva?",
    answer:
      "É necessário enviar uma cópia do seu passaporte e comprovante de matrícula da escola onde irá estudar. Em alguns casos, pode ser solicitado comprovante de renda ou carta de trabalho.",
    category: "Documentação",
  },
  {
    question: "As acomodações incluem internet WiFi?",
    answer:
      "Sim, todas as nossas acomodações incluem internet WiFi de alta velocidade sem custo adicional.",
    category: "Comodidades",
  },
  {
    question: "Quanto tempo demora para receber a confirmação da reserva?",
    answer:
      "Geralmente, a confirmação da reserva é feita em até 24 horas úteis. Em períodos de alta demanda, como início do ano letivo, pode levar até 48 horas.",
    category: "Reservas",
  },
  {
    question: "Posso cancelar minha reserva?",
    answer:
      "Sim, mas as políticas de cancelamento variam conforme a acomodação e a antecedência. Geralmente, cancelamentos com mais de 30 dias de antecedência recebem reembolso parcial do depósito.",
    category: "Reservas",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const categories = Array.from(
    new Set(faqItems.map((item) => item.category || "Geral"))
  );

  const filteredItems = activeCategory
    ? faqItems.filter((item) => (item.category || "Geral") === activeCategory)
    : faqItems;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 text-neutrals-dark dark:text-white">
        Perguntas Frequentes
      </h2>
      
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-teal dark:bg-teal-light text-white dark:text-teal"
              : "bg-gray-100 dark:bg-gray-800 text-neutrals-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => setActiveCategory(null)}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-teal dark:bg-teal-light text-white dark:text-teal"
                : "bg-gray-100 dark:bg-gray-800 text-neutrals-dark dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="space-y-6">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              className="flex justify-between items-center w-full p-5 text-left bg-white dark:bg-neutrals-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => toggleItem(index)}
            >
              <span className="font-semibold text-lg text-neutrals-dark dark:text-white">
                {item.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="text-teal dark:text-teal-light flex-shrink-0 ml-2" />
              ) : (
                <ChevronDown className="text-teal dark:text-teal-light flex-shrink-0 ml-2" />
              )}
            </button>
            {activeIndex === index && (
              <div className="p-5 bg-gray-50 dark:bg-gray-800 text-neutrals-dark dark:text-white leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
