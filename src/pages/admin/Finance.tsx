
import { useState } from "react";
import { ArrowDown, ArrowUp, Calendar, CreditCard, Download, Filter, MoreHorizontal, PiggyBank, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados de exemplo
const transactions = [
  {
    id: "TRX001",
    client: "João Silva",
    reservationId: "RES001",
    amount: 850,
    type: "entrada",
    paymentMethod: "pix",
    date: "2025-04-10",
    status: "concluido",
  },
  {
    id: "TRX002",
    client: "Maria Santos",
    reservationId: "RES002",
    amount: 720,
    type: "entrada",
    paymentMethod: "cartao",
    date: "2025-04-11",
    status: "concluido",
  },
  {
    id: "TRX003",
    client: null,
    reservationId: "RES001",
    amount: 600,
    type: "saida",
    paymentMethod: "transferencia",
    date: "2025-04-12",
    status: "pendente",
    description: "Pagamento ao fornecedor",
  },
  {
    id: "TRX004",
    client: "Pedro Costa",
    reservationId: "RES003",
    amount: 940,
    type: "entrada",
    paymentMethod: "boleto",
    date: "2025-04-13",
    status: "processando",
  },
  {
    id: "TRX005",
    client: null,
    reservationId: "RES002",
    amount: 500,
    type: "saida",
    paymentMethod: "transferencia",
    date: "2025-04-13",
    status: "pendente",
    description: "Pagamento ao fornecedor",
  },
];

const paymentMethodLabels: Record<string, string> = {
  pix: "PIX",
  cartao: "Cartão de Crédito",
  boleto: "Boleto",
  transferencia: "Transferência",
  dinheiro: "Dinheiro",
};

const statusColors: Record<string, string> = {
  concluido: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  processando: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  cancelado: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const AdminFinance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Calcular totais
  const totalIncome = transactions
    .filter(tx => tx.type === 'entrada' && tx.status !== 'cancelado')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpenses = transactions
    .filter(tx => tx.type === 'saida' && tx.status !== 'cancelado')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const pendingPayments = transactions
    .filter(tx => tx.status === 'pendente')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Controle Financeiro</h1>
        <div className="flex items-center gap-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Período
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Relatório
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Entradas
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <ArrowDown className="h-5 w-5 text-green-700 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Valor total recebido dos clientes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Saídas
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <ArrowUp className="h-5 w-5 text-red-700 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Valor total pago aos fornecedores
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pagamentos Pendentes
            </CardTitle>
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <PiggyBank className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{pendingPayments.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Transações com status pendente
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="income">Entradas</TabsTrigger>
                <TabsTrigger value="expenses">Saídas</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4">
                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    type="text"
                    placeholder="Buscar transações..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtros
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente/Descrição</TableHead>
                      <TableHead>Reserva</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">{tx.id}</TableCell>
                        <TableCell>{tx.client || tx.description}</TableCell>
                        <TableCell>{tx.reservationId}</TableCell>
                        <TableCell>€{tx.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={tx.type === 'entrada' 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                            : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }>
                            {tx.type === 'entrada' ? 'Entrada' : 'Saída'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-x-1">
                            <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{paymentMethodLabels[tx.paymentMethod] || tx.paymentMethod}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(tx.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusColors[tx.status]}>
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
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
                              <DropdownMenuItem>Visualizar detalhes</DropdownMenuItem>
                              <DropdownMenuItem>Editar transação</DropdownMenuItem>
                              <DropdownMenuItem>Registrar pagamento</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Cancelar transação
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="income" className="m-0">
              <div className="flex items-center justify-center h-[300px] rounded-md border bg-gray-50 dark:bg-gray-900">
                <p className="text-muted-foreground">Filtro de entradas será implementado em breve.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="expenses" className="m-0">
              <div className="flex items-center justify-center h-[300px] rounded-md border bg-gray-50 dark:bg-gray-900">
                <p className="text-muted-foreground">Filtro de saídas será implementado em breve.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="m-0">
              <div className="flex items-center justify-center h-[300px] rounded-md border bg-gray-50 dark:bg-gray-900">
                <p className="text-muted-foreground">Filtro de pendentes será implementado em breve.</p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Exibindo <strong>5</strong> de <strong>25</strong> transações
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

export default AdminFinance;
