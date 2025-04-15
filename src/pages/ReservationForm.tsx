import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/DatePicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const ReservationForm = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [hasFoodRestrictions, setHasFoodRestrictions] = useState(false);
  const [foodRestrictionDetails, setFoodRestrictionDetails] = useState("");
  const [hasHealthRestrictions, setHasHealthRestrictions] = useState(false);
  const [healthRestrictionDetails, setHealthRestrictionDetails] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactEmail, setEmergencyContactEmail] = useState("");
  const [extraNightRequired, setExtraNightRequired] = useState(false);
  const [extraNightType, setExtraNightType] = useState("before");
  const [extraNightQuantity, setExtraNightQuantity] = useState(1);
  const [extraNightDates, setExtraNightDates] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAccommodations = async () => {
      const { data, error } = await supabase
        .from('accommodations')
        .select('*');

      if (error) {
        console.error("Error fetching accommodations:", error);
        toast.error("Erro ao carregar acomodações.");
      } else {
        setAccommodations(data);
      }
    };

    fetchAccommodations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Check if required fields are filled
      if (!firstName || !lastName || !email || !phone || !nationality || !selectedAccommodation) {
        toast.error("Por favor, preencha todos os campos obrigatórios");
        setSubmitting(false);
        return;
      }

      // Form data for the reservation
      const reservationData = {
        accommodation_id: selectedAccommodation,
        check_in: checkIn.toISOString(),
        check_out: checkOut.toISOString(),
        food_restriction: hasFoodRestrictions,
        food_restriction_details: foodRestrictionDetails,
        health_restriction: hasHealthRestrictions,
        health_restriction_details: healthRestrictionDetails,
        emergency_contact_name: emergencyContactName,
        emergency_contact_relation: emergencyContactRelationship,
        emergency_contact_phone: emergencyContactPhone,
        emergency_contact_email: emergencyContactEmail,
        extra_night_required: extraNightRequired,
        extra_night_type: extraNightType,
        extra_night_quantity: extraNightQuantity,
        extra_night_dates: extraNightDates,
        total_price: calculatePrice(),
        weeks: calculateWeeks(),
        form_submitted: true
      };

      // Create user profile data
      const userProfile = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        nationality: nationality,
        form_submitted: true
      };

      // First check if user already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', phone)
        .single();

      let userId;

      if (existingUser) {
        userId = existingUser.id;
        
        // Update existing profile
        await supabase
          .from('profiles')
          .update(userProfile)
          .eq('id', userId);
      } else {
        // Create new user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: email,
          password: Math.random().toString(36).slice(-10) + Math.random().toString(36).toUpperCase().slice(-2) + Math.random().toString(36).slice(-2),
          options: {
            data: {
              full_name: `${firstName} ${lastName}`,
              phone: phone
            },
            emailRedirectTo: `${window.location.origin}/client-area`
          }
        });

        if (authError) {
          throw new Error(authError.message);
        }

        userId = authData.user.id;
      }

      // Insert the reservation with user_id
      const { error: reservationError } = await supabase
        .from('reservations')
        .insert({
          ...reservationData,
          user_id: userId
        });

      if (reservationError) {
        throw new Error(reservationError.message);
      }

      toast.success("Reserva enviada com sucesso!");
      setTimeout(() => {
        navigate("/client-area");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Erro ao enviar formulário: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate price based on selected accommodation and weeks
  const calculatePrice = () => {
    if (!selectedAccommodation || !accommodations) return 0;
    
    const accommodation = accommodations.find(acc => acc.id === selectedAccommodation);
    if (!accommodation) return 0;
    
    const weeks = calculateWeeks();
    return accommodation.price_per_week * weeks;
  };

  // Calculate weeks between check-in and check-out dates
  const calculateWeeks = () => {
    if (!checkIn || !checkOut) return 0;
    
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 7);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Formulário de Reserva</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Informações Pessoais */}
        <div>
          <Label htmlFor="firstName">Nome</Label>
          <Input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="nationality">Nacionalidade</Label>
          <Input
            type="text"
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            required
          />
        </div>

        {/* Informações da Reserva */}
        <div>
          <Label htmlFor="accommodation">Acomodação</Label>
          <Select onValueChange={setSelectedAccommodation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a acomodação" />
            </SelectTrigger>
            <SelectContent>
              {accommodations.map((accommodation) => (
                <SelectItem key={accommodation.id} value={String(accommodation.id)}>
                  {accommodation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Check-in</Label>
          <DatePicker date={checkIn} setDate={setCheckIn} />
        </div>
        <div>
          <Label>Check-out</Label>
          <DatePicker date={checkOut} setDate={setCheckOut} />
        </div>

        {/* Restrições Alimentares */}
        <div className="md:col-span-2">
          <Label htmlFor="foodRestrictions" className="inline-flex items-center space-x-2">
            <Checkbox
              id="foodRestrictions"
              checked={hasFoodRestrictions}
              onCheckedChange={(checked) => setHasFoodRestrictions(!!checked)}
            />
            <span>Possui restrições alimentares?</span>
          </Label>
          {hasFoodRestrictions && (
            <Textarea
              id="foodRestrictionDetails"
              placeholder="Descreva suas restrições alimentares"
              value={foodRestrictionDetails}
              onChange={(e) => setFoodRestrictionDetails(e.target.value)}
              className="mt-2"
            />
          )}
        </div>

        {/* Restrições de Saúde */}
        <div className="md:col-span-2">
          <Label htmlFor="healthRestrictions" className="inline-flex items-center space-x-2">
            <Checkbox
              id="healthRestrictions"
              checked={hasHealthRestrictions}
              onCheckedChange={(checked) => setHasHealthRestrictions(!!checked)}
            />
            <span>Possui restrições de saúde?</span>
          </Label>
          {hasHealthRestrictions && (
            <Textarea
              id="healthRestrictionDetails"
              placeholder="Descreva suas restrições de saúde"
              value={healthRestrictionDetails}
              onChange={(e) => setHealthRestrictionDetails(e.target.value)}
              className="mt-2"
            />
          )}
        </div>

        {/* Contato de Emergência */}
        <div>
          <Label htmlFor="emergencyContactName">Nome do Contato de Emergência</Label>
          <Input
            type="text"
            id="emergencyContactName"
            value={emergencyContactName}
            onChange={(e) => setEmergencyContactName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="emergencyContactRelationship">Relação com o Contato</Label>
          <Input
            type="text"
            id="emergencyContactRelationship"
            value={emergencyContactRelationship}
            onChange={(e) => setEmergencyContactRelationship(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="emergencyContactPhone">Telefone do Contato de Emergência</Label>
          <Input
            type="tel"
            id="emergencyContactPhone"
            value={emergencyContactPhone}
            onChange={(e) => setEmergencyContactPhone(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="emergencyContactEmail">Email do Contato de Emergência</Label>
          <Input
            type="email"
            id="emergencyContactEmail"
            value={emergencyContactEmail}
            onChange={(e) => setEmergencyContactEmail(e.target.value)}
          />
        </div>

        {/* Noite Extra */}
        <div className="md:col-span-2">
          <Label htmlFor="extraNightRequired" className="inline-flex items-center space-x-2">
            <Checkbox
              id="extraNightRequired"
              checked={extraNightRequired}
              onCheckedChange={(checked) => setExtraNightRequired(!!checked)}
            />
            <span>Precisa de noite extra?</span>
          </Label>
          {extraNightRequired && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="extraNightType">Tipo de Noite Extra</Label>
                <Select defaultValue={extraNightType} onValueChange={setExtraNightType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Antes</SelectItem>
                    <SelectItem value="after">Depois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="extraNightQuantity">Quantidade de Noites Extras</Label>
                <Input
                  type="number"
                  id="extraNightQuantity"
                  value={extraNightQuantity}
                  onChange={(e) => setExtraNightQuantity(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="extraNightDates">Datas das Noites Extras</Label>
                <Input
                  type="text"
                  id="extraNightDates"
                  value={extraNightDates}
                  onChange={(e) => setExtraNightDates(e.target.value)}
                  placeholder="Ex: 2024-07-01, 2024-07-02"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <Button type="submit" disabled={submitting} className="w-full bg-teal text-white">
            {submitting ? "Enviando..." : "Enviar Reserva"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
