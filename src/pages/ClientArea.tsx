
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, Clock, Download, FileText, Upload, MessageCircle, User, AlertCircle, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ReservationStatus = 'pending' | 'reviewing' | 'approved' | 'completed';

const ClientArea = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      roomType: "individual",
      checkIn: "2025-07-01",
      checkOut: "2025-12-31",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    documents: {
      passport: { 
        status: 'approved',
        filename: 'passport.pdf',
        uploaded: '2025-04-05' 
      },
      enrollmentLetter: { 
        status: 'pending',
        filename: 'enrollment_letter.pdf',
        uploaded: '2025-04-05' 
      },
      paymentProof: { 
        status: 'not_uploaded',
        filename: '',
        uploaded: '' 
      }
    },
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
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const getStatusDisplay = (status: ReservationStatus) => {
    switch (status) {
      case 'pending':
        return { label: 'Pendente', icon: <Clock className="h-5 w-5 text-amber-500" />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' };
      case 'reviewing':
        return { label: 'Em análise', icon: <FileText className="h-5 w-5 text-blue-500" />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/30' };
      case 'approved':
        return { label: 'Aprovada', icon: <Check className="h-5 w-5 text-green-500" />, color: 'text-green-500 bg-green-50 dark:bg-green-950/30' };
      case 'completed':
        return { label: 'Concluída', icon: <Check className="h-5 w-5 text-green-500" />, color: 'text-green-500 bg-green-50 dark:bg-green-950/30' };
      default:
        return { label: 'Desconhecido', icon: <AlertCircle className="h-5 w-5 text-gray-500" />, color: 'text-gray-500 bg-gray-50 dark:bg-gray-800' };
    }
  };

  const getDocumentStatusDisplay = (status: string) => {
    switch (status) {
      case 'approved':
        return { label: 'Aprovado', icon: <Check className="h-4 w-4 text-green-500" />, color: 'text-green-500 bg-green-50 dark:bg-green-950/30' };
      case 'pending':
        return { label: 'Em análise', icon: <Clock className="h-4 w-4 text-amber-500" />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' };
      case 'rejected':
        return { label: 'Reprovado', icon: <AlertCircle className="h-4 w-4 text-red-500" />, color: 'text-red-500 bg-red-50 dark:bg-red-950/30' };
      case 'not_uploaded':
        return { label: 'Não enviado', icon: <Upload className="h-4 w-4 text-gray-500" />, color: 'text-gray-500 bg-gray-50 dark:bg-gray-800' };
      default:
        return { label: 'Desconhecido', icon: <AlertCircle className="h-4 w-4 text-gray-500" />, color: 'text-gray-500 bg-gray-50 dark:bg-gray-800' };
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
              <div className="mb-8 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={userMock.profileImage} alt={userMock.name} />
                    <AvatarFallback>{userMock.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-neutrals-dark dark:text-white">
                      Olá, {userMock.name.split(' ')[0]}!
                    </h1>
                    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm ${getStatusDisplay(userMock.reservationStatus).color}`}>
                      {getStatusDisplay(userMock.reservationStatus).icon}
                      <span>Reserva {getStatusDisplay(userMock.reservationStatus).label}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
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
                        <CardTitle>Sua Reserva</CardTitle>
                        <CardDescription>Detalhes da sua acomodação</CardDescription>
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
                              <p className="text-muted-foreground">{userMock.accommodation.city}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Check-in</p>
                                <p className="font-medium">{formatDate(userMock.accommodation.checkIn)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Check-out</p>
                                <p className="font-medium">{formatDate(userMock.accommodation.checkOut)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Tipo de quarto</p>
                                <p className="font-medium">
                                  {userMock.accommodation.roomType === 'individual' ? 'Quarto Individual' : 
                                   userMock.accommodation.roomType === 'shared' ? 'Quarto Compartilhado' : 'Quarto de Casal'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Duração</p>
                                <p className="font-medium">6 meses</p>
                              </div>
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
                        <CardTitle>Status da Documentação</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>Passaporte</span>
                          </div>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getDocumentStatusDisplay(userMock.documents.passport.status).color}`}>
                            {getDocumentStatusDisplay(userMock.documents.passport.status).icon}
                            <span>{getDocumentStatusDisplay(userMock.documents.passport.status).label}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>Carta de Matrícula</span>
                          </div>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getDocumentStatusDisplay(userMock.documents.enrollmentLetter.status).color}`}>
                            {getDocumentStatusDisplay(userMock.documents.enrollmentLetter.status).icon}
                            <span>{getDocumentStatusDisplay(userMock.documents.enrollmentLetter.status).label}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>Comprovante de Pagamento</span>
                          </div>
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getDocumentStatusDisplay(userMock.documents.paymentProof.status).color}`}>
                            {getDocumentStatusDisplay(userMock.documents.paymentProof.status).icon}
                            <span>{getDocumentStatusDisplay(userMock.documents.paymentProof.status).label}</span>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            <span>Gerenciar documentos</span>
                          </Button>
                        </div>
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
                        <CardTitle>Links Úteis</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                          <User className="h-4 w-4" />
                          <span>Editar Dados Pessoais</span>
                        </Button>
                        
                        <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                          <MessageCircle className="h-4 w-4" />
                          <span>Falar com Atendente</span>
                        </Button>
                        
                        <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
                          <Download className="h-4 w-4" />
                          <span>Baixar Informações</span>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents">
                  <Card>
                    <CardHeader>
                      <CardTitle>Documentos</CardTitle>
                      <CardDescription>Gerencie os documentos da sua reserva</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">Passaporte</h3>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{userMock.documents.passport.filename}</span>
                                <span>•</span>
                                <span>Enviado em {formatDate(userMock.documents.passport.uploaded)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getDocumentStatusDisplay(userMock.documents.passport.status).color}`}>
                                {getDocumentStatusDisplay(userMock.documents.passport.status).icon}
                                <span>{getDocumentStatusDisplay(userMock.documents.passport.status).label}</span>
                              </div>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4" />
                                <span className="ml-2">Atualizar</span>
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">Carta de Matrícula</h3>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{userMock.documents.enrollmentLetter.filename}</span>
                                <span>•</span>
                                <span>Enviado em {formatDate(userMock.documents.enrollmentLetter.uploaded)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getDocumentStatusDisplay(userMock.documents.enrollmentLetter.status).color}`}>
                                {getDocumentStatusDisplay(userMock.documents.enrollmentLetter.status).icon}
                                <span>{getDocumentStatusDisplay(userMock.documents.enrollmentLetter.status).label}</span>
                              </div>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4" />
                                <span className="ml-2">Atualizar</span>
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-medium">Comprovante de Pagamento</h3>
                              <div className="text-sm text-muted-foreground">
                                {userMock.documents.paymentProof.status === 'not_uploaded' ? (
                                  <span>Nenhum arquivo enviado</span>
                                ) : (
                                  <>
                                    <span>{userMock.documents.paymentProof.filename}</span>
                                    <span>•</span>
                                    <span>Enviado em {formatDate(userMock.documents.paymentProof.uploaded)}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getDocumentStatusDisplay(userMock.documents.paymentProof.status).color}`}>
                                {getDocumentStatusDisplay(userMock.documents.paymentProof.status).icon}
                                <span>{getDocumentStatusDisplay(userMock.documents.paymentProof.status).label}</span>
                              </div>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4" />
                                <span className="ml-2">{userMock.documents.paymentProof.status === 'not_uploaded' ? 'Enviar' : 'Atualizar'}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
          )}
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton phoneNumber="353000000000" showOptions={true} />
    </div>
  );
};

export default ClientArea;
