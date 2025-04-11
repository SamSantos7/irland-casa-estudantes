
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

const WhatsAppButton = ({
  phoneNumber,
  message = "Olá! Gostaria de mais informações sobre as acomodações estudantis.",
  className = "",
}: WhatsAppButtonProps) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:bg-[#20BD5C] transition-colors z-40 btn-hover-effect ${className}`}
      aria-label="Contatar pelo WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default WhatsAppButton;
