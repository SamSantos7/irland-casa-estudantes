
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  showOptions?: boolean;
  fixed?: boolean;
}

const WhatsAppButton = ({
  phoneNumber = "5521970286372",
  message = "Olá, gostaria de fazer uma reserva de acomodação estudantil na Irlanda.",
  className = "",
  showOptions = false,
  fixed = true,
}: WhatsAppButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (customMessage?: string) => {
    const encodedMessage = encodeURIComponent(customMessage || message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
    setIsOpen(false);
  };

  const options = [
    {
      label: "Reservar acomodação",
      message: "Olá! Gostaria de fazer uma reserva para acomodação estudantil."
    },
    {
      label: "Tirar dúvidas",
      message: "Olá! Tenho algumas dúvidas sobre as acomodações disponíveis."
    },
    {
      label: "Solicitar documentos",
      message: "Olá! Preciso de informações sobre os documentos necessários para a reserva."
    },
    {
      label: "Sobre pagamentos",
      message: "Olá! Gostaria de informações sobre formas de pagamento e valores."
    }
  ];

  const baseClasses = `bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:bg-[#20BD5C] transition-colors z-40 btn-hover-effect ${className}`;
  const fixedClasses = fixed ? "fixed bottom-6 right-6" : "";

  return (
    <>
      {showOptions && isOpen && (
        <div className="fixed bottom-20 right-6 bg-white dark:bg-neutrals-dark rounded-lg shadow-lg p-2 z-40 transition-all">
          <div className="flex flex-col space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleClick(option.message)}
                className="whitespace-nowrap px-4 py-2 text-sm rounded-lg text-neutrals-dark dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-left transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button
        onClick={() => showOptions ? setIsOpen(!isOpen) : handleClick()}
        className={`${baseClasses} ${fixedClasses}`}
        aria-label="Contatar pelo WhatsApp"
      >
        <MessageCircle size={28} />
        <span className="hidden md:inline-block ml-2">Fale com um consultor</span>
      </button>

      {fixed && (
        <div className="fixed bottom-0 left-0 right-0 bg-teal text-white py-3 z-30 text-center shadow-lg md:hidden">
          <Link
            to="/reservation-form"
            className="block w-full font-medium"
          >
            Reservar acomodação
          </Link>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
