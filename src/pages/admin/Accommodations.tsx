import { useState, useEffect } from "react";
import { Bath, Bed, Edit, Eye, Filter, House, MapPin, MoreHorizontal, Plus, Search, Trash2, Users, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AccommodationForm from "@/components/admin/AccommodationForm";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";

// Define enum types
type RoomType = Database["public"]["Enums"]["room_type"];

// Tipos de acomodação
type Accommodation = {
  id: string;
  title: string;
  city: string;
  room_type: RoomType;
  bathroom_type: string;
  gender: string;
  price_per_week: number;
  is_active: boolean;
  provider: string;
};

const statusColors: Record<string, string> = {
  ativo: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  inativo: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

const AdminAccommodations = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("all");
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string | null>(null);
  const [accommodationToDelete, setAccommodationToDelete] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  // Função para carregar as acomodações do Supabase
  const loadAccommodations = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("accommodations")
        .select("*", { count: "exact" });

      // Aplicar filtros
      if (cityFilter !== "all") {
        query = query.eq("city", cityFilter);
      }
      
      if (roomTypeFilter !== "all") {
        // Fix: Only apply the filter if the value is a valid room type
        const validRoomTypes: RoomType[] = ["individual", "duplo", "triplo", "quadruplo"];
        if (validRoomTypes.includes(roomTypeFilter as RoomType)) {
          query = query.eq("room_type", roomTypeFilter as RoomType);
        }
      }
      
      if (statusFilter !== "all") {
        query = query.eq("is_active", statusFilter === "active");
      }
      
      // Aplicar busca no título (se houver)
      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`);
      }
      
      // Paginação
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      
      const { data, error, count } = await query
        .order("created_at", { ascending: false })
        .range(from, to);
        
      if (error) throw error;
      
      setAccommodations(data || []);
      setTotalCount(count || 0);
      
      // Carregar lista de cidades únicas para o filtro
      const { data: citiesData } = await supabase
        .from("accommodations")
        .select("city")
        .order("city");
        
      if (citiesData) {
        const uniqueCities = [...new Set(citiesData.map(item => item.city))];
        setCities(uniqueCities);
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

  // Carregar acomodações ao montar o componente
  useEffect(() => {
    loadAccommodations();
  }, [currentPage, cityFilter, roomTypeFilter, statusFilter]);
  
  // Recarregar após pesquisa (com debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadAccommodations();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Ver detalhes de uma acomodação
  const handleViewDetails = (id: string) => {
    // Aqui você pode implementar a navegação para uma página de detalhes
    // ou abrir um modal com mais informações
    navigate(`/admin/accommodations/${id}`);
  };

  // Abrir o formulário de edição
  const handleEdit = (id: string) => {
    setSelectedAccommodationId(id);
    setShowForm(true);
  };

  // Confirmar exclusão de uma acomodação
  const handleConfirmDelete = async () => {
    if (!accommodationToDelete) return;
    
    try {
      const { error } = await supabase
        .from("accommodations")
        .delete()
        .eq("id", accommodationToDelete);
        
      if (error) throw error;
      
      toast({
        title: "Acomodação excluída",
        description: "A acomodação foi removida com sucesso.",
      });
      
      loadAccommodations();
    } catch (error: any) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAccommodationToDelete(null);
    }
  };

  // Handler para sucesso na criação/edição
  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedAccommodationId(null);
    loadAccommodations();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Acomodações</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Acomodação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px]">
            <DialogHeader>
              <DialogTitle>{selectedAccommodationId ? "Editar" : "Adicionar"} Acomodação</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da acomodação para {selectedAccommodationId ? "atualizar" : "listá-la no site"}.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[70vh] overflow-y-auto py-4">
              <AccommodationForm 
                accommodationId={selectedAccommodationId || undefined}
                onSuccess={handleFormSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text"
                placeholder="Buscar acomodações..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Select 
                value={cityFilter} 
                onValueChange={setCityFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={roomTypeFilter} 
                onValueChange={setRoomTypeFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Tipo de quarto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="duplo">Duplo</SelectItem>
                  <SelectItem value="triplo">Triplo</SelectItem>
                  <SelectItem value="quadruplo">Quádruplo</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Mais filtros
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Banheiro</TableHead>
                  <TableHead>Gênero</TableHead>
                  <TableHead>Preço/Semana</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  // Skeleton carregamento
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell><Skeleton className="h-5 w-[180px]" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-[60px]" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                    </TableRow>
                  ))
                ) : accommodations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhuma acomodação encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  accommodations.map((accommodation) => (
                    <TableRow key={accommodation.id}>
                      <TableCell className="font-medium">{accommodation.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          {accommodation.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Bed className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          {accommodation.room_type.charAt(0).toUpperCase() + accommodation.room_type.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Bath className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          {accommodation.bathroom_type.charAt(0).toUpperCase() + accommodation.bathroom_type.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Users className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          {accommodation.gender.charAt(0).toUpperCase() + accommodation.gender.slice(1)}
                        </div>
                      </TableCell>
                      <TableCell>€{accommodation.price_per_week}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={accommodation.is_active ? statusColors.ativo : statusColors.inativo}>
                          {accommodation.is_active ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Visualizar"
                            onClick={() => handleViewDetails(accommodation.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Editar"
                            onClick={() => handleEdit(accommodation.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Excluir"
                                onClick={() => setAccommodationToDelete(accommodation.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir esta acomodação? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setAccommodationToDelete(null)}>
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleConfirmDelete}>
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Exibindo <strong>{accommodations.length}</strong> de <strong>{totalCount}</strong> acomodações
            </p>
            <div className="flex items-center gap-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1 || isLoading}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Anterior
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={accommodations.length < itemsPerPage || isLoading}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAccommodations;
