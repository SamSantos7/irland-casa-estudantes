
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Bath, 
  Calendar, 
  Loader2, 
  MapPin, 
  Upload, 
  Users 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type RoomType = Database["public"]["Enums"]["room_type"];
type BathroomType = Database["public"]["Enums"]["bathroom_type"];
type RoomGender = Database["public"]["Enums"]["room_gender"];
type CheckinDay = Database["public"]["Enums"]["checkin_day"];

// Valores dos enums para popular os selects
const roomTypeOptions: RoomType[] = ["individual", "duplo", "triplo", "quadruplo"];
const bathroomTypeOptions: BathroomType[] = ["privativo", "compartilhado"];
const roomGenderOptions: RoomGender[] = ["masculino", "feminino", "misto"];
const checkinDayOptions: CheckinDay[] = ["sabado", "domingo", "qualquer"];

// Lista de comodidades comuns para selecionar
const amenitiesOptions = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "laundry", label: "Lavanderia" },
  { id: "kitchen", label: "Cozinha compartilhada" },
  { id: "heating", label: "Aquecedor" },
  { id: "tv", label: "TV" },
  { id: "desk", label: "Mesa de estudos" },
  { id: "garden", label: "Jardim/área externa" },
  { id: "bike", label: "Bicicletário" },
  { id: "cleaning", label: "Serviço de limpeza" },
  { id: "breakfast", label: "Café da manhã" },
];

// Lista de cidades na Irlanda para o select
const cityOptions = [
  "Dublin", 
  "Cork", 
  "Galway", 
  "Limerick", 
  "Waterford", 
  "Belfast", 
  "Kilkenny", 
  "Sligo", 
  "Drogheda", 
  "Dundalk"
];

// Schema de validação com zod
const accommodationSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  city: z.string().min(1, "Selecione uma cidade"),
  neighborhood: z.string().optional(),
  address: z.string().optional(),
  google_maps_link: z.string().url("Informe uma URL válida do Google Maps").or(z.string().length(0)),
  room_type: z.enum(["individual", "duplo", "triplo", "quadruplo"]),
  bathroom_type: z.enum(["privativo", "compartilhado"]),
  bathroom_shared_count: z.number().optional(),
  gender: z.enum(["masculino", "feminino", "misto"]),
  provider: z.string().min(2, "Informe o fornecedor"),
  price_per_week: z.number().min(1, "O valor deve ser maior que zero"),
  min_weeks: z.number().int().min(1, "Mínimo de 1 semana"),
  is_active: z.boolean(),
  checkin_day: z.enum(["sabado", "domingo", "qualquer"]),
  amenities: z.array(z.string()).optional(),
});

type AccommodationFormValues = z.infer<typeof accommodationSchema>;

interface AccommodationFormProps {
  accommodationId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AccommodationForm = ({ 
  accommodationId, 
  onSuccess, 
  onCancel 
}: AccommodationFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Inicializar o formulário com react-hook-form e zod
  const form = useForm<AccommodationFormValues>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      title: "",
      description: "",
      city: "",
      neighborhood: "",
      address: "",
      google_maps_link: "",
      room_type: "individual",
      bathroom_type: "privativo",
      bathroom_shared_count: undefined,
      gender: "misto",
      provider: "",
      price_per_week: 0,
      min_weeks: 4,
      is_active: true,
      checkin_day: "qualquer",
      amenities: [],
    }
  });
  
  // Carregar dados se for edição
  const loadAccommodationData = async () => {
    if (!accommodationId) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("id", accommodationId)
        .single();
        
      if (error) throw error;
      
      if (data) {
        form.reset({
          title: data.title,
          description: data.description || "",
          city: data.city,
          neighborhood: data.neighborhood || "",
          address: data.address || "",
          google_maps_link: data.google_maps_link || "",
          room_type: data.room_type,
          bathroom_type: data.bathroom_type,
          bathroom_shared_count: data.bathroom_shared_count || undefined,
          gender: data.gender,
          provider: data.provider,
          price_per_week: Number(data.price_per_week),
          min_weeks: data.min_weeks,
          is_active: data.is_active,
          checkin_day: data.checkin_day,
          amenities: data.amenities || [],
        });
        
        // Também carregar imagens existentes (para exibir na UI)
        const { data: imageData } = await supabase
          .from("accommodation_images")
          .select("*")
          .eq("accommodation_id", accommodationId);
          
        // Aqui você poderia mostrar as imagens existentes
      }
    } catch (error: any) {
      toast({
        title: "Erro ao carregar dados",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Carregar dados quando o componente montar (se for edição)
  useState(() => {
    if (accommodationId) {
      loadAccommodationData();
    }
  });
  
  // Função para upload de imagens
  const uploadImages = async (accommodationId: string): Promise<string[]> => {
    if (imageFiles.length === 0) return [];
    
    setIsUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 10000)}.${fileExt}`;
        const filePath = `accommodations/${accommodationId}/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('accommodations')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        // Se o upload foi bem sucedido, obter a URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('accommodations')
          .getPublicUrl(filePath);
          
        uploadedUrls.push(publicUrl);
        
        // Atualizar progresso
        setUploadProgress(Math.floor(((i + 1) / imageFiles.length) * 100));
      }
      
      return uploadedUrls;
    } catch (error: any) {
      toast({
        title: "Erro no upload das imagens",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  // Salvar as imagens no banco após o upload
  const saveImagesToDatabase = async (accommodationId: string, imageUrls: string[]) => {
    if (imageUrls.length === 0) return;
    
    try {
      // Para cada URL, criar um registro na tabela accommodation_images
      const imageRecords = imageUrls.map((url, index) => ({
        accommodation_id: accommodationId,
        url,
        is_primary: index === 0, // primeira imagem como primária
      }));
      
      const { error } = await supabase
        .from('accommodation_images')
        .insert(imageRecords);
        
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Erro ao salvar referências das imagens",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  // Handler do submit do formulário
  const onSubmit = async (values: AccommodationFormValues) => {
    try {
      setIsLoading(true);
      
      // Criar ou atualizar acomodação
      const accommodationData = {
        ...values,
        // Garantir que o preço seja enviado como número
        price_per_week: Number(values.price_per_week),
        // Garantir que min_weeks seja um número
        min_weeks: Number(values.min_weeks),
        // Converter bathroom_shared_count para número se existir
        bathroom_shared_count: values.bathroom_shared_count 
          ? Number(values.bathroom_shared_count) 
          : null,
      };
      
      let accommodationResult;
      
      if (accommodationId) {
        // Atualização
        accommodationResult = await supabase
          .from('accommodations')
          .update(accommodationData)
          .eq('id', accommodationId)
          .select()
          .single();
      } else {
        // Criação
        accommodationResult = await supabase
          .from('accommodations')
          .insert(accommodationData)
          .select()
          .single();
      }
      
      if (accommodationResult.error) throw accommodationResult.error;
      
      const newAccommodationId = accommodationResult.data.id;
      
      // Processar upload de imagens
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadImages(newAccommodationId);
        await saveImagesToDatabase(newAccommodationId, uploadedUrls);
      }
      
      toast({
        title: accommodationId ? "Acomodação atualizada" : "Acomodação criada",
        description: "Os dados foram salvos com sucesso.",
      });
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handler para seleção de imagens
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Converter FileList para array
      const newFiles = Array.from(e.target.files);
      setImageFiles((current) => [...current, ...newFiles]);
    }
  };
  
  // Remover uma imagem da lista
  const removeImage = (index: number) => {
    setImageFiles(current => current.filter((_, i) => i !== index));
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Dados básicos */}
        <div className="space-y-6">
          <div className="text-xl font-semibold">Informações básicas</div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da acomodação *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Dublin Central Residence" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Ativo</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva detalhes importantes sobre a acomodação..." 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Localização */}
        <div className="space-y-6">
          <div className="text-xl font-semibold flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Localização
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade *</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {cityOptions.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: City Centre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 123 O'Connell Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="google_maps_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link do Google Maps</FormLabel>
                <FormControl>
                  <Input placeholder="https://maps.google.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Detalhes do quarto */}
        <div className="space-y-6">
          <div className="text-xl font-semibold flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Detalhes do quarto
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="room_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de quarto *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypeOptions.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gênero do quarto *</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomGenderOptions.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender === "masculino" 
                              ? "Masculino" 
                              : gender === "feminino" 
                              ? "Feminino" 
                              : "Misto"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="bathroom_type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de banheiro *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="privativo" id="privativo" />
                          <FormLabel htmlFor="privativo" className="font-normal cursor-pointer">
                            Privativo
                          </FormLabel>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compartilhado" id="compartilhado" />
                          <FormLabel htmlFor="compartilhado" className="font-normal cursor-pointer">
                            Compartilhado
                          </FormLabel>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Mostrar este campo apenas se o banheiro for compartilhado */}
            {form.watch("bathroom_type") === "compartilhado" && (
              <FormField
                control={form.control}
                name="bathroom_shared_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de pessoas que compartilham o banheiro</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        
        {/* Informações comerciais */}
        <div className="space-y-6">
          <div className="text-xl font-semibold flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Informações de reserva
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornecedor/Proprietário *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Dublin Homestays" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price_per_week"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço por semana (€) *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="min_weeks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semanas mínimas *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={1}
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="checkin_day"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Dia de check-in/check-out *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sabado" id="sabado" />
                      <FormLabel htmlFor="sabado" className="font-normal cursor-pointer">
                        Sábado a Sábado
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="domingo" id="domingo" />
                      <FormLabel htmlFor="domingo" className="font-normal cursor-pointer">
                        Domingo a Domingo
                      </FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="qualquer" id="qualquer" />
                      <FormLabel htmlFor="qualquer" className="font-normal cursor-pointer">
                        Flexível
                      </FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Comodidades */}
        <div className="space-y-6">
          <div className="text-xl font-semibold">Comodidades disponíveis</div>
          
          <FormField
            control={form.control}
            name="amenities"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {amenitiesOptions.map((amenity) => (
                    <FormField
                      key={amenity.id}
                      control={form.control}
                      name="amenities"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={amenity.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(amenity.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value || [], amenity.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== amenity.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {amenity.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Upload de imagens */}
        <div className="space-y-6">
          <div className="text-xl font-semibold flex items-center">
            <Upload className="mr-2 h-5 w-5 text-primary" />
            Imagens da acomodação
          </div>
          
          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-sm text-muted-foreground">
                Arraste imagens ou clique para selecionar
              </div>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="max-w-sm"
              />
            </div>
            
            {/* Preview de imagens selecionadas */}
            {imageFiles.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Imagens selecionadas ({imageFiles.length})</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {imageFiles.map((file, index) => (
                    <div 
                      key={index} 
                      className="relative group border rounded-md overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Barra de progresso de upload */}
            {isUploading && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm">Uploading...</div>
                  <div className="text-sm">{uploadProgress}%</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Botões de ação */}
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
              disabled={isLoading || isUploading}
            >
              Cancelar
            </Button>
          )}
          
          <Button 
            type="submit" 
            disabled={isLoading || isUploading}
          >
            {(isLoading || isUploading) && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {accommodationId ? "Atualizar" : "Salvar"} acomodação
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccommodationForm;
