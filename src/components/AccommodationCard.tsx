
import { Link } from "react-router-dom";
import { MapPin, Bed } from "lucide-react";

interface AccommodationCardProps {
  id: number;
  name: string;
  city: string;
  roomType: string;
  pricePerWeek: number;
  imageUrl: string;
}

const AccommodationCard = ({
  id,
  name,
  city,
  roomType,
  pricePerWeek,
  imageUrl,
}: AccommodationCardProps) => {
  const getRoomTypeLabel = (type: string) => {
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

  return (
    <div className="bg-white dark:bg-neutrals-dark rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 card-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Imagem de ${name}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-teal dark:bg-teal-light text-white dark:text-teal px-3 py-1 rounded-full text-sm font-medium">
            €{pricePerWeek}/semana
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-2">
          {name}
        </h3>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin size={16} className="mr-1 text-teal dark:text-teal-light" />
          <span className="text-sm">{city}</span>
        </div>
        <div className="flex items-center text-muted-foreground mb-4">
          <Bed size={16} className="mr-1 text-teal dark:text-teal-light" />
          <span className="text-sm">{getRoomTypeLabel(roomType)}</span>
        </div>
        <Link
          to={`/accommodations/${id}`}
          className="block w-full bg-teal dark:bg-teal-light text-white dark:text-teal text-center py-2 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition btn-hover-effect"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default AccommodationCard;
