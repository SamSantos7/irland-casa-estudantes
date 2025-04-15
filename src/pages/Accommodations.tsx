
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccommodationCard from "../components/AccommodationCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { Filter, X, Check, Loader2 } from "lucide-react";
import { RoomType, BathroomType } from "../components/AccommodationCard";
import SEO from "../components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Tipos para os dados do banco
type AccommodationData = {
  id: string;
  title: string;
  city: string;
  room_type: RoomType;
  bathroom_type: BathroomType;
  price_per_week: number;
  neighborhood?: string;
  min_weeks: number;
  gender: string;
  bathroom_shared_count?: number | null;
};

const cities = [
  { value: "dublin", label: "Dublin" },
  { value: "cork", label: "Cork" },
  { value: "galway", label: "Galway" },
  { value: "limerick", label: "Limerick" },
];

const roomTypes = [
  { value: "individual", label: "Quarto Individual" },
  { value: "duplo", label: "Quarto Duplo" },
  { value: "triplo", label: "Quarto Triplo" },
  { value: "quadruplo", label: "Quarto Quádruplo" },
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
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [accommodations, setAccommodations] = useState<AccommodationData[]>([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState<AccommodationData[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar acomodações do Supabase
  useEffect(() => {
    const fetchAccommodations = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('accommodations')
          .select('*')
          .eq('is_active', true)
          .order('city');
          
        if (error) throw error;
        
        if (data) {
          setAccommodations(data);
          setFilteredAccommodations(data);
        }
      } catch (error: any) {
        toast({
          title: "Erro ao carregar acomodações",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  // Aplicar filtros da query string
  useEffect(() => {
    const city = searchParams.get("city");
    const roomType = searchParams.get("roomType");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (city) setSelectedCities([city.toLowerCase()]);
    if (roomType) setSelectedRoomTypes([roomType]);

    if (accommodations.length > 0) {
      applyFilters(
        city ? [city.toLowerCase()] : [],
        roomType ? [roomType] : [],
        [],
        "all"
      );
    }
  }, [searchParams, accommodations]);

  const applyFilters = (
    cities: string[],
    roomTypes: string[],
    priceRanges: string[],
    availability: string
  ) => {
    let filtered = [...accommodations];

    if (cities.length > 0) {
      filtered = filtered.filter((acc) => cities.includes(acc.city.toLowerCase()));
    }

    if (roomTypes.length > 0) {
      filtered = filtered.filter((acc) => roomTypes.includes(acc.room_type));
    }

    if (priceRanges.length > 0) {
      filtered = filtered.filter((acc) => {
        return priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return acc.price_per_week >= min && acc.price_per_week <= max;
        });
      });
    }

    // Nota: o campo availability precisa ser implementado se necessário

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

  // Determinar status de disponibilidade com base na quantidade de acomodações similares
  const getAvailabilityStatus = (roomType: string, city: string): "normal" | "limited" | "last_units" => {
    const similar = filteredAccommodations.filter(
      acc => acc.room_type === roomType && acc.city.toLowerCase() === city.toLowerCase()
    );
    
    if (similar.length <= 1) return "last_units";
    if (similar.length <= 3) return "limited";
    return "normal";
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
                    {!isLoading ? `${filteredAccommodations.length} acomodações encontradas` : 'Carregando acomodações...'}
                  </h2>
                  <p className="text-muted-foreground">
                    Encontre o lugar ideal para sua estadia na Irlanda
                  </p>
                </div>
                
                {isLoading ? (
                  <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-teal" />
                  </div>
                ) : filteredAccommodations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAccommodations.map((accommodation) => (
                      <AccommodationCard 
                        key={accommodation.id}
                        id={Number(accommodation.id.substring(0, 8))} // Usando um ID numérico para compatibilidade
                        name={accommodation.title}
                        city={accommodation.city}
                        roomType={accommodation.room_type}
                        pricePerWeek={accommodation.price_per_week}
                        imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" // Precisaremos obter as imagens do banco posteriormente
                        availabilityStatus={getAvailabilityStatus(accommodation.room_type, accommodation.city)}
                        neighborhood={accommodation.neighborhood || "Centro"}
                        minWeeks={accommodation.min_weeks}
                        bathroomType={accommodation.bathroom_type}
                        bathroomShared={accommodation.bathroom_shared_count || 2}
                        genderDivision={accommodation.gender === "feminino" || accommodation.gender === "masculino" ? "same" : "mixed"}
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
                
                {filteredAccommodations.length > 0 && !isLoading && (
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
