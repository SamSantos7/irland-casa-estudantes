
import { useState } from "react";
import { Calendar, ChevronDown, Filter, MapPin, MoreHorizontal, Search, Users } from "lucide-react";
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
import ReservationDetails from "@/components/admin/ReservationDetails";

// Dados de exemplo
const reservations = [
  {
    id: "RES001",
    client: "João Silva",
    city: "Dublin",
    roomType: "Quarto Individual",
    status: "confirmada",
    startDate: "2025-05-01",
    endDate: "2025-06-01",
  },
  {
    id: "RES002",
    client: "Maria Santos",
    city: "Cork",
    roomType: "Quarto Duplo",
    status: "pendente",
    startDate: "2025-05-15",
    endDate: "2025-07-15",
  },
  {
    id: "RES003",
    client: "Pedro Costa",
    city: "Galway",
    roomType: "Quarto Individual",
    status: "processando",
    startDate: "2025-06-01",
    endDate: "2025-07-01",
  },
  {
    id: "RES004",
    client: "Ana Oliveira",
    city: "Dublin",
    roomType: "Quarto Triplo",
    status: "cancelada",
    startDate: "2025-06-15",
    endDate: "2025-07-15",
  },
  {
    id: "RES005",
    client: "Carlos Ferreira",
    city: "Limerick",
    roomType: "Quarto Duplo",
    status: "confirmada",
    startDate: "2025-07-01",
    endDate: "2025-08-01",
  },
];

const statusColors: Record<string, string> = {
  confirmada: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  processando: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  cancelada: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const AdminReservations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  
  const handleViewDetails = (reservationId: string) => {
    setSelectedReservationId(reservationId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Reservas</h1>
        <Button size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          Nova Reserva
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text"
                placeholder="Buscar reservas..."
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
                  <SelectItem value="confirmada">Confirmada</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="processando">Processando</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
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
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Tipo de quarto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.id}</TableCell>
                    <TableCell>{reservation.client}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {reservation.city}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {reservation.roomType}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[reservation.status]}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <div>{new Date(reservation.startDate).toLocaleDateString('pt-BR')}</div>
                      <div className="text-muted-foreground">até {new Date(reservation.endDate).toLocaleDateString('pt-BR')}</div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(reservation.id)}>
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>Editar reserva</DropdownMenuItem>
                          <DropdownMenuItem>Atualizar status</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Cancelar reserva
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Exibindo <strong>5</strong> de <strong>25</strong> reservas
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
      
      {/* Modal de detalhes da reserva */}
      {selectedReservationId && (
        <ReservationDetails
          reservationId={selectedReservationId}
          open={!!selectedReservationId}
          onClose={() => setSelectedReservationId(null)}
        />
      )}
    </div>
  );
};

export default AdminReservations;
