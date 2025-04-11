
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Home, Search } from "lucide-react";

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

const SearchBar = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (city) params.append("city", city);
    if (checkIn) params.append("checkIn", checkIn);
    if (checkOut) params.append("checkOut", checkOut);
    if (roomType) params.append("roomType", roomType);

    navigate(`/accommodations?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-neutrals-dark rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label htmlFor="city" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
            Cidade
          </label>
          <div className="relative">
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
            >
              <option value="">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-teal dark:text-teal-light" size={18} />
          </div>
        </div>

        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
            Check-in
          </label>
          <div className="relative">
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal dark:text-teal-light" size={18} />
          </div>
        </div>

        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
            Check-out
          </label>
          <div className="relative">
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal dark:text-teal-light" size={18} />
          </div>
        </div>

        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
            Tipo de Quarto
          </label>
          <div className="relative">
            <select
              id="roomType"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutrals-dark text-neutrals-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-teal dark:focus:ring-teal-light"
            >
              <option value="">Selecione um tipo</option>
              {roomTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-teal dark:text-teal-light" size={18} />
          </div>
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-4 bg-teal dark:bg-teal-light text-white dark:text-teal font-medium py-3 px-4 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition flex items-center justify-center gap-2 btn-hover-effect"
        >
          <Search size={18} />
          <span>Buscar Acomodações</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
