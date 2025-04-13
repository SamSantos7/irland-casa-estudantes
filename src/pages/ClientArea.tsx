
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, User, LogOut, Bath, MapPin, Bed, 
  Users, MessageCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReservationStatusChecklist, { ReservationStep } from '../components/ReservationStatusChecklist';
import ContractSigningSection from '../components/ContractSigningSection';
import DocumentManagementSection, { Document } from '../components/DocumentManagementSection';
import { toast } from 'sonner';

type ReservationStatus = 'pending' | 'reviewing' | 'approved' | 'completed';

const ClientArea = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mock user data - would come from API in real app
  const userMock = {
    name: "Maria Silva",
    email: "maria.silva@example.com",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    reservationStatus: 'reviewing' as ReservationStatus,
    accommodation: {
      id: 1,
      name: "Dublin Central Residence",
      city: "Dublin",
      provider: "International Student Housing Ltd.",
      roomType: "Compartilhado (2 pessoas)",
      bathroomType: "Compartilhado (4 pessoas)",
      gender: "Feminino",
      neighborhood: "Rathmines",
      checkIn: "2025-07-01",
      checkOut: "2025-12-31",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    progressSteps: [
      {
        id: 'passport',
        label: 'Envio do passaporte',
        status: 'completed' as const,
        description: 'Seu passaporte foi aprovado.'
      },
      {
        id: 'school_letter',
        label: 'Envio da carta da escola',
        status: 'in_progress' as const,
        description: 'Estamos analisando sua carta da escola.'
      },
      {
        id: 'accommodation_availability',
        label: 'Aguardar disponibilidade da acomodação',
        status: 'pending' as const,
        description: 'Aguardando confirmação de disponibilidade do fornecedor.'
      },
      {
        id: 'contract',
        label: 'Assinatura do contrato',
        status: 'pending' as const,
        description: 'Você poderá assinar o contrato após a confirmação de disponibilidade.'
      },
      {
        id: 'payment',
        label: 'Envio do comprovante de pagamento',
        status: 'pending' as const,
        description: 'Envie o comprovante após assinar o contrato e realizar o pagamento.'
      },
      {
        id: 'accommodation_letter_sent',
        label: 'Documento da acomodação enviado',
        status: 'pending' as const,
        description: 'Você receberá o documento após o pagamento ser confirmado.'
      },
      {
        id: 'accommodation_letter_download',
        label: 'Download da carta da acomodação',
        status: 'pending' as const,
        description: 'Você poderá baixar a carta quando estiver disponível.'
      },
      {
        id: 'confirmation',
        label: 'Reserva confirmada',
        status: 'pending' as const,
        description: 'Sua reserva será finalizada após todas as etapas anteriores.'
      }
    ] as ReservationStep[],
    documents: [
      {
        id: 'passport',
        name: 'Passaporte',
        type: 'upload',
        description: 'Página principal do seu passaporte com foto e dados pessoais',
        status: 'approved',
        filename: 'passport_maria_silva.pdf',
        uploadDate: '05/04/2025',
      },
      {
        id: 'school_letter',
        name: 'Carta da Escola',
        type: 'upload',
        description: 'Comprovante de matrícula na instituição de ensino',
        status: 'pending',
        filename: 'carta_escola_maria.pdf',
        uploadDate: '05/04/2025',
      },
      {
        id: 'payment_proof',
        name: 'Comprovante de Pagamento',
        type: 'upload',
        description: 'Comprovante da transferência ou pagamento da reserva',
        status: 'not_uploaded',
      },
      {
        id: 'accommodation_letter',
        name: 'Carta da Acomodação',
        type: 'download',
        description: 'Documento oficial da sua acomodação para apresentação na imigração',
        status: 'pending',
      },
      {
        id: 'contract',
        name: 'Contrato Assinado',
        type: 'download',
        description: 'Cópia do contrato assinado por ambas as partes',
        status: 'pending',
      }
    ] as Document[],
    messages: [
      {
        id: 1,
        sender: 'system',
        content: 'Bem-vindo(a) à área do cliente! Aqui você pode acompanhar o status da sua reserva.',
        date: '2025-04-05T10:00:00'
      },
      {
        id: 2,
        sender: 'agent',
        content: 'Olá Maria, verificamos seu passaporte e está tudo certo. Ainda precisamos analisar sua carta de matrícula.',
        date: '2025-04-06T14:30:00'
      }
    ]
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with a backend
    if (email && password) {
      setIsLoggedIn(true);
      toast.success("Login realizado com sucesso!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    toast.info("Logout realizado com sucesso.");
  };

  const handleDocumentUpload = (documentId: string, file: File) => {
    // Em uma aplicação real, isso enviaria o arquivo para o servidor
    toast.success(`Documento "${file.name}" enviado com sucesso!`);
    console.log(`Uploading file ${file.name} for document ${documentId}`);
  };

  const handleDocumentDownload = (documentId: string) => {
    // Em uma aplicação real, isso faria o download do arquivo
    const doc = userMock.documents.find(d => d.id === documentId);
    if (doc && doc.status !== 'pending') {
      toast.success(`Baixando "${doc.name}"`);
    } else {
      toast.error("Este documento ainda não está disponível para download.");
    }
  };

  const handleContractSigned = () => {
    // Atualizar o status da etapa de contrato no checklist
    toast.success("Contrato assinado com sucesso!");
    // Em uma aplicação real, isso atualizaria o estado no servidor
  };

  const getStatusDisplay = (status: ReservationStatus) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' };
      case 'reviewing':
        return { label: 'Em análise', color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' };
      case 'approved':
        return { label: 'Aprovada', color: 'text-green-500 bg-green-50 dark:bg-green-950/30' };
      case 'completed':
        return { label: 'Concluída', color: 'text-green-500 bg-green-50 dark:bg-green-950/30' };
      default:
        return { label: 'Desconhecido', color: 'text-gray-500 bg-gray-50 dark:bg-gray-800' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Área do Cliente | Irlanda Casa Estudantes"
        description="Acesse sua área de cliente para gerenciar sua reserva, enviar documentos e acompanhar o status da sua acomodação estudantil na Irlanda."
        canonical="/client-area"
      />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">
                    Área do Cliente
                  </CardTitle>
                  <CardDescription className="text-center">
                    Faça login para acessar sua reserva
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="seu.email@exemplo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Senha</Label>
                          <Link to="/forgot-password" className="text-sm text-teal hover:underline">
                            Esqueceu a senha?
                          </Link>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Entrar
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p className="text-sm text-center text-muted-foreground mb-2">
                    Ainda não tem uma conta?
                  </p>
                  <p className="text-sm text-center text-muted-foreground">
                    Faça sua reserva e receba um email com instruções para criar sua conta.
                  </p>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div>
              {/* Cliente Logado */}
              <div className="mb-8">
                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-6 mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={userMock.profileImage} alt={userMock.name} />
                        <AvatarFallback>{userMock.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h1 className="text-2xl font-bold text-neutrals-dark dark:text-white">
                          Olá, {userMock.name.split(' ')[0]}!
                        </h1>
                        <p className="text-teal-700 dark:text-teal-300 mt-1">
                          Seja muito bem-vindo(a) à sua área do estudante! Aqui você pode acompanhar todos os detalhes da sua reserva.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Sair</span>
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="dashboard" className="mb-8">
                  <TabsList className="mb-4">
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="documents">Documentos</TabsTrigger>
                    <TabsTrigger value="messages">Mensagens</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="dashboard">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="col-span-1 lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Minha Acomodação</CardTitle>
                          <CardDescription>Detalhes completos da sua estadia</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/3">
                              <img 
                                src={userMock.accommodation.image} 
                                alt={userMock.accommodation.name} 
                                className="rounded-lg object-cover aspect-square w-full"
                              />
                            </div>
                            <div className="w-full md:w-2/3 space-y-4">
                              <div>
                                <h3 className="text-lg font-semibold">{userMock.accommodation.name}</h3>
                                <p className="text-muted-foreground">{userMock.accommodation.provider}</p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Cidade / Bairro</p>
                                    <p className="font-medium">{userMock.accommodation.city} / {userMock.accommodation.neighborhood}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Bed className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Tipo de quarto</p>
                                    <p className="font-medium">{userMock.accommodation.roomType}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Bath className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Tipo de banheiro</p>
                                    <p className="font-medium">{userMock.accommodation.bathroomType}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Divisão por gênero</p>
                                    <p className="font-medium">{userMock.accommodation.gender}</p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Check-in</p>
                                  <p className="font-medium">{formatDate(userMock.accommodation.checkIn)}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Check-out</p>
                                  <p className="font-medium">{formatDate(userMock.accommodation.checkOut)}</p>
                                </div>
                              </div>
                              
                              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${getStatusDisplay(userMock.reservationStatus).color}`}>
                                <span>Reserva {getStatusDisplay(userMock.reservationStatus).label}</span>
                              </div>
                              
                              <Button variant="outline" className="flex items-center gap-2">
                                <ArrowRight className="h-4 w-4" />
                                <span>Ver detalhes completos</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Progresso da Reserva</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ReservationStatusChecklist steps={userMock.progressSteps} />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                      <Card className="col-span-1 lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Mensagens Recentes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {userMock.messages.map((message) => (
                            <div key={message.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-medium">
                                  {message.sender === 'system' ? 'Sistema' : 'Atendente'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(message.date).toLocaleString('pt-BR')}
                                </div>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          ))}
                          
                          <Button className="w-full flex items-center gap-2 mt-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>Enviar Mensagem</span>
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Assinatura do Contrato</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ContractSigningSection 
                            signatureUrl="https://form.jotform.com/241042512844348" 
                            isSigned={false} 
                            onSigningComplete={handleContractSigned}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="documents">
                    <DocumentManagementSection 
                      documents={userMock.documents}
                      onUpload={handleDocumentUpload}
                      onDownload={handleDocumentDownload}
                    />
                  </TabsContent>
                  
                  <TabsContent value="messages">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mensagens</CardTitle>
                        <CardDescription>Comunicação com nossa equipe</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {userMock.messages.map((message) => (
                            <div key={message.id} className="p-4 border border-border rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-medium">
                                  {message.sender === 'system' ? 'Sistema' : 'Atendente'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(message.date).toLocaleString('pt-BR')}
                                </div>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          ))}
                          
                          <div className="pt-4">
                            <div className="mb-4">
                              <Label htmlFor="message">Nova mensagem</Label>
                              <div className="mt-2">
                                <textarea
                                  id="message"
                                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="Escreva sua mensagem..."
                                ></textarea>
                              </div>
                            </div>
                            
                            <Button className="w-full flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              <span>Enviar Mensagem</span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton phoneNumber="5521970286372" showOptions={true} />
    </div>
  );
};

export default ClientArea;
