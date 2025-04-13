
import { useState } from "react";
import { AtSign, Filter, MessageCircle, MoreHorizontal, Search, Send, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dados de exemplo
const messages = [
  {
    id: "MSG001",
    client: "João Silva",
    email: "joao.silva@example.com",
    avatar: null,
    message: "Olá, gostaria de saber mais informações sobre a acomodação em Dublin. Vocês têm quartos individuais disponíveis para setembro?",
    date: "2025-04-12T14:30:00",
    read: true,
  },
  {
    id: "MSG002",
    client: "Maria Santos",
    email: "maria.santos@example.com",
    avatar: null,
    message: "Bom dia! Preciso alterar a data da minha reserva, é possível?",
    date: "2025-04-13T09:15:00",
    read: false,
  },
  {
    id: "MSG003",
    client: "Pedro Costa",
    email: "pedro.costa@example.com",
    avatar: null,
    message: "Como faço para enviar o comprovante de pagamento?",
    date: "2025-04-13T10:45:00",
    read: false,
  },
  {
    id: "MSG004",
    client: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    avatar: null,
    message: "Boa tarde! Já recebi a confirmação da escola e gostaria de saber se posso enviar agora para vocês.",
    date: "2025-04-13T16:20:00",
    read: false,
  },
];

const AdminCommunication = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Comunicação</h1>
        <Button size="sm">
          <Send className="mr-2 h-4 w-4" />
          Nova Mensagem
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <Tabs defaultValue="inbox" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="inbox">Recebidas</TabsTrigger>
                <TabsTrigger value="sent">Enviadas</TabsTrigger>
              </TabsList>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  type="text"
                  placeholder="Buscar mensagens..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <TabsContent value="inbox" className="mt-0">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-2">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex items-start p-3 rounded-lg cursor-pointer gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          selectedClient === msg.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                        } ${!msg.read ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500' : ''}`}
                        onClick={() => setSelectedClient(msg.id)}
                      >
                        <Avatar className="h-10 w-10 mt-1">
                          <AvatarImage src={msg.avatar || ''} alt={msg.client} />
                          <AvatarFallback>{msg.client.charAt(0)}{msg.client.split(' ')[1]?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{msg.client}</p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {new Date(msg.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-sm truncate text-muted-foreground">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="sent" className="mt-0">
                <div className="flex items-center justify-center h-[60vh] bg-gray-50 dark:bg-gray-900 rounded-md">
                  <p className="text-muted-foreground">
                    A lista de mensagens enviadas será implementada em breve.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          {selectedClient ? (
            <CardContent className="p-4">
              <div className="flex items-center justify-between pb-4 border-b mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">João Silva</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <AtSign className="mr-1 h-3.5 w-3.5" />
                      joao.silva@example.com
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Ver Perfil
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-[45vh] mb-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">Olá, gostaria de saber mais informações sobre a acomodação em Dublin. Vocês têm quartos individuais disponíveis para setembro?</p>
                      <span className="text-xs text-muted-foreground mt-1 block">14:30</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 flex-row-reverse">
                    <Avatar className="h-8 w-8 mt-1 bg-primary">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">Olá João! Sim, temos disponibilidade de quartos individuais para setembro em Dublin. Gostaria de informações sobre alguma região específica?</p>
                      <span className="text-xs text-primary-foreground/80 mt-1 block">14:45</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">Estou interessado na região central, próximo ao Trinity College se possível.</p>
                      <span className="text-xs text-muted-foreground mt-1 block">15:10</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="flex items-center gap-3">
                <Input 
                  placeholder="Digite sua mensagem..." 
                  className="flex-1"
                />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-[60vh]">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700" />
                <h3 className="mt-4 text-lg font-medium">Selecione uma conversa</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Escolha uma conversa para visualizar as mensagens.
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminCommunication;
