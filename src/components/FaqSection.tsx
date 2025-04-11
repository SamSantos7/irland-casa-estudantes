
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Como funciona o processo de reserva?",
    answer:
      "O processo de reserva é simples. Escolha a acomodação, preencha o formulário de solicitação com seus dados e documentos necessários. Nossa equipe entrará em contato em até 24 horas para confirmar a disponibilidade e seguir com os próximos passos.",
  },
  {
    question: "É necessário pagar antecipadamente?",
    answer:
      "Sim, para garantir sua reserva é necessário um depósito inicial. O valor varia de acordo com a acomodação escolhida. O restante pode ser pago na chegada ou conforme acordado durante o processo de reserva.",
  },
  {
    question: "Que documentos preciso enviar para fazer a reserva?",
    answer:
      "É necessário enviar uma cópia do seu passaporte e comprovante de matrícula da escola onde irá estudar. Em alguns casos, pode ser solicitado comprovante de renda ou carta de trabalho.",
  },
  {
    question: "As acomodações incluem internet WiFi?",
    answer:
      "Sim, todas as nossas acomodações incluem internet WiFi de alta velocidade sem custo adicional.",
  },
  {
    question: "Posso cancelar minha reserva?",
    answer:
      "Sim, mas as políticas de cancelamento variam conforme a acomodação e a antecedência. Geralmente, cancelamentos com mais de 30 dias de antecedência recebem reembolso parcial do depósito.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-neutrals-dark dark:text-white">
        Perguntas Frequentes
      </h2>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-white dark:bg-neutrals-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => toggleItem(index)}
            >
              <span className="font-medium text-neutrals-dark dark:text-white">
                {item.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="text-teal dark:text-teal-light" />
              ) : (
                <ChevronDown className="text-teal dark:text-teal-light" />
              )}
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 text-neutrals-dark dark:text-white">
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
