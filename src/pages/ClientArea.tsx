
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";
import { Button } from "../components/ui/button";
import { 
  UserCircle, 
  Inbox, 
  FileCheck, 
  Building, 
  Clock, 
  Calendar, 
  FileText,
  HelpCircle,
  LockKeyhole,
  ChevronRight,
  LogOut
} from "lucide-react";

// Dados simulados para a demonstração
const mockReservation = {
  id: "RES-2025-04-11",
  status: "confirmado", // confirmado, pendente, processando
  accommodation: "Dublin Central Residence",
  roomType: "Quarto Individual",
  checkIn: "01/05/2025",
  checkOut: "30/07/2025",
  totalCost: "€3,200",
  documentsUploaded: [
    { name: "Passaporte", status: "aprovado", date: "10/04/2025" },
    { name: "Comprovante de Matrícula", status: "pendente", date: "11/04/2025" },
  ],
  documentsNeeded: [
    "Comprovante de Endereço",
    "Seguro Viagem"
  ],
  paymentStatus: "Depósito pago",
  paymentDue: "€2,500 (devido em 15/04/2025)"
};

// Componente de Login
const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Em um cenário real, aqui teria a autenticação
    // Por enquanto, apenas simulamos o login
    onLogin();
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-neutrals-dark p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-neutrals-dark dark:text-white">
        Acesso Área do Cliente
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-neutrals-dark dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-neutrals-dark dark:text-white"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-teal focus:ring-teal dark:text-teal-light dark:focus:ring-teal-light border-gray-300 dark:border-gray-700 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-neutrals-dark dark:text-white"
            >
              Lembrar-me
            </label>
          </div>
          <a
            href="#"
            className="text-sm text-teal dark:text-teal-light hover:underline"
          >
            Esqueci a senha
          </a>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-teal hover:bg-teal/90 dark:bg-teal-light dark:hover:bg-teal-light/90 text-white dark:text-teal"
        >
          Entrar
        </Button>
        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Ainda não tem uma conta?{" "}
          <Link to="/contact" className="text-teal dark:text-teal-light hover:underline">
            Entre em contato
          </Link>
        </div>
      </form>
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  let colorClass = "";
  
  switch (status) {
    case "confirmado":
      colorClass = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      break;
    case "pendente":
      colorClass = "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      break;
    case "processando":
      colorClass = "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      break;
    case "aprovado":
      colorClass = "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Área do cliente
const ClientDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white dark:bg-neutrals-dark rounded-2xl shadow-sm p-4">
          <div className="flex items-center p-4">
            <UserCircle size={40} className="text-teal dark:text-teal-light mr-3" />
            <div>
              <h3 className="font-semibold text-neutrals-dark dark:text-white">
                Maria Silva
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                maria@exemplo.com
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                activeTab === "overview" 
                  ? "bg-teal/10 dark:bg-teal-light/10 text-teal dark:text-teal-light font-medium" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-neutrals-dark dark:text-white"
              }`}
            >
              <Building size={18} className="mr-3" />
              <span>Minha Reserva</span>
            </button>
            
            <button
              onClick={() => setActiveTab("documents")}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                activeTab === "documents" 
                  ? "bg-teal/10 dark:bg-teal-light/10 text-teal dark:text-teal-light font-medium" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-neutrals-dark dark:text-white"
              }`}
            >
              <FileText size={18} className="mr-3" />
              <span>Documentos</span>
            </button>
            
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                activeTab === "messages" 
                  ? "bg-teal/10 dark:bg-teal-light/10 text-teal dark:text-teal-light font-medium" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-neutrals-dark dark:text-white"
              }`}
            >
              <Inbox size={18} className="mr-3" />
              <span>Mensagens</span>
              <span className="ml-auto bg-teal text-white text-xs font-bold px-2 py-1 rounded-full">
                2
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab("help")}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left ${
                activeTab === "help" 
                  ? "bg-teal/10 dark:bg-teal-light/10 text-teal dark:text-teal-light font-medium" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-neutrals-dark dark:text-white"
              }`}
            >
              <HelpCircle size={18} className="mr-3" />
              <span>Ajuda</span>
            </button>
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onLogout}
              className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg"
            >
              <LogOut size={18} className="mr-3" />
              <span>Sair</span>
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <div>
              <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm mb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white">
                      Detalhes da Reserva
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      ID: {mockReservation.id}
                    </p>
                  </div>
                  <StatusBadge status={mockReservation.status} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-neutrals-dark dark:text-white mb-4">
                      Informações da Acomodação
                    </h3>
                    <div className="space-y-3">
                      <div className="flex">
                        <Building size={18} className="text-gray-500 dark:text-gray-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-neutrals-dark dark:text-white">
                            {mockReservation.accommodation}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {mockReservation.roomType}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Calendar size={18} className="text-gray-500 dark:text-gray-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-neutrals-dark dark:text-white">
                            Check-in: {mockReservation.checkIn}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Check-out: {mockReservation.checkOut}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-neutrals-dark dark:text-white mb-4">
                      Informações de Pagamento
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-neutrals-dark dark:text-white">
                          Status: <span className="font-medium">{mockReservation.paymentStatus}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-neutrals-dark dark:text-white">
                          Valor pendente: <span className="font-medium">{mockReservation.paymentDue}</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-neutrals-dark dark:text-white">
                          Valor total: <span className="font-medium">{mockReservation.totalCost}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="w-full bg-teal hover:bg-teal/90 dark:bg-teal-light dark:hover:bg-teal-light/90 text-white dark:text-teal">
                        Realizar Pagamento
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm mb-6">
                <h3 className="font-semibold text-neutrals-dark dark:text-white mb-4">
                  Próximos Passos
                </h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-4 bg-teal/10 dark:bg-teal-light/10 rounded-full h-8 w-8 flex items-center justify-center">
                      <FileText size={16} className="text-teal dark:text-teal-light" />
                    </div>
                    <div>
                      <p className="font-medium text-neutrals-dark dark:text-white">
                        Enviar documentos pendentes
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Complete o upload dos documentos necessários.
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 dark:text-gray-600 ml-auto self-center" />
                  </li>
                  <li className="flex">
                    <div className="mr-4 bg-teal/10 dark:bg-teal-light/10 rounded-full h-8 w-8 flex items-center justify-center">
                      <LockKeyhole size={16} className="text-teal dark:text-teal-light" />
                    </div>
                    <div>
                      <p className="font-medium text-neutrals-dark dark:text-white">
                        Confirmar detalhes de chegada
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Informe seu horário de chegada e detalhes do voo.
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 dark:text-gray-600 ml-auto self-center" />
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-teal to-teal-light dark:from-teal dark:to-teal-light p-6 rounded-2xl text-white">
                <h3 className="font-semibold mb-2">Precisa de ajuda?</h3>
                <p className="mb-4 opacity-90">
                  Nossa equipe está disponível para auxiliar com quaisquer dúvidas sobre sua reserva.
                </p>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-teal dark:hover:text-teal"
                  >
                    Suporte via WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-teal dark:hover:text-teal"
                  >
                    Enviar Mensagem
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "documents" && (
            <div>
              <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm mb-6">
                <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-6">
                  Documentos
                </h2>
                
                <div className="mb-8">
                  <h3 className="font-semibold text-neutrals-dark dark:text-white mb-4">
                    Documentos Enviados
                  </h3>
                  <div className="space-y-4">
                    {mockReservation.documentsUploaded.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FileCheck size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium text-neutrals-dark dark:text-white">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Enviado em {doc.date}
                            </p>
                          </div>
                        </div>
                        <div>
                          <StatusBadge status={doc.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-neutrals-dark dark:text-white mb-4">
                    Documentos Pendentes
                  </h3>
                  {mockReservation.documentsNeeded.length > 0 ? (
                    <div className="space-y-4">
                      {mockReservation.documentsNeeded.map((doc, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
                            <p className="font-medium text-neutrals-dark dark:text-white">
                              {doc}
                            </p>
                          </div>
                          <Button size="sm">
                            Enviar
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Todos os documentos necessários foram enviados.
                    </p>
                  )}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-300">
                  <p className="text-sm">
                    <strong>Importante:</strong> Todos os documentos devem ser enviados até 7 dias antes do check-in.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "messages" && (
            <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-6">
                Mensagens
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 border border-teal border-l-4 rounded-lg bg-teal/5 dark:bg-teal-light/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-neutrals-dark dark:text-white">
                      Confirmação de Reserva
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      11/04/2025
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Sua reserva para Dublin Central Residence foi confirmada. Confira os detalhes e próximos passos.
                  </p>
                  <Button size="sm" variant="outline">
                    Ler Mensagem
                  </Button>
                </div>
                
                <div className="p-4 border border-teal border-l-4 rounded-lg bg-teal/5 dark:bg-teal-light/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-neutrals-dark dark:text-white">
                      Documentos - Ação Necessária
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      11/04/2025
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Precisamos que você envie alguns documentos adicionais para finalizar seu processo de reserva.
                  </p>
                  <Button size="sm" variant="outline">
                    Ler Mensagem
                  </Button>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="w-full">
                  Enviar Nova Mensagem
                </Button>
              </div>
            </div>
          )}
          
          {activeTab === "help" && (
            <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-6">
                Central de Ajuda
              </h2>
              
              <div className="mb-8">
                <h3 className="font-semibold text-neutrals-dark dark:text-white mb-4">
                  Perguntas Frequentes
                </h3>
                <div className="space-y-4">
                  <details className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-neutrals-dark dark:text-white">
                      Como funciona o processo de check-in?
                      <svg className="w-5 h-5 group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                      <p>
                        O check-in é realizado no endereço da acomodação entre 14h e 20h. 
                        Você receberá instruções detalhadas por e-mail uma semana antes da sua chegada.
                        Caso seu voo chegue fora desse horário, entre em contato conosco para arranjos especiais.
                      </p>
                    </div>
                  </details>
                  
                  <details className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-neutrals-dark dark:text-white">
                      Quando devo pagar o restante do valor da reserva?
                      <svg className="w-5 h-5 group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                      <p>
                        O pagamento completo deve ser efetuado até 15 dias antes da data de check-in.
                        Você receberá lembretes por e-mail e poderá efetuar o pagamento aqui na sua área do cliente.
                      </p>
                    </div>
                  </details>
                  
                  <details className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-neutrals-dark dark:text-white">
                      Como posso solicitar alterações na minha reserva?
                      <svg className="w-5 h-5 group-open:rotate-180 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                      <p>
                        Para solicitar alterações na sua reserva (datas, tipo de quarto, etc.), 
                        envie uma mensagem pela seção "Mensagens" da sua área do cliente ou 
                        entre em contato via WhatsApp. Nossa equipe responderá em até 24 horas úteis.
                      </p>
                    </div>
                  </details>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-semibold text-neutrals-dark dark:text-white mb-4">
                  Contato Direto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center rounded-full mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-neutrals-dark dark:text-white mb-1">
                      WhatsApp
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Resposta em até 2 horas
                    </p>
                    <Button size="sm" variant="outline">
                      Conversar no WhatsApp
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-teal/10 dark:bg-teal-light/10 flex items-center justify-center rounded-full mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal dark:text-teal-light">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <h4 className="font-medium text-neutrals-dark dark:text-white mb-1">
                      E-mail
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Resposta em até 24 horas
                    </p>
                    <Button size="sm" variant="outline">
                      Enviar E-mail
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ClientArea = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Área do Cliente | Irlanda Casa Estudantes"
        description="Acesse sua área exclusiva de cliente para gerenciar sua reserva, documentos e pagamentos."
        canonical="/client-area"
      />
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="bg-teal dark:bg-teal py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Área do Cliente
            </h1>
            <p className="text-white/90">
              Gerencie sua reserva, documentos e pagamentos
            </p>
          </div>
        </section>
        
        <section className="py-12">
          {isLoggedIn ? (
            <ClientDashboard onLogout={handleLogout} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton phoneNumber="353000000000" />
    </div>
  );
};

export default ClientArea;
