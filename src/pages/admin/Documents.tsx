
import { useState } from "react";
import { Download, FileCheck, FileQuestion, FileText, FileX, Filter, MoreHorizontal, Search, Upload } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados de exemplo
const documents = [
  {
    id: "DOC001",
    client: "João Silva",
    type: "Passaporte",
    reservationId: "RES001",
    uploadDate: "2025-04-10",
    status: "aprovado",
  },
  {
    id: "DOC002",
    client: "Maria Santos",
    type: "Carta da Escola",
    reservationId: "RES002",
    uploadDate: "2025-04-11",
    status: "pendente",
  },
  {
    id: "DOC003",
    client: "Pedro Costa",
    type: "Comprovante de Pagamento",
    reservationId: "RES003",
    uploadDate: "2025-04-12",
    status: "recusado",
  },
  {
    id: "DOC004",
    client: "Ana Oliveira",
    type: "Passaporte",
    reservationId: "RES004",
    uploadDate: "2025-04-13",
    status: "pendente",
  },
  {
    id: "DOC005",
    client: "Carlos Ferreira",
    type: "Carta da Escola",
    reservationId: "RES005",
    uploadDate: "2025-04-14",
    status: "aprovado",
  },
];

const documentTypeIcons: Record<string, React.ReactNode> = {
  "Passaporte": <FileText className="h-4 w-4 text-blue-500" />,
  "Carta da Escola": <FileText className="h-4 w-4 text-green-500" />,
  "Comprovante de Pagamento": <FileText className="h-4 w-4 text-amber-500" />,
  "Contrato": <FileText className="h-4 w-4 text-purple-500" />,
  "Carta de Acomodação": <FileText className="h-4 w-4 text-rose-500" />,
};

const statusColors: Record<string, string> = {
  aprovado: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  pendente: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  recusado: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const statusIcons: Record<string, React.ReactNode> = {
  aprovado: <FileCheck className="h-4 w-4 text-green-600" />,
  pendente: <FileQuestion className="h-4 w-4 text-amber-600" />,
  recusado: <FileX className="h-4 w-4 text-red-600" />,
};

const AdminDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Documentos</h1>
        <Button size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="received">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="received">Recebidos</TabsTrigger>
                <TabsTrigger value="sent">Enviados</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4">
                <div className="relative w-full md:w-[300px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                  <Input 
                    type="text"
                    placeholder="Buscar documentos..."
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
            
            <TabsContent value="received" className="m-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>ID da Reserva</TableHead>
                      <TableHead>Data de Upload</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div className="flex items-center gap-x-2">
                            {documentTypeIcons[document.type] || <FileText className="h-4 w-4 text-gray-500" />}
                            <span>{document.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{document.client}</TableCell>
                        <TableCell>{document.reservationId}</TableCell>
                        <TableCell>{new Date(document.uploadDate).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-x-1.5">
                            {statusIcons[document.status]}
                            <Badge variant="outline" className={statusColors[document.status]}>
                              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-x-2">
                            <Button variant="ghost" size="icon" title="Baixar">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Aprovar</DropdownMenuItem>
                                <DropdownMenuItem>Recusar</DropdownMenuItem>
                                <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  Excluir documento
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Exibindo <strong>5</strong> de <strong>30</strong> documentos
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
            </TabsContent>
            
            <TabsContent value="sent" className="m-0">
              <div className="flex items-center justify-center h-[300px] rounded-md bg-gray-50 dark:bg-gray-900">
                <p className="text-muted-foreground">
                  A lista de documentos enviados será implementada em breve.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDocuments;
