
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface AccommodationWhatsAppProps {
  city: string;
  accommodationName?: string;
  roomType?: string;
  className?: string;
}

const AccommodationWhatsApp = ({
  city,
  accommodationName,
  roomType = "um quarto",
  className = "",
}: AccommodationWhatsAppProps) => {
  const phoneNumber = "5521970286372";

  const getDefaultMessage = (): string => {
    const baseMessage = `Olá! Tenho interesse em reservar ${roomType}`;
    
    if (accommodationName && city) {
      return `${baseMessage} em ${accommodationName} na cidade de ${city}.`;
    }
    
    if (city) {
      return `${baseMessage} na cidade de ${city}.`;
    }
    
    return `${baseMessage} estudantil na Irlanda.`;
  };

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(getDefaultMessage());
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <Button
      onClick={handleClick}
      className={`bg-[#25D366] text-white hover:bg-[#20BD5C] flex items-center gap-2 ${className}`}
    >
      <MessageCircle size={18} />
      <span>Tirar dúvidas no WhatsApp</span>
    </Button>
  );
};

export default AccommodationWhatsApp;
