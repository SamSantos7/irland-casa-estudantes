
import { Link } from "react-router-dom";
import { Euro } from "lucide-react";

export type RoomType = "individual" | "shared" | "double";

export interface AccommodationCardProps {
  id: number;
  name: string;
  city: string;
  roomType: RoomType;
  pricePerWeek: number;
  imageUrl: string;
  availabilityStatus?: "normal" | "limited" | "last_units";
}

const AccommodationCard = ({
  id,
  name,
  city,
  roomType,
  pricePerWeek,
  imageUrl,
  availabilityStatus = "normal",
}: AccommodationCardProps) => {
  // Função para traduzir o tipo de quarto
  const translateRoomType = (type: RoomType) => {
    switch (type) {
      case "individual":
        return "Quarto Individual";
      case "shared":
        return "Quarto Compartilhado";
      case "double":
        return "Quarto de Casal";
      default:
        return type;
    }
  };

  // Configurações para o badge de disponibilidade
  const availabilityConfig = {
    normal: {
      show: false,
      text: "",
      classes: "",
    },
    limited: {
      show: true,
      text: "Vagas limitadas",
      classes: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    },
    last_units: {
      show: true,
      text: "Últimas unidades",
      classes: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  const availability = availabilityConfig[availabilityStatus];

  return (
    <Link
      to={`/accommodations/${id}`}
      className="block group bg-white dark:bg-neutrals-dark rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 card-shadow"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-white dark:bg-teal px-3 py-1 rounded-full text-xs font-semibold text-teal dark:text-white">
          {city}
        </div>
        <div className="absolute bottom-3 right-3 bg-teal dark:bg-teal-light text-white dark:text-teal px-3 py-1 rounded-full flex items-center text-sm font-medium">
          <Euro size={16} className="mr-1" />
          <span>A partir de {pricePerWeek}/semana</span>
        </div>
        {availability.show && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold animate-pulse ${availability.classes}`}>
            {availability.text}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-1">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm mb-2">
          {translateRoomType(roomType)}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-teal dark:text-teal-light font-medium">
            Ver detalhes
          </span>
          <span className="text-teal dark:text-teal-light">&rarr;</span>
        </div>
      </div>
    </Link>
  );
};

export default AccommodationCard;
