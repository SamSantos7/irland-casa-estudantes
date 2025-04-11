
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Política de Reembolso | Irlanda Casa Estudantes"
        description="Nossa política de reembolso para reservas de acomodação estudantil na Irlanda."
        canonical="/refund-policy"
      />
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-neutrals-dark dark:text-white">Política de Reembolso</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4 text-neutrals-dark dark:text-white">1. Reservas e Pagamentos</h2>
            <p className="mb-4">
              Ao efetuar uma reserva em nossa plataforma, o estudante concorda com os termos e condições aqui descritos para reembolsos e cancelamentos.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">2. Política de Cancelamento</h2>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Cancelamentos feitos até 30 dias antes da data de check-in: reembolso de 90% do valor pago.</li>
              <li>Cancelamentos entre 29 e 15 dias antes da data de check-in: reembolso de 70% do valor pago.</li>
              <li>Cancelamentos entre 14 e 7 dias antes da data de check-in: reembolso de 50% do valor pago.</li>
              <li>Cancelamentos com menos de 7 dias da data de check-in: não haverá reembolso.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">3. Circunstâncias Especiais</h2>
            <p className="mb-4">
              Em casos de negativa de visto, apresentando a documentação oficial que comprove a negativa, o reembolso será de 100% do valor pago, menos uma taxa administrativa de €50,00.
            </p>
            <p className="mb-4">
              Em casos de emergência médica ou familiar grave, devidamente documentada, a equipe analisará o caso individualmente para definir o valor do reembolso.
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">4. Processo de Reembolso</h2>
            <p className="mb-4">
              Todos os reembolsos serão processados em até 10 dias úteis após a aprovação e serão feitos através do mesmo método de pagamento utilizado para a reserva.
            </p>
            <p className="mb-4">
              Para solicitar um cancelamento e reembolso, o estudante deve enviar um e-mail para cancelamento@casaestudantes.ie com o assunto "Cancelamento de Reserva - [Nome Completo]".
            </p>

            <h2 className="text-2xl font-semibold mb-4 mt-8 text-neutrals-dark dark:text-white">5. Alterações nas Reservas</h2>
            <p className="mb-4">
              Alterações na data de check-in ou check-out estão sujeitas à disponibilidade e podem incorrer em taxas adicionais. Alterações devem ser solicitadas com pelo menos 14 dias de antecedência.
            </p>

            <div className="bg-neutrals-light dark:bg-neutrals-dark p-6 rounded-lg mt-8">
              <p className="font-medium text-neutrals-dark dark:text-white">
                Para qualquer dúvida relacionada à nossa política de reembolso, entre em contato conosco através do e-mail suporte@casaestudantes.ie ou pelo WhatsApp.
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

export default RefundPolicy;
