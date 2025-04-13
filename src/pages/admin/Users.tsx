
import { useState } from "react";
import { Eye, Filter, Key, MoreHorizontal, Plus, Search, Shield, Trash2, UserCog } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dados de exemplo
const users = [
  {
    id: "USR001",
    name: "Ana Martins",
    email: "ana.martins@irland.com.br",
    role: "admin",
    lastAccess: "2025-04-13T08:45:00",
    status: "ativo",
  },
  {
    id: "USR002",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@irland.com.br",
    role: "atendimento",
    lastAccess: "2025-04-12T17:30:00",
    status: "ativo",
  },
  {
    id: "USR003",
    name: "Carla Santos",
    email: "carla.santos@irland.com.br",
    role: "verificacao",
    lastAccess: "2025-04-10T14:15:00",
    status: "inativo",
  },
  {
    id: "USR004",
    name: "Roberto Alves",
    email: "roberto.alves@irland.com.br",
    role: "financeiro",
    lastAccess: "2025-04-13T09:30:00",
    status: "ativo",
  },
  {
    id: "USR005",
    name: "Patricia Oliveira",
    email: "patricia.oliveira@irland.com.br",
    role: "atendimento",
    lastAccess: "2025-04-11T10:20:00",
    status: "ativo",
  },
];

const roleNames: Record<string, string> = {
  admin: "Administrador",
  atendimento: "Atendimento",
  verificacao: "Verificação",
  financeiro: "Financeiro",
  suporte: "Suporte",
};

const roleIcons: Record<string, React.ReactNode> = {
  admin: <Shield className="h-4 w-4 text-red-500" />,
  atendimento: <UserCog className="h-4 w-4 text-blue-500" />,
  verificacao: <Eye className="h-4 w-4 text-amber-500" />,
  financeiro: <Key className="h-4 w-4 text-green-500" />,
  suporte: <UserCog className="h-4 w-4 text-purple-500" />,
};

const statusColors: Record<string, string> = {
  ativo: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  inativo: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
};

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Usuários</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text"
                placeholder="Buscar usuários..."
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
                  <TableHead>Usuário</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead>Último Acesso</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-2">
                        {roleIcons[user.role]}
                        <span>{roleNames[user.role] || user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(user.lastAccess).toLocaleDateString('pt-BR')}
                        <div className="text-xs text-muted-foreground">
                          {new Date(user.lastAccess).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[user.status]}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
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
                          <DropdownMenuItem>Editar usuário</DropdownMenuItem>
                          <DropdownMenuItem>Redefinir senha</DropdownMenuItem>
                          <DropdownMenuItem>Ver atividades</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Desativar usuário
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
              Exibindo <strong>5</strong> de <strong>5</strong> usuários
            </p>
            <div className="flex items-center gap-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
