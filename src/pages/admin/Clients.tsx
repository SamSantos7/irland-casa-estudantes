
import { useState } from "react";
import { Filter, MapPin, MoreHorizontal, Search, User } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Dados de exemplo
const clients = [
  {
    id: "CLI001",
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "+55 (11) 99999-9999",
    city: "Dublin",
    reservations: 2,
    status: "ativo",
  },
  {
    id: "CLI002",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    phone: "+55 (21) 98888-8888",
    city: "Cork",
    reservations: 1,
    status: "ativo",
  },
  {
    id: "CLI003",
    name: "Pedro Costa",
    email: "pedro.costa@example.com",
    phone: "+55 (31) 97777-7777",
    city: "Galway",
    reservations: 1,
    status: "inativo",
  },
  {
    id: "CLI004",
    name: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    phone: "+55 (41) 96666-6666",
    city: "Dublin",
    reservations: 3,
    status: "ativo",
  },
  {
    id: "CLI005",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@example.com",
    phone: "+55 (51) 95555-5555",
    city: "Limerick",
    reservations: 1,
    status: "ativo",
  },
];

const statusColors: Record<string, string> = {
  ativo: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  inativo: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

const AdminClients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Clientes</h1>
        <Button size="sm">
          <User className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text"
                placeholder="Buscar clientes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Reservas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{client.name.charAt(0)}{client.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-xs text-muted-foreground">{client.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{client.email}</div>
                        <div className="text-muted-foreground">{client.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                        {client.city}
                      </div>
                    </TableCell>
                    <TableCell>{client.reservations}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[client.status]}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                          <DropdownMenuItem>Enviar mensagem</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Desativar cliente
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
              Exibindo <strong>5</strong> de <strong>20</strong> clientes
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

export default AdminClients;
