
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Mail, AlertCircle } from "lucide-react";

const ClientArea = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error checking session:", error);
        setLoading(false);
        setShowLoginForm(true);
        return;
      }
      
      if (!data.session) {
        setShowLoginForm(true);
        setLoading(false);
        return;
      }
      
      setUser(data.session.user);
      
      // Verifica se o usuário completou o formulário
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('form_submitted')
        .eq('id', data.session.user.id)
        .single();
        
      if (profileError) {
        console.error("Erro ao verificar perfil:", profileError);
        setLoading(false);
        return;
      }
      
      setFormSubmitted(!!profileData?.form_submitted);
      
      if (!profileData?.form_submitted) {
        toast.error("Você precisa preencher o formulário de reserva primeiro");
        setTimeout(() => navigate('/reservation-form'), 3000);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Login realizado com sucesso!");
      setShowLoginForm(false);
      // Reload page to update auth state
      window.location.reload();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.message.includes("Email not confirmed")) {
        toast.error("Você ainda não criou sua senha. Verifique seu e-mail para ativar sua conta e acessar a área do cliente.", {
          duration: 6000,
        });
      } else if (error.message.includes("Invalid login credentials")) {
        toast.error("E-mail ou senha inválidos. Tente novamente.");
      } else {
        toast.error("Erro ao fazer login. Tente novamente mais tarde.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Por favor, digite seu e-mail para redefinir sua senha.");
      return;
    }
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/client-area`,
      });
      
      if (error) throw error;
      
      toast.success("Enviamos um e-mail para redefinir sua senha. Verifique sua caixa de entrada.", {
        duration: 6000,
      });
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      toast.error("Erro ao solicitar redefinição de senha. Tente novamente mais tarde.");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal border-t-transparent"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (showLoginForm) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="container py-16 text-center">
            <div className="mx-auto max-w-md bg-white dark:bg-neutrals-dark rounded-2xl p-8 shadow-md">
              <h1 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-4">
                Acesso à Área do Cliente
              </h1>
              
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutrals-dark dark:text-white mb-1">
                    Senha
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full bg-teal dark:bg-teal-light text-white dark:text-teal hover:bg-opacity-90 dark:hover:bg-opacity-90"
                  >
                    {loginLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        <span>Entrando...</span>
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </div>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  onClick={handlePasswordReset}
                  className="text-sm text-teal dark:text-teal-light hover:underline focus:outline-none"
                >
                  Esqueceu sua senha?
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>Ainda não criou sua senha? Verifique seu e-mail para ativar sua conta.</span>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!formSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="container py-16 text-center">
            <div className="mx-auto max-w-lg bg-white dark:bg-neutrals-dark rounded-2xl p-8 shadow-md">
              <h1 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-4">
                Acesso Restrito
              </h1>
              <p className="text-muted-foreground mb-6">
                Para acessar a área do cliente, você precisa preencher o formulário de reserva primeiro.
              </p>
              <div className="flex justify-center">
                <a
                  href="/reservation-form"
                  className="inline-block bg-teal dark:bg-teal-light text-white dark:text-teal px-6 py-3 rounded-lg hover:bg-opacity-90 dark:hover:bg-opacity-90 transition"
                >
                  Ir para Formulário de Reserva
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutrals-dark dark:text-white mb-6">
            Área do Cliente
          </h1>
          
          {/* Conteúdo da área do cliente aqui */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 md:p-8 shadow-md">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4">
                  Status da Sua Reserva
                </h2>
                {/* Aqui você pode adicionar componentes como ReservationStatusChecklist ou ReservationProgressBar */}
                <p className="text-muted-foreground">
                  Informações detalhadas sobre o status da sua reserva serão exibidas aqui.
                </p>
              </div>
            </div>
            
            <div className="md:col-span-4">
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 md:p-8 shadow-md mb-6">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4">
                  Próximos Passos
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-teal dark:bg-teal-light text-white dark:text-teal flex items-center justify-center text-xs mr-2 mt-1">
                      1
                    </span>
                    <span>Aguardar confirmação da reserva</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs mr-2 mt-1">
                      2
                    </span>
                    <span>Assinar contrato</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center text-xs mr-2 mt-1">
                      3
                    </span>
                    <span>Realizar pagamento</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-neutrals-dark rounded-2xl p-6 md:p-8 shadow-md">
                <h2 className="text-xl font-semibold text-neutrals-dark dark:text-white mb-4">
                  Precisa de Ajuda?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Nossa equipe está disponível para ajudar com qualquer dúvida sobre sua reserva.
                </p>
                <a
                  href="/contact"
                  className="block w-full bg-teal dark:bg-teal-light text-white dark:text-teal font-medium py-2 px-4 rounded-lg text-center hover:bg-opacity-90 dark:hover:bg-opacity-90 transition"
                >
                  Contatar Suporte
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientArea;
