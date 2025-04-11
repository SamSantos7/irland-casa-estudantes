
import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  showOptions?: boolean;
}

const WhatsAppButton = ({
  phoneNumber,
  message = "Olá! Gostaria de mais informações sobre as acomodações estudantis.",
  className = "",
  showOptions = false,
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
        className={`fixed bottom-6 right-6 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:bg-[#20BD5C] transition-colors z-40 btn-hover-effect ${className}`}
        aria-label="Contatar pelo WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </>
  );
};

export default WhatsAppButton;
