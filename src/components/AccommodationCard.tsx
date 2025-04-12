
import { Link } from "react-router-dom";
import { Euro, Home, MapPin, Calendar, Users, Shower } from "lucide-react";

export type RoomType = "individual" | "shared" | "double";
export type BathroomType = "private" | "shared";
export type GenderDivision = "same" | "mixed";

export interface AccommodationCardProps {
  id: number;
  name: string;
  city: string;
  roomType: RoomType;
  pricePerWeek: number;
  imageUrl: string;
  availabilityStatus?: "normal" | "limited" | "last_units" | "high_demand";
  neighborhood?: string;
  minWeeks?: number;
  bathroomType?: BathroomType;
  bathroomShared?: number;
  genderDivision?: GenderDivision;
  importantNotes?: string;
}

const AccommodationCard = ({
  id,
  name,
  city,
  roomType,
  pricePerWeek,
  imageUrl,
  availabilityStatus = "normal",
  neighborhood = "Centro",
  minWeeks = 4,
  bathroomType = "shared",
  bathroomShared = 2,
  genderDivision = "same",
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

  // Função para traduzir o tipo de banheiro
  const translateBathroomType = (type: BathroomType, shared?: number) => {
    if (type === "private") {
      return "Banheiro Privativo";
    }
    return `Banheiro Compartilhado (${shared} pessoas)`;
  };

  // Função para traduzir a divisão por gênero
  const translateGenderDivision = (type: GenderDivision) => {
    return type === "same" ? "Mesmo Sexo" : "Misto";
  };

  // Configurações para o badge de disponibilidade
  const availabilityConfig = {
    normal: {
      show: true,
      text: "Disponível",
      classes: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
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
    high_demand: {
      show: true,
      text: "Alta procura",
      classes: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
  };

  const availability = availabilityConfig[availabilityStatus];

  return (
    <Link
      to={`/accommodations/${id}`}
      className="block group bg-white dark:bg-neutrals-dark rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-3 hover:shadow-xl transition-all duration-300 card-shadow"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={`${translateRoomType(roomType)} em ${city} - ${name}`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center text-muted-foreground text-sm">
            <Home size={14} className="mr-2 text-teal dark:text-teal-light" />
            <span>{translateRoomType(roomType)}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Shower size={14} className="mr-2 text-teal dark:text-teal-light" />
            <span>{translateBathroomType(bathroomType, bathroomShared)}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Users size={14} className="mr-2 text-teal dark:text-teal-light" />
            <span>{translateGenderDivision(genderDivision)}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin size={14} className="mr-2 text-teal dark:text-teal-light" />
            <span>{neighborhood}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar size={14} className="mr-2 text-teal dark:text-teal-light" />
            <span>Mínimo {minWeeks} semanas</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-teal dark:text-teal-light font-medium">
            Ver detalhes
          </span>
          <span className="text-teal dark:text-teal-light group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
        </div>
      </div>
    </Link>
  );
};

export default AccommodationCard;
