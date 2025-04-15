import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/DatePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, ChevronLeft, File, FileCheck, Calendar, User, Phone, Mail, Flag, AlertCircle, Star, Clock } from "lucide-react";

const ReservationForm = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [submitting, setSubmitting] = useState(false);
  
  // Informações pessoais
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  
  // Documentos
  const [passportFile, setPassportFile] = useState(null);
  const [schoolLetterFile, setSchoolLetterFile] = useState(null);
  const [passportFileName, setPassportFileName] = useState("");
  const [schoolLetterFileName, setSchoolLetterFileName] = useState("");
  
  // Detalhes da reserva
  const [selectedAccommodation, setSelectedAccommodation] = useState("");
  const [checkIn, setCheckIn] = useState(undefined);
  const [checkOut, setCheckOut] = useState(undefined);
  
  // Restrições
  const [hasFoodRestrictions, setHasFoodRestrictions] = useState(false);
  const [foodRestrictionDetails, setFoodRestrictionDetails] = useState("");
  const [hasHealthRestrictions, setHasHealthRestrictions] = useState(false);
  const [healthRestrictionDetails, setHealthRestrictionDetails] = useState("");
  
  // Contato de emergência
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContactEmail, setEmergencyContactEmail] = useState("");
  
  // Noites extras
  const [extraNightRequired, setExtraNightRequired] = useState(false);
  const [extraNightType, setExtraNightType] = useState("before");
  const [extraNightQuantity, setExtraNightQuantity] = useState(1);
  const [extraNightDates, setExtraNightDates] = useState("");

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        setLoading(true);
        console.log("Buscando acomodações...");
        
        const { data, error } = await supabase
          .from('accommodations')
          .select('*')
          .eq('is_active', true);

        if (error) {
          console.error("Erro ao carregar acomodações:", error);
          toast.error("Erro ao carregar acomodações. Por favor, tente novamente.");
          return;
        }
        
        console.log("Acomodações encontradas:", data?.length || 0);
        if (data && data.length > 0) {
          setAccommodations(data);
        } else {
          console.log("Nenhuma acomodação ativa encontrada");
          toast.warning("Nenhuma acomodação disponível no momento.");
        }
      } catch (err) {
        console.error("Exceção ao buscar acomodações:", err);
        toast.error("Erro inesperado ao carregar acomodações.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodations();
  }, []);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (fileType === 'passport') {
      setPassportFile(file);
      setPassportFileName(file.name);
    } else if (fileType === 'schoolLetter') {
      setSchoolLetterFile(file);
      setSchoolLetterFileName(file.name);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Informações pessoais
        if (!firstName || !lastName || !email || !phone || !nationality) {
          toast.error("Por favor, preencha todos os campos");
          return false;
        }
        return true;
      case 2: // Documentos obrigatórios
        if (!passportFile) {
          toast.error("Por favor, faça upload do seu passaporte");
          return false;
        }
        if (!schoolLetterFile) {
          toast.error("Por favor, faça upload da carta da escola");
          return false;
        }
        return true;
      case 3: // Informações médicas e contato de emergência
        if (hasFoodRestrictions && !foodRestrictionDetails) {
          toast.error("Por favor, descreva suas restrições alimentares");
          return false;
        }
        if (hasHealthRestrictions && !healthRestrictionDetails) {
          toast.error("Por favor, descreva suas restrições de saúde");
          return false;
        }
        if (!emergencyContactName || !emergencyContactRelationship || !emergencyContactPhone || !emergencyContactEmail) {
          toast.error("Por favor, preencha todos os campos do contato de emergência");
          return false;
        }
        return true;
      case 4: // Detalhes da reserva e noites extras
        if (!selectedAccommodation) {
          toast.error("Por favor, selecione uma acomodação");
          return false;
        }
        if (!checkIn || !checkOut) {
          toast.error("Por favor, selecione as datas de check-in e check-out");
          return false;
        }
        if (extraNightRequired && (!extraNightType || !extraNightQuantity)) {
          toast.error("Por favor, preencha os detalhes das noites extras");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const uploadFiles = async () => {
    let passportPath = null;
    if (passportFile) {
      passportPath = `${Date.now()}_${passportFile.name}`;
      const { error: passportError } = await supabase.storage
        .from('documents')
        .upload(passportPath, passportFile);

      if (passportError) {
        console.error("Erro ao fazer upload do passaporte:", passportError);
        throw new Error("Erro ao fazer upload do passaporte");
      }
    }

    let schoolLetterPath = null;
    if (schoolLetterFile) {
      schoolLetterPath = `${Date.now()}_${schoolLetterFile.name}`;
      const { error: schoolLetterError } = await supabase.storage
        .from('documents')
        .upload(schoolLetterPath, schoolLetterFile);

      if (schoolLetterError) {
        console.error("Erro ao fazer upload da carta da escola:", schoolLetterError);
        throw new Error("Erro ao fazer upload da carta da escola");
      }
    }

    return { passportPath, schoolLetterPath };
  };

  const calculateWeeks = () => {
    if (!checkIn || !checkOut) return 0;
    
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.ceil(diffDays / 7);
  };

  const calculatePrice = () => {
    if (!selectedAccommodation || !accommodations.length) return 0;
    
    const accommodation = accommodations.find(acc => acc.id === selectedAccommodation);
    if (!accommodation) return 0;
    
    const weeks = calculateWeeks();
    return accommodation.price_per_week * weeks;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    
    setSubmitting(true);

    try {
      const { passportPath, schoolLetterPath } = await uploadFiles();

      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('phone', phone)
        .single();

      let userId;

      if (existingUser) {
        userId = existingUser.id;
        
        await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            nationality: nationality,
            form_submitted: true
          })
          .eq('id', userId);
      } else {
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

      const reservationData = {
        user_id: userId,
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

      const { error: reservationError } = await supabase
        .from('reservations')
        .insert(reservationData);

      if (reservationError) {
        throw new Error(reservationError.message);
      }

      if (passportPath) {
        await supabase.from('documents').insert({
          user_id: userId,
          document_type: 'passport',
          file_name: passportFileName,
          file_url: passportPath,
          status: 'aguardando'
        });
      }

      if (schoolLetterPath) {
        await supabase.from('documents').insert({
          user_id: userId,
          document_type: 'school_letter',
          file_name: schoolLetterFileName,
          file_url: schoolLetterPath,
          status: 'aguardando'
        });
      }

      toast.success("Reserva enviada com sucesso!");
      setTimeout(() => {
        navigate("/client-area");
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error(`Erro ao enviar formulário: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">1. Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User size={16} />
                  Nome
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User size={16} />
                  Sobrenome
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={16} />
                  Telefone (com DDD)
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationality" className="flex items-center gap-2">
                  <Flag size={16} />
                  Nacionalidade
                </Label>
                <Input
                  type="text"
                  id="nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">2. Documentos Obrigatórios</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="border p-4 rounded-md">
                <Label htmlFor="passport" className="flex items-center gap-2 mb-2">
                  <File size={16} />
                  Upload do Passaporte
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    id="passport"
                    onChange={(e) => handleFileChange(e, 'passport')}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => document.getElementById('passport').click()}
                    variant="outline"
                    className="flex-1"
                  >
                    Selecionar arquivo
                  </Button>
                  {passportFileName && (
                    <div className="flex items-center text-green-600 gap-2">
                      <FileCheck size={16} />
                      <span className="text-sm truncate max-w-[200px]">{passportFileName}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border p-4 rounded-md">
                <Label htmlFor="schoolLetter" className="flex items-center gap-2 mb-2">
                  <File size={16} />
                  Upload da Carta da Escola
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    id="schoolLetter"
                    onChange={(e) => handleFileChange(e, 'schoolLetter')}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => document.getElementById('schoolLetter').click()}
                    variant="outline"
                    className="flex-1"
                  >
                    Selecionar arquivo
                  </Button>
                  {schoolLetterFileName && (
                    <div className="flex items-center text-green-600 gap-2">
                      <FileCheck size={16} />
                      <span className="text-sm truncate max-w-[200px]">{schoolLetterFileName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">3. Informações Médicas e de Emergência</h2>
            
            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="font-medium">Restrições Alimentares</h3>
              <div className="flex items-center gap-2 mb-3">
                <Label className="!m-0">Possui restrições alimentares?</Label>
                <RadioGroup 
                  value={hasFoodRestrictions ? "yes" : "no"}
                  onValueChange={(val) => setHasFoodRestrictions(val === "yes")}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-1.5">
                    <RadioGroupItem value="yes" id="food-yes" />
                    <Label htmlFor="food-yes" className="!m-0">Sim</Label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RadioGroupItem value="no" id="food-no" />
                    <Label htmlFor="food-no" className="!m-0">Não</Label>
                  </div>
                </RadioGroup>
              </div>
              {hasFoodRestrictions && (
                <div>
                  <Label htmlFor="foodRestrictionDetails" className="flex items-center gap-2">
                    <AlertCircle size={16} />
                    Detalhes das restrições alimentares
                  </Label>
                  <Textarea
                    id="foodRestrictionDetails"
                    placeholder="Descreva suas restrições alimentares"
                    value={foodRestrictionDetails}
                    onChange={(e) => setFoodRestrictionDetails(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="font-medium">Restrições de Saúde</h3>
              <div className="flex items-center gap-2 mb-3">
                <Label className="!m-0">Possui restrições de saúde?</Label>
                <RadioGroup 
                  value={hasHealthRestrictions ? "yes" : "no"}
                  onValueChange={(val) => setHasHealthRestrictions(val === "yes")}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-1.5">
                    <RadioGroupItem value="yes" id="health-yes" />
                    <Label htmlFor="health-yes" className="!m-0">Sim</Label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RadioGroupItem value="no" id="health-no" />
                    <Label htmlFor="health-no" className="!m-0">Não</Label>
                  </div>
                </RadioGroup>
              </div>
              {hasHealthRestrictions && (
                <div>
                  <Label htmlFor="healthRestrictionDetails" className="flex items-center gap-2">
                    <AlertCircle size={16} />
                    Detalhes das restrições de saúde
                  </Label>
                  <Textarea
                    id="healthRestrictionDetails"
                    placeholder="Descreva suas restrições de saúde"
                    value={healthRestrictionDetails}
                    onChange={(e) => setHealthRestrictionDetails(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="font-medium">Contato de Emergência</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyContactName" className="flex items-center gap-2">
                    <User size={16} />
                    Nome do Contato de Emergência
                  </Label>
                  <Input
                    type="text"
                    id="emergencyContactName"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContactRelationship" className="flex items-center gap-2">
                    Grau de Parentesco
                  </Label>
                  <Input
                    type="text"
                    id="emergencyContactRelationship"
                    value={emergencyContactRelationship}
                    onChange={(e) => setEmergencyContactRelationship(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContactPhone" className="flex items-center gap-2">
                    <Phone size={16} />
                    Telefone do Contato de Emergência
                  </Label>
                  <Input
                    type="tel"
                    id="emergencyContactPhone"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContactEmail" className="flex items-center gap-2">
                    <Mail size={16} />
                    Email do Contato de Emergência
                  </Label>
                  <Input
                    type="email"
                    id="emergencyContactEmail"
                    value={emergencyContactEmail}
                    onChange={(e) => setEmergencyContactEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">4. Detalhes da Reserva</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="accommodation" className="flex items-center gap-2">
                  <Star size={16} />
                  Acomodação
                </Label>
                {loading ? (
                  <div className="py-2 px-4 border rounded-md text-gray-500">Carregando acomodações...</div>
                ) : accommodations.length > 0 ? (
                  <Select value={selectedAccommodation} onValueChange={setSelectedAccommodation}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a acomodação" />
                    </SelectTrigger>
                    <SelectContent>
                      {accommodations.map((accommodation) => (
                        <SelectItem key={accommodation.id} value={accommodation.id}>
                          {accommodation.title || accommodation.name} - {accommodation.neighborhood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="py-2 px-4 border rounded-md text-red-500">
                    Nenhuma acomodação disponível. Por favor, entre em contato conosco.
                  </div>
                )}
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Calendar size={16} />
                  Check-in
                </Label>
                <DatePicker date={checkIn} setDate={setCheckIn} />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Calendar size={16} />
                  Check-out
                </Label>
                <DatePicker date={checkOut} setDate={setCheckOut} />
              </div>
            </div>
            
            <div className="space-y-4 border p-4 rounded-md mt-6">
              <h3 className="font-medium">Noites Extras</h3>
              <div className="flex items-center gap-2 mb-3">
                <Label className="!m-0">Precisa de noites extras?</Label>
                <RadioGroup 
                  value={extraNightRequired ? "yes" : "no"}
                  onValueChange={(val) => setExtraNightRequired(val === "yes")}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center gap-1.5">
                    <RadioGroupItem value="yes" id="extra-yes" />
                    <Label htmlFor="extra-yes" className="!m-0">Sim</Label>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RadioGroupItem value="no" id="extra-no" />
                    <Label htmlFor="extra-no" className="!m-0">Não</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {extraNightRequired && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="extraNightType" className="flex items-center gap-2">
                      <Clock size={16} />
                      Quando?
                    </Label>
                    <Select value={extraNightType} onValueChange={setExtraNightType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="before">Antes do check-in</SelectItem>
                        <SelectItem value="after">Depois do check-out</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="extraNightQuantity" className="flex items-center gap-2">
                      <Calendar size={16} />
                      Quantidade de Noites Extras
                    </Label>
                    <Input
                      type="number"
                      id="extraNightQuantity"
                      value={extraNightQuantity}
                      onChange={(e) => setExtraNightQuantity(Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="extraNightDates" className="flex items-center gap-2">
                      <Calendar size={16} />
                      Datas Desejadas
                    </Label>
                    <Input
                      type="text"
                      id="extraNightDates"
                      value={extraNightDates}
                      onChange={(e) => setExtraNightDates(e.target.value)}
                      placeholder="Ex: 01/07/2024, 02/07/2024"
                    />
                  </div>
                </div>
              )}
            </div>
            
            {selectedAccommodation && (
              <div className="border p-4 rounded-md bg-slate-50 dark:bg-slate-900">
                <h3 className="font-medium mb-2">Resumo da Reserva</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Acomodação:</strong> {accommodations.find(acc => acc.id === selectedAccommodation)?.title || accommodations.find(acc => acc.id === selectedAccommodation)?.name}</p>
                  {checkIn && <p><strong>Check-in:</strong> {checkIn.toLocaleDateString()}</p>}
                  {checkOut && <p><strong>Check-out:</strong> {checkOut.toLocaleDateString()}</p>}
                  <p><strong>Semanas:</strong> {calculateWeeks()}</p>
                  <p><strong>Valor Total:</strong> R$ {calculatePrice().toFixed(2)}</p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Formulário de Reserva</h1>
      
      {/* Barra de progresso */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-1">
          <span>Progresso</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Informações Pessoais</span>
          <span>Documentos</span>
          <span>Informações Médicas</span>
          <span>Detalhes da Reserva</span>
        </div>
      </div>
      
      <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        {renderStepContent()}
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <Button 
              type="button" 
              onClick={handlePrevious}
              variant="outline"
              className="flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Anterior
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button 
              type="button" 
              onClick={handleNext}
              className="ml-auto flex items-center gap-1"
            >
              Próximo
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={submitting}
              className="ml-auto"
            >
              {submitting ? "Enviando..." : "Enviar Reserva"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
