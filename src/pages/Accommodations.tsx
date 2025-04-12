
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccommodationCard from "../components/AccommodationCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { Filter, X, Check } from "lucide-react";
import { RoomType } from "../components/AccommodationCard";
import SEO from "../components/SEO";

// Sample accommodations data
const accommodationsData = [
  {
    id: 1,
    name: "Dublin Central Residence",
    city: "dublin",
    roomType: "individual" as RoomType,
    pricePerWeek: 250,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "limited" as "normal" | "limited" | "last_units",
    neighborhood: "Centro",
    minWeeks: 4
  },
  {
    id: 2,
    name: "Dublin Student Loft",
    city: "dublin",
    roomType: "shared" as RoomType,
    pricePerWeek: 180,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "normal" as "normal" | "limited" | "last_units",
    neighborhood: "Universitário",
    minWeeks: 8
  },
  {
    id: 3,
    name: "Dublin Bay View",
    city: "dublin",
    roomType: "double" as RoomType,
    pricePerWeek: 320,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "last_units" as "normal" | "limited" | "last_units",
    neighborhood: "Costa",
    minWeeks: 6
  },
  {
    id: 4,
    name: "Cork Student House",
    city: "cork",
    roomType: "individual" as RoomType,
    pricePerWeek: 220,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "normal" as "normal" | "limited" | "last_units",
    neighborhood: "Centro",
    minWeeks: 4
  },
  {
    id: 5,
    name: "Cork City Apartment",
    city: "cork",
    roomType: "shared" as RoomType,
    pricePerWeek: 170,
    imageUrl: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "limited" as "normal" | "limited" | "last_units",
    neighborhood: "Sul",
    minWeeks: 12
  },
  {
    id: 6,
    name: "Galway Campus Suite",
    city: "galway",
    roomType: "individual" as RoomType,
    pricePerWeek: 240,
    imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "last_units" as "normal" | "limited" | "last_units",
    neighborhood: "Campus",
    minWeeks: 16
  },
  {
    id: 7,
    name: "Galway Seaside Home",
    city: "galway",
    roomType: "double" as RoomType,
    pricePerWeek: 300,
    imageUrl: "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "normal" as "normal" | "limited" | "last_units",
    neighborhood: "Salthill",
    minWeeks: 4
  },
  {
    id: 8,
    name: "Limerick City View",
    city: "limerick",
    roomType: "individual" as RoomType,
    pricePerWeek: 210,
    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "limited" as "normal" | "limited" | "last_units",
    neighborhood: "Centro Histórico",
    minWeeks: 8
  },
  {
    id: 9,
    name: "Limerick Campus Residence",
    city: "limerick",
    roomType: "shared" as RoomType,
    pricePerWeek: 160,
    imageUrl: "https://images.unsplash.com/photo-1559599238-3d0d41863f8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    availabilityStatus: "normal" as "normal" | "limited" | "last_units",
    neighborhood: "Campus",
    minWeeks: 12
  },
];

const cities = [
  { value: "dublin", label: "Dublin" },
  { value: "cork", label: "Cork" },
  { value: "galway", label: "Galway" },
  { value: "limerick", label: "Limerick" },
];

const roomTypes = [
  { value: "individual", label: "Quarto Individual" },
  { value: "shared", label: "Quarto Compartilhado" },
  { value: "double", label: "Quarto de Casal" },
];

const priceRanges = [
  { value: "0-200", label: "Até €200/semana" },
  { value: "201-250", label: "€201 - €250/semana" },
  { value: "251-300", label: "€251 - €300/semana" },
  { value: "301-1000", label: "Acima de €300/semana" },
];

const availabilityOptions = [
  { value: "all", label: "Todas as disponibilidades" },
  { value: "limited", label: "Vagas limitadas" },
  { value: "last_units", label: "Últimas unidades" },
];

const Accommodations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredAccommodations, setFilteredAccommodations] = useState(accommodationsData);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const city = searchParams.get("city");
    const roomType = searchParams.get("roomType");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (city) setSelectedCities([city]);
    if (roomType) setSelectedRoomTypes([roomType]);

    applyFilters(
      city ? [city] : [],
      roomType ? [roomType] : [],
      [],
      "all"
    );
  }, [searchParams]);

  const applyFilters = (
    cities: string[],
    roomTypes: string[],
    priceRanges: string[],
    availability: string
  ) => {
    let filtered = [...accommodationsData];

    if (cities.length > 0) {
      filtered = filtered.filter((acc) => cities.includes(acc.city));
    }

    if (roomTypes.length > 0) {
      filtered = filtered.filter((acc) => roomTypes.includes(acc.roomType));
    }

    if (priceRanges.length > 0) {
      filtered = filtered.filter((acc) => {
        return priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return acc.pricePerWeek >= min && acc.pricePerWeek <= max;
        });
      });
    }

    if (availability !== "all") {
      filtered = filtered.filter((acc) => acc.availabilityStatus === availability);
    }

    setFilteredAccommodations(filtered);
  };

  const toggleCity = (city: string) => {
    const newSelectedCities = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newSelectedCities);
    applyFilters(newSelectedCities, selectedRoomTypes, selectedPriceRanges, selectedAvailability);
  };

  const toggleRoomType = (roomType: string) => {
    const newSelectedRoomTypes = selectedRoomTypes.includes(roomType)
      ? selectedRoomTypes.filter((rt) => rt !== roomType)
      : [...selectedRoomTypes, roomType];
    setSelectedRoomTypes(newSelectedRoomTypes);
    applyFilters(selectedCities, newSelectedRoomTypes, selectedPriceRanges, selectedAvailability);
  };

  const togglePriceRange = (priceRange: string) => {
    const newSelectedPriceRanges = selectedPriceRanges.includes(priceRange)
      ? selectedPriceRanges.filter((pr) => pr !== priceRange)
      : [...selectedPriceRanges, priceRange];
    setSelectedPriceRanges(newSelectedPriceRanges);
    applyFilters(selectedCities, selectedRoomTypes, newSelectedPriceRanges, selectedAvailability);
  };
  
  const handleAvailabilityChange = (availability: string) => {
    setSelectedAvailability(availability);
    applyFilters(selectedCities, selectedRoomTypes, selectedPriceRanges, availability);
  };

  const clearFilters = () => {
    setSelectedCities([]);
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSelectedAvailability("all");
    applyFilters([], [], [], "all");
  };

  const toggleFiltersView = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Acomodações Estudantis na Irlanda | Irlanda Casa Estudantes"
        description="Encontre acomodações estudantis em Dublin, Cork, Galway e Limerick. Opções de quartos individuais, compartilhados e casais com suporte em português."
        canonical="/accommodations"
        altText="Quartos estudantis na Irlanda - vista de acomodações disponíveis"
      />
      <Navbar />

      <main className="flex-grow pt-24">
        <section className="bg-teal dark:bg-teal py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Acomodações Estudantis</h1>
            <p className="text-white/80 mt-2 text-lg">
              Encontre o lugar perfeito para sua estadia na Irlanda
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              <button
                onClick={toggleFiltersView}
                className="lg:hidden flex items-center justify-center gap-2 w-full py-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-neutrals-dark shadow-sm"
              >
                <Filter size={20} />
                <span>{showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}</span>
              </button>

              <div
                className={`w-full lg:w-1/4 ${
                  showFilters ? "block" : "hidden"
                } lg:block bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-md mb-6 lg:mb-0 h-fit`}
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white">
                    Filtros
                  </h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-teal dark:text-teal-light hover:underline"
                  >
                    Limpar Filtros
                  </button>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-neutrals-dark dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Cidade
                  </h3>
                  <div className="space-y-3">
                    {cities.map((city) => (
                      <label
                        key={city.value}
                        className="flex items-center cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                            selectedCities.includes(city.value)
                              ? "bg-teal dark:bg-teal-light border-teal dark:border-teal-light"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          onClick={() => toggleCity(city.value)}
                        >
                          {selectedCities.includes(city.value) && (
                            <Check size={14} className="text-white dark:text-teal" />
                          )}
                        </div>
                        <span className="text-neutrals-dark dark:text-white">
                          {city.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-neutrals-dark dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Tipo de Quarto
                  </h3>
                  <div className="space-y-3">
                    {roomTypes.map((type) => (
                      <label
                        key={type.value}
                        className="flex items-center cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                            selectedRoomTypes.includes(type.value)
                              ? "bg-teal dark:bg-teal-light border-teal dark:border-teal-light"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          onClick={() => toggleRoomType(type.value)}
                        >
                          {selectedRoomTypes.includes(type.value) && (
                            <Check size={14} className="text-white dark:text-teal" />
                          )}
                        </div>
                        <span className="text-neutrals-dark dark:text-white">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-neutrals-dark dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Faixa de Preço
                  </h3>
                  <div className="space-y-3">
                    {priceRanges.map((range) => (
                      <label
                        key={range.value}
                        className="flex items-center cursor-pointer"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border mr-3 flex items-center justify-center ${
                            selectedPriceRanges.includes(range.value)
                              ? "bg-teal dark:bg-teal-light border-teal dark:border-teal-light"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                          onClick={() => togglePriceRange(range.value)}
                        >
                          {selectedPriceRanges.includes(range.value) && (
                            <Check size={14} className="text-white dark:text-teal" />
                          )}
                        </div>
                        <span className="text-neutrals-dark dark:text-white">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-neutrals-dark dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                    Disponibilidade
                  </h3>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => handleAvailabilityChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:ring-2 focus:ring-teal focus:border-teal dark:focus:ring-teal-light dark:focus:border-teal-light transition-all"
                  >
                    {availabilityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="w-full lg:w-3/4">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-2">
                    {filteredAccommodations.length} acomodações encontradas
                  </h2>
                  <p className="text-muted-foreground">
                    Encontre o lugar ideal para sua estadia na Irlanda
                  </p>
                </div>
                {filteredAccommodations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAccommodations.map((accommodation) => (
                      <AccommodationCard 
                        key={accommodation.id}
                        id={accommodation.id}
                        name={accommodation.name}
                        city={accommodation.city}
                        roomType={accommodation.roomType}
                        pricePerWeek={accommodation.pricePerWeek}
                        imageUrl={accommodation.imageUrl}
                        availabilityStatus={accommodation.availabilityStatus}
                        neighborhood={accommodation.neighborhood}
                        minWeeks={accommodation.minWeeks}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-neutrals-dark p-8 rounded-2xl text-center shadow-md">
                    <p className="text-lg text-neutrals-dark dark:text-white mb-4">
                      Nenhuma acomodação encontrada com os filtros selecionados.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-teal dark:bg-teal-light text-white dark:text-teal rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
                
                {filteredAccommodations.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <Link
                      to="/reservation-form"
                      className="bg-teal text-white dark:bg-teal-light dark:text-teal px-8 py-4 rounded-lg font-medium hover:bg-opacity-90 dark:hover:bg-opacity-90 transition btn-hover-effect text-lg shadow-md"
                    >
                      Reservar Agora
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="353000000000" fixed={true} />
    </div>
  );
};

export default Accommodations;
