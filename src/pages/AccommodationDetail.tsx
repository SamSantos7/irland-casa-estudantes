import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";
import { Bath, Wifi, Utensils, Home, DollarSign, Calendar, Users, MapPin } from "lucide-react";

// Interfaces
interface Accommodation {
  id: number;
  name: string;
  description: string;
  city: string;
  neighborhood: string;
  roomType: "individual" | "shared" | "double";
  pricePerWeek: number;
  images: string[];
  amenities: string[];
  nearbyPlaces?: string[];
  maxOccupancy: number;
  availableRooms: number;
}

// Dados de acomodações (simula um banco de dados)
const accommodationsData: Accommodation[] = [
  {
    id: 1,
    name: "Dublin Central Residence",
    description: "Localizada no coração de Dublin, esta residência oferece quartos individuais com banheiro privativo. A menos de 15 minutos a pé das principais escolas de inglês e com fácil acesso a transporte público.",
    city: "Dublin",
    neighborhood: "City Centre",
    roomType: "individual",
    pricePerWeek: 250,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    ],
    amenities: ["Wi-Fi", "Cozinha Equipada", "Banheiro Privativo", "Lavanderia", "Aquecimento Central"],
    nearbyPlaces: ["ISI Dublin", "International House", "Temple Bar", "Trinity College"],
    maxOccupancy: 1,
    availableRooms: 3,
  },
  {
    id: 2,
    name: "Cork Student House",
    description: "Ideal para estudantes que buscam um ambiente acolhedor e econômico. Quartos compartilhados para até 4 pessoas, com áreas de estudo e convivência.",
    city: "Cork",
    neighborhood: "Bishopstown",
    roomType: "shared",
    pricePerWeek: 180,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600585154524-16471cd6f75f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ],
    amenities: ["Wi-Fi", "Cozinha Compartilhada", "Área de Estudo", "Lavanderia", "Jardim"],
    nearbyPlaces: ["University College Cork", "Cork Institute of Technology", "Fitzgerald Park"],
    maxOccupancy: 4,
    availableRooms: 5,
  },
  {
    id: 3,
    name: "Galway Campus Suite",
    description: "Suítes modernas e bem equipadas, localizadas próximas ao campus da Universidade de Galway. Ideal para estudantes que buscam conforto e privacidade.",
    city: "Galway",
    neighborhood: "Newcastle",
    roomType: "double",
    pricePerWeek: 320,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1583847268964-b28a57d9ee81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1616587228134-4a59458154c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    ],
    amenities: ["Wi-Fi", "Cozinha Compacta", "Banheiro Privativo", "Área de Estudo", "Serviço de Limpeza"],
    nearbyPlaces: ["National University of Ireland Galway", "University Hospital Galway", "Eyre Square"],
    maxOccupancy: 2,
    availableRooms: 2,
  },
  {
    id: 4,
    name: "Limerick City View",
    description: "Apartamentos modernos com vista para o Rio Shannon, localizados no centro de Limerick. Quartos individuais e duplos disponíveis, com todas as comodidades inclusas.",
    city: "Limerick",
    neighborhood: "City Centre",
    roomType: "individual",
    pricePerWeek: 230,
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlZHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1613490495763-5f299c9c497e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    ],
    amenities: ["Wi-Fi", "Cozinha Equipada", "Banheiro Privativo", "Academia", "Salão de Jogos"],
    nearbyPlaces: ["University of Limerick", "Limerick Institute of Technology", "King John's Castle"],
    maxOccupancy: 1,
    availableRooms: 4,
  },
];

const AccommodationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Simulando busca no banco de dados
  useEffect(() => {
    if (id) {
      const foundAccommodation = accommodationsData.find(
        (acc) => acc.id === parseInt(id)
      );
      if (foundAccommodation) {
        setAccommodation(foundAccommodation);
      }
    }
  }, [id]);

  if (!accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container py-16">
            <p className="text-center">Acomodação não encontrada.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Função para traduzir o tipo de quarto
  const translateRoomType = (type: string) => {
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
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={`${accommodation.name} em ${accommodation.city} | Irlanda Casa Estudantes`}
        description={`${translateRoomType(accommodation.roomType)} em ${accommodation.neighborhood}, ${accommodation.city}. A partir de €${accommodation.pricePerWeek}/semana. ${accommodation.description.substring(0, 120)}...`}
        image={accommodation.images[0]}
        canonical={`/accommodations/${accommodation.id}`}
      />
      
      <Navbar />

      <main className="flex-grow pt-24">
        <div className="container">
          <div className="mb-8">
            <Link to="/accommodations" className="text-teal dark:text-teal-light hover:underline">
              &larr; Voltar para Acomodações
            </Link>
          </div>

          {/* Accommodation Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <img
                src={accommodation.images[activeImage]}
                alt={accommodation.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg mb-4"
              />
              <div className="flex overflow-x-auto space-x-4">
                {accommodation.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${accommodation.name} - Image ${index + 1}`}
                    className={`w-24 h-20 object-cover rounded-lg cursor-pointer ${
                      activeImage === index ? "opacity-75 border-2 border-teal dark:border-teal-light" : "opacity-50 hover:opacity-75"
                    }`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div>
              <h1 className="text-3xl font-bold text-neutrals-dark dark:text-white mb-4">
                {accommodation.name}
              </h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin size={16} className="mr-2" />
                {accommodation.neighborhood}, {accommodation.city}
              </div>
              <p className="text-muted-foreground mb-6">{accommodation.description}</p>

              {/* Price and Booking */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold text-teal dark:text-teal-light">
                    <DollarSign size={20} className="inline-block mr-1" />
                    A partir de {accommodation.pricePerWeek}/semana
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Taxas e impostos podem ser aplicados
                  </div>
                </div>
                <Link
                  to={`/reservation-form?accommodation=${accommodation.id}`}
                  className="bg-teal dark:bg-teal-light text-white dark:text-teal px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition btn-hover-effect"
                >
                  Solicitar Reserva
                </Link>
              </div>

              {/* Details List */}
              <div>
                <h3 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-3">
                  Detalhes da Acomodação
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Home size={16} className="mr-2 text-muted-foreground" />
                    Tipo de Quarto: {translateRoomType(accommodation.roomType)}
                  </li>
                  <li className="flex items-center">
                    <Users size={16} className="mr-2 text-muted-foreground" />
                    Ocupação Máxima: {accommodation.maxOccupancy} pessoa(s)
                  </li>
                  <li className="flex items-center">
                    <Calendar size={16} className="mr-2 text-muted-foreground" />
                    Quartos Disponíveis: {accommodation.availableRooms}
                  </li>
                </ul>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-3">
                  Comodidades
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {accommodation.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity === "Wi-Fi" && <Wifi size={16} className="mr-2 text-muted-foreground" />}
                      {amenity === "Banheiro Privativo" && <Bath size={16} className="mr-2 text-muted-foreground" />}
                      {amenity === "Cozinha Equipada" && <Utensils size={16} className="mr-2 text-muted-foreground" />}
                      <span className="text-muted-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Places */}
              {accommodation.nearbyPlaces && accommodation.nearbyPlaces.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-3">
                    Próximo daqui
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {accommodation.nearbyPlaces.map((place, index) => (
                      <li key={index}>{place}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="353000000000" message={`Olá! Tenho interesse na acomodação ${accommodation.name} em ${accommodation.city}.`} />
    </div>
  );
};

export default AccommodationDetail;
