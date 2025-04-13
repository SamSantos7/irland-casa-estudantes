
import { useState } from "react";
import { Bath, Bed, ChevronDown, Edit, Eye, Filter, House, MapPin, MoreHorizontal, Plus, Search, Trash2, Users } from "lucide-react";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Dados de exemplo
const accommodations = [
  {
    id: "ACC001",
    name: "Dublin Central Residence",
    city: "Dublin",
    roomType: "Individual",
    bathroom: "Privativo",
    gender: "Misto",
    status: "ativo",
    pricePerWeek: 240,
  },
  {
    id: "ACC002",
    name: "Cork Student House",
    city: "Cork",
    roomType: "Duplo",
    bathroom: "Compartilhado",
    gender: "Mesmo sexo",
    status: "ativo",
    pricePerWeek: 180,
  },
  {
    id: "ACC003",
    name: "Galway Bay Accommodation",
    city: "Galway",
    roomType: "Individual",
    bathroom: "Privativo",
    gender: "Misto",
    status: "inativo",
    pricePerWeek: 210,
  },
  {
    id: "ACC004",
    name: "Limerick Village",
    city: "Limerick",
    roomType: "Triplo",
    bathroom: "Compartilhado",
    gender: "Mesmo sexo",
    status: "ativo",
    pricePerWeek: 160,
  },
  {
    id: "ACC005",
    name: "Dublin South Residence",
    city: "Dublin",
    roomType: "Duplo",
    bathroom: "Privativo",
    gender: "Misto",
    status: "ativo",
    pricePerWeek: 200,
  },
];

const statusColors: Record<string, string> = {
  ativo: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  inativo: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

const AdminAccommodations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Acomodações</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Acomodação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Acomodação</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da nova acomodação para listá-la no site.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Formulário de cadastro de acomodações será implementado aqui.
              </p>
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
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  <SelectItem value="dublin">Dublin</SelectItem>
                  <SelectItem value="cork">Cork</SelectItem>
                  <SelectItem value="galway">Galway</SelectItem>
                  <SelectItem value="limerick">Limerick</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
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
              
              <Select>
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
                {accommodations.map((accommodation) => (
                  <TableRow key={accommodation.id}>
                    <TableCell className="font-medium">{accommodation.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {accommodation.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Bed className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {accommodation.roomType}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Bath className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {accommodation.bathroom}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {accommodation.gender}
                      </div>
                    </TableCell>
                    <TableCell>€{accommodation.pricePerWeek}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[accommodation.status]}>
                        {accommodation.status.charAt(0).toUpperCase() + accommodation.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Excluir">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Exibindo <strong>5</strong> de <strong>15</strong> acomodações
            </p>
            <div className="flex items-center gap-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
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
