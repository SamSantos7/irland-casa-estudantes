
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Termos de Uso | Irlanda Casa Estudantes"
        description="Termos e condições para utilização de nossos serviços de acomodação estudantil na Irlanda."
        canonical="/terms"
      />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-neutrals-dark dark:text-white">Termos de Uso</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-neutrals-dark dark:text-white">1. Aceitação dos Termos</h2>
            <p className="mb-4">
              Ao acessar e utilizar os serviços da Casa Estudantes, você concorda com os termos e condições aqui descritos. Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nossos serviços.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">2. Descrição dos Serviços</h2>
            <p className="mb-4">
              A Casa Estudantes é uma plataforma que facilita a busca e reserva de acomodação estudantil na Irlanda, oferecendo suporte em português para estudantes que desejam morar temporariamente no país.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">3. Condições de Reserva</h2>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>As reservas estão sujeitas à disponibilidade e aprovação dos proprietários ou gestores das acomodações.</li>
              <li>Apenas estudantes maiores de 18 anos podem efetuar reservas diretamente ou menores com autorização expressa dos pais ou responsáveis.</li>
              <li>Todas as informações fornecidas durante o processo de reserva devem ser precisas e verdadeiras.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">4. Pagamentos e Taxas</h2>
            <p className="mb-4">
              Os preços exibidos em nosso site são em Euros (€) e podem estar sujeitos a alterações. Taxas adicionais podem se aplicar dependendo do método de pagamento escolhido.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">5. Obrigações do Usuário</h2>
            <p className="mb-4">
              O usuário concorda em respeitar as regras da acomodação escolhida, manter a propriedade em boas condições e comunicar qualquer problema ou dano imediatamente.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">6. Limitação de Responsabilidade</h2>
            <p className="mb-4">
              A Casa Estudantes atua como intermediária entre estudantes e acomodações. Não nos responsabilizamos por disputas diretas entre as partes, mas nos comprometemos a auxiliar na mediação quando possível.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">7. Política de Privacidade</h2>
            <p className="mb-4">
              Respeitamos sua privacidade e protegemos seus dados pessoais de acordo com nossa Política de Privacidade, que pode ser acessada separadamente em nosso site.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">8. Alterações nos Termos</h2>
            <p className="mb-4">
              Reservamo-nos o direito de modificar estes termos a qualquer momento, sendo responsabilidade do usuário verificar periodicamente se houve atualizações.
            </p>

            <div className="bg-neutrals-light dark:bg-neutrals-dark p-6 rounded-lg mt-8">
              <p className="font-medium text-neutrals-dark dark:text-white">
                Para qualquer dúvida relacionada aos nossos termos de uso, entre em contato conosco através do e-mail juridico@casaestudantes.ie ou pelo WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton phoneNumber="353000000000" />
    </div>
  );
};

export default Terms;
