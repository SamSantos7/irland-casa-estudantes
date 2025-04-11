
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import {
  MapPin,
  Bed,
  Wifi,
  Clock,
  Users,
  Coffee,
  Utensils,
  Shower,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Sample accommodations data
const accommodationsData = [
  {
    id: 1,
    name: "Dublin Central Residence",
    city: "Dublin",
    roomType: "individual",
    pricePerWeek: 250,
    address: "123 O'Connell Street, Dublin",
    description:
      "Localizado no coração de Dublin, este quarto individual oferece conforto e conveniência para estudantes. A apenas 10 minutos a pé das principais escolas de inglês e do centro da cidade. Ambiente tranquilo e seguro, perfeito para estudantes que buscam independência e privacidade.",
    amenities: ["WiFi de alta velocidade", "Cozinha compartilhada", "Lavanderia", "Área de estudo", "Sala de convivência"],
    rules: [
      "Não é permitido fumar",
      "Sem festas ou eventos",
      "Check-in entre 14:00 e 20:00",
      "Check-out até 11:00",
      "Silêncio após 23:00"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJhdGhyb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1584622781867-1c996f70fdfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGJhdGhyb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    ],
    mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4547.617223218068!2d-6.263127428547933!3d53.34980229806153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sO&#39;Connell%20Street%2C%20North%20City%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sbr!4v1677048673522!5m2!1sen!2sbr"
  },
  {
    id: 2,
    name: "Dublin Student Loft",
    city: "Dublin",
    roomType: "shared",
    pricePerWeek: 180,
    address: "45 Grafton Street, Dublin",
    description:
      "Quarto compartilhado em um apartamento moderno e bem localizado no centro de Dublin. Você dividirá o quarto com outro estudante em um ambiente amigável e colaborativo. O apartamento possui áreas comuns espaçosas, incluindo uma cozinha totalmente equipada e sala de estar confortável.",
    amenities: ["WiFi de alta velocidade", "Cozinha equipada", "Lavanderia", "TV na sala comum", "Limpeza semanal incluída"],
    rules: [
      "Não é permitido fumar",
      "Visitantes somente até 22:00",
      "Respeitar o espaço e pertences do colega de quarto",
      "Limpeza dos espaços comuns após o uso",
      "Silêncio após 23:00"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxpdmluZyUyMHJvb218ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2l0Y2hlbiUyMGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0aHJvb20lMjBzaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    ],
    mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.0889058411833!2d-6.261894984208855!3d53.34218327997738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e91f01ce80d%3A0x5c49a56e820a5e0!2sGrafton%20Street%2C%20Dublin%2C%20Ireland!5e0!3m2!1sen!2sbr!4v1677048782910!5m2!1sen!2sbr"
  },
];

const AccommodationDetail = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id);
      // Simulate API call
      setTimeout(() => {
        const acc = accommodationsData.find((a) => a.id === numericId);
        setAccommodation(acc);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const nextImage = () => {
    if (accommodation) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === accommodation.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (accommodation) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? accommodation.images.length - 1 : prevIndex - 1
      );
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-4">
            Acomodação não encontrada
          </h2>
          <p className="text-muted-foreground mb-6">
            A acomodação que você está procurando não está disponível.
          </p>
          <Link
            to="/accommodations"
            className="bg-teal text-white dark:bg-teal-light dark:text-teal px-6 py-3 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition"
          >
            Ver todas as acomodações
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/accommodations"
              className="inline-flex items-center text-teal dark:text-teal-light hover:underline"
            >
              <ChevronLeft size={18} className="mr-1" />
              <span>Voltar para acomodações</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutrals-dark dark:text-white mb-2">
              {accommodation.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center">
                <MapPin size={18} className="mr-1 text-teal dark:text-teal-light" />
                <span>{accommodation.city}</span>
              </div>
              <div className="flex items-center">
                <Bed size={18} className="mr-1 text-teal dark:text-teal-light" />
                <span>{getRoomTypeLabel(accommodation.roomType)}</span>
              </div>
              <div className="flex items-center font-semibold text-teal dark:text-teal-light">
                €{accommodation.pricePerWeek}/semana
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-8 relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative aspect-[16/9]">
              <img
                src={accommodation.images[currentImageIndex]}
                alt={`${accommodation.name} - Imagem ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-neutrals-dark bg-opacity-70 dark:bg-opacity-70 rounded-full p-2 text-teal dark:text-teal-light hover:bg-opacity-100 dark:hover:bg-opacity-100 transition"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-neutrals-dark bg-opacity-70 dark:bg-opacity-70 rounded-full p-2 text-teal dark:text-teal-light hover:bg-opacity-100 dark:hover:bg-opacity-100 transition"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {accommodation.images.map((_, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex
                        ? "bg-white"
                        : "bg-white/50"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="flex overflow-x-auto gap-2 p-2 bg-white dark:bg-neutrals-dark scrollbar-hide">
              {accommodation.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`min-w-[100px] h-16 rounded-md overflow-hidden ${
                    index === currentImageIndex
                      ? "ring-2 ring-teal dark:ring-teal-light"
                      : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Description and Details */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md mb-6">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4">
                  Sobre esta acomodação
                </h2>
                <p className="text-neutrals-dark dark:text-white">
                  {accommodation.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md mb-6">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4">
                  Comodidades
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accommodation.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center">
                      {index === 0 ? (
                        <Wifi className="text-teal dark:text-teal-light mr-3" size={20} />
                      ) : index === 1 ? (
                        <Utensils className="text-teal dark:text-teal-light mr-3" size={20} />
                      ) : index === 2 ? (
                        <Coffee className="text-teal dark:text-teal-light mr-3" size={20} />
                      ) : index === 3 ? (
                        <Users className="text-teal dark:text-teal-light mr-3" size={20} />
                      ) : (
                        <Shower className="text-teal dark:text-teal-light mr-3" size={20} />
                      )}
                      <span className="text-neutrals-dark dark:text-white">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md mb-6">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4">
                  Regras da Casa
                </h2>
                <ul className="space-y-2">
                  {accommodation.rules.map((rule: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal dark:bg-teal-light mr-3"></div>
                      <span className="text-neutrals-dark dark:text-white">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4">
                  Localização
                </h2>
                <p className="text-neutrals-dark dark:text-white mb-4">
                  {accommodation.address}
                </p>
                <div className="rounded-lg overflow-hidden h-72">
                  <iframe
                    src={accommodation.mapLocation}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização da acomodação"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 shadow-md sticky top-28">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-2">
                  €{accommodation.pricePerWeek}
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    / semana
                  </span>
                </h2>
                <div className="flex items-center mb-6">
                  <Clock size={18} className="text-teal dark:text-teal-light mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Alta disponibilidade para os próximos meses
                  </span>
                </div>
                <Link
                  to={`/reservation-form?accommodation=${accommodation.id}`}
                  className="block w-full bg-teal dark:bg-teal-light text-white dark:text-teal text-center py-3 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition font-medium btn-hover-effect mb-4"
                >
                  Reservar Agora
                </Link>
                <a
                  href={`https://wa.me/353000000000?text=Olá! Tenho interesse na acomodação ${accommodation.name} (${accommodation.city}). Poderia me dar mais informações?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-teal dark:border-teal-light text-teal dark:text-teal-light text-center py-3 rounded-lg hover:bg-teal hover:bg-opacity-5 dark:hover:bg-teal-light dark:hover:bg-opacity-5 transition font-medium"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton 
        phoneNumber="353000000000"
        message={`Olá! Tenho interesse na acomodação ${accommodation.name} (${accommodation.city}). Poderia me dar mais informações?`}
      />
    </div>
  );
};

export default AccommodationDetail;
