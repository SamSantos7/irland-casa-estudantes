
import { useState, useEffect } from "react";
import { 
  Bath, 
  Calendar, 
  Edit, 
  ExternalLink, 
  Home, 
  MapPin, 
  MoreHorizontal, 
  Users 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AccommodationDetailsProps {
  accommodationId: string;
  onEdit?: () => void;
}

const AccommodationDetails = ({ accommodationId, onEdit }: AccommodationDetailsProps) => {
  const { toast } = useToast();
  const [accommodation, setAccommodation] = useState<any | null>(null);
  const [images, setImages] = useState<{ url: string, is_primary: boolean | null }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAccommodationDetails = async () => {
    try {
      setIsLoading(true);
      
      // Carregar dados da acomodação
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("id", accommodationId)
        .single();
        
      if (error) throw error;
      setAccommodation(data);
      
      // Carregar imagens relacionadas
      const { data: imageData, error: imageError } = await supabase
        .from("accommodation_images")
        .select("*")
        .eq("accommodation_id", accommodationId);
        
      if (imageError) throw imageError;
      setImages(imageData || []);
      
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

  useEffect(() => {
    loadAccommodationDetails();
  }, [accommodationId]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-[200px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Acomodação não encontrada.</p>
      </div>
    );
  }

  // Encontrar a imagem principal ou pegar a primeira
  const mainImage = images.find(img => img.is_primary)?.url || 
                    (images.length > 0 ? images[0].url : null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{accommodation.title}</h2>
        {onEdit && (
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar Acomodação
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal com imagem e detalhes */}
        <div className="lg:col-span-2 space-y-4">
          {/* Imagem principal */}
          {mainImage ? (
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
              <img
                src={mainImage}
                alt={accommodation.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="relative w-full h-[300px] rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Home className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Galeria de imagens */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.slice(0, 5).map((image, index) => (
                <div key={index} className="relative w-full h-20 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={`${accommodation.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Descrição */}
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Descrição</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {accommodation.description || "Nenhuma descrição disponível."}
            </p>
          </div>

          {/* Comodidades */}
          {accommodation.amenities && accommodation.amenities.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Comodidades</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {accommodation.amenities.map((amenity: string) => (
                  <div 
                    key={amenity}
                    className="flex items-center text-sm bg-secondary/20 px-3 py-1 rounded-full"
                  >
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coluna lateral com informações extras */}
        <div className="space-y-4">
          {/* Status e preço */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Informações gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={accommodation.is_active ? "default" : "outline"}>
                  {accommodation.is_active ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Preço por semana:</span>
                <span className="font-semibold">€{accommodation.price_per_week}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Permanência mínima:</span>
                <span>{accommodation.min_weeks} semanas</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Fornecedor:</span>
                <span>{accommodation.provider}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Check-in/out:</span>
                <span>
                  {accommodation.checkin_day === "sabado" ? "Sábado" : 
                   accommodation.checkin_day === "domingo" ? "Domingo" : "Flexível"}
                </span>
              </div>
            </CardContent>
          </Card>
          
          {/* Detalhes do quarto */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <CardTitle>Detalhes do quarto</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tipo de quarto:</span>
                <span>
                  {accommodation.room_type.charAt(0).toUpperCase() + accommodation.room_type.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Gênero do quarto:</span>
                <span>
                  {accommodation.gender === "masculino" ? "Masculino" : 
                   accommodation.gender === "feminino" ? "Feminino" : "Misto"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tipo de banheiro:</span>
                <span>
                  {accommodation.bathroom_type.charAt(0).toUpperCase() + accommodation.bathroom_type.slice(1)}
                </span>
              </div>
              
              {accommodation.bathroom_type === "compartilhado" && accommodation.bathroom_shared_count && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Compartilhado com:</span>
                  <span>{accommodation.bathroom_shared_count} pessoas</span>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Localização */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <CardTitle>Localização</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cidade:</span>
                <span>{accommodation.city}</span>
              </div>
              
              {accommodation.neighborhood && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Bairro:</span>
                  <span>{accommodation.neighborhood}</span>
                </div>
              )}
              
              {accommodation.address && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Endereço:</span>
                  <span className="text-right">{accommodation.address}</span>
                </div>
              )}
              
              {accommodation.google_maps_link && (
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.open(accommodation.google_maps_link, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-3.5 w-3.5" />
                    Ver no Google Maps
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Data de criação/atualização */}
          <div className="text-xs text-muted-foreground">
            <p>
              Criado em: {format(new Date(accommodation.created_at), "dd MMM yyyy", { locale: ptBR })}
            </p>
            <p>
              Última atualização: {format(new Date(accommodation.updated_at), "dd MMM yyyy", { locale: ptBR })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDetails;
