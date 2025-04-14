import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ClientArea = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        toast.error("Por favor, faça login para acessar esta página");
        navigate('/');
        return;
      }
      
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
        setTimeout(() => navigate('/'), 3000);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
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
