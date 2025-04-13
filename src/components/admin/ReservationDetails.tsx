
import { useState } from "react";
import { FileSignature, Mail, MapPin, MoreHorizontal, Pencil, Save, User, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ContractSigningSection from "@/components/ContractSigningSection";

interface ReservationDetailsProps {
  reservationId: string;
  open: boolean;
  onClose: () => void;
}

const ReservationDetails = ({ reservationId, open, onClose }: ReservationDetailsProps) => {
  // Em uma implementação real, buscaríamos os detalhes da reserva usando o ID
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState("O cliente solicitou informações adicionais sobre transporte público próximo à acomodação.");
  const [tempNotes, setTempNotes] = useState(notes);
  
  const handleSaveNotes = () => {
    setNotes(tempNotes);
    setEditingNotes(false);
  };
  
  const handleCancelEdit = () => {
    setTempNotes(notes);
    setEditingNotes(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalhes da Reserva #{reservationId}</DialogTitle>
          <DialogDescription>
            Visualize e gerencie todas as informações relacionadas a esta reserva.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col space-y-6 pt-4">
          {/* Status e Ações Rápidas */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Status da Reserva</div>
              <div className="flex items-center gap-2">
                <Select defaultValue="confirmada">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="processando">Processando</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="default">Atualizar</Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <FileSignature className="mr-2 h-4 w-4" />
                Contrato
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="communication">Comunicação</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
            </TabsList>
            
            {/* Aba de Detalhes */}
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informações do Cliente */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Informações do Cliente</CardTitle>
                      <Button variant="ghost" size="icon" title="Ver perfil">
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>Detalhes de contato do cliente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Nome Completo</Label>
                        <div className="font-medium">João Silva</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">E-mail</Label>
                        <div className="font-medium">joao.silva@example.com</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Telefone</Label>
                        <div className="font-medium">+55 (11) 99999-9999</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Nacionalidade</Label>
                        <div className="font-medium">Brasileira</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Detalhes da Acomodação */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Detalhes da Acomodação</CardTitle>
                    <CardDescription>Informações sobre o local reservado</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Acomodação</Label>
                        <div className="font-medium">Dublin Central Residence</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Cidade</Label>
                        <div className="font-medium flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          Dublin, Irlanda
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Tipo de Quarto</Label>
                        <div className="font-medium">Quarto Individual, Banheiro Privativo</div>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Período</Label>
                        <div className="font-medium">01/05/2025 a 01/06/2025 (30 dias)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Checklist de Progresso */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Checklist de Progresso</CardTitle>
                    <CardDescription>Status atual das etapas da reserva</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="w-8 py-2">
                            <input type="checkbox" checked className="h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium py-2">Envio do passaporte</TableCell>
                          <TableCell className="text-right py-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-2">
                            <input type="checkbox" checked className="h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium py-2">Envio da carta da escola</TableCell>
                          <TableCell className="text-right py-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-2">
                            <input type="checkbox" checked className="h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium py-2">Disponibilidade da acomodação</TableCell>
                          <TableCell className="text-right py-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-2">
                            <input type="checkbox" checked className="h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium py-2">Assinatura do contrato</TableCell>
                          <TableCell className="text-right py-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium py-2">Envio do comprovante de pagamento</TableCell>
                          <TableCell className="text-right py-2">
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-2">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                          </TableCell>
                          <TableCell className="font-medium py-2">Documento da acomodação enviado</TableCell>
                          <TableCell className="text-right py-2">
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                {/* Notas e Observações */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Notas e Observações</CardTitle>
                      {!editingNotes && (
                        <Button variant="ghost" size="icon" onClick={() => setEditingNotes(true)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <CardDescription>Observações internas sobre a reserva</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {editingNotes ? (
                      <div className="space-y-2">
                        <Textarea 
                          value={tempNotes} 
                          onChange={(e) => setTempNotes(e.target.value)}
                          rows={6}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                            <X className="mr-2 h-3.5 w-3.5" />
                            Cancelar
                          </Button>
                          <Button size="sm" onClick={handleSaveNotes}>
                            <Save className="mr-2 h-3.5 w-3.5" />
                            Salvar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{notes}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Assinatura do Contrato */}
              <div className="mt-4">
                <ContractSigningSection 
                  signatureUrl="https://example.com/sign" 
                  isSigned={true}
                  className="w-full"
                  onSigningComplete={() => console.log("Contrato assinado")}
                />
              </div>
            </TabsContent>
            
            {/* Abas adicionais (a serem implementadas posteriormente) */}
            <TabsContent value="documents" className="h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
              <p className="text-muted-foreground">
                A seção de documentos será implementada em breve.
              </p>
            </TabsContent>
            
            <TabsContent value="communication" className="h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
              <p className="text-muted-foreground">
                A seção de comunicação será implementada em breve.
              </p>
            </TabsContent>
            
            <TabsContent value="financial" className="h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
              <p className="text-muted-foreground">
                A seção financeira será implementada em breve.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetails;
