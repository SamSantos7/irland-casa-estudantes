
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Users, GraduationCap, Building, Heart, Handshake, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-teal dark:bg-teal text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                Sobre a Casa Estudantes
              </h1>
              <p className="text-lg">
                Ajudamos estudantes brasileiros a encontrar acomodações de qualidade na Irlanda desde 2018.
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-4">
                  Nossa História
                </h2>
                <p className="text-muted-foreground mb-4">
                  A Casa Estudantes nasceu da experiência pessoal de nossa fundadora, que viveu como estudante na Irlanda e conheceu de perto os desafios de encontrar moradia em um país estrangeiro.
                </p>
                <p className="text-muted-foreground mb-4">
                  Após passar por dificuldades ao procurar acomodação em Dublin, ela percebeu que muitos estudantes brasileiros enfrentavam os mesmos problemas: barreira do idioma, falta de conhecimento sobre os bairros, dificuldade em entender contratos e, principalmente, insegurança ao enviar dinheiro para um país estrangeiro.
                </p>
                <p className="text-muted-foreground">
                  Em 2018, decidimos criar uma ponte entre os estudantes brasileiros e as melhores acomodações na Irlanda, com um atendimento totalmente em português e um processo transparente do início ao fim.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1541623089466-8e76290c6e08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXJlbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Dublin, Irlanda"
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
                <div className="absolute -bottom-5 -left-5 bg-white dark:bg-neutrals-dark p-4 rounded-lg shadow-md">
                  <p className="font-bold text-neutrals-dark dark:text-white">5+ anos</p>
                  <p className="text-sm text-muted-foreground">de experiência</p>
                </div>
                <div className="absolute -top-5 -right-5 bg-white dark:bg-neutrals-dark p-4 rounded-lg shadow-md">
                  <p className="font-bold text-neutrals-dark dark:text-white">600+</p>
                  <p className="text-sm text-muted-foreground">estudantes ajudados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Missão e Valores */}
        <section className="py-16 bg-neutrals-light dark:bg-neutrals-dark">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-4">
                Missão e Valores
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Acreditamos que uma acomodação segura e confortável é fundamental para uma experiência de intercâmbio bem-sucedida.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-md">
                <div className="h-12 w-12 bg-teal/20 dark:bg-teal-light/20 rounded-full flex items-center justify-center mb-4">
                  <Heart className="text-teal dark:text-teal-light" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-2">Missão</h3>
                <p className="text-muted-foreground">
                  Facilitar a adaptação de estudantes brasileiros na Irlanda através de acomodações seguras e de qualidade, com atendimento humanizado em português.
                </p>
              </div>
              
              <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-md">
                <div className="h-12 w-12 bg-teal/20 dark:bg-teal-light/20 rounded-full flex items-center justify-center mb-4">
                  <Award className="text-teal dark:text-teal-light" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-2">Visão</h3>
                <p className="text-muted-foreground">
                  Ser a referência em acomodação estudantil para brasileiros na Irlanda, garantindo uma experiência tranquila e enriquecedora em todas as etapas.
                </p>
              </div>
              
              <div className="bg-white dark:bg-neutrals-dark p-6 rounded-2xl shadow-md">
                <div className="h-12 w-12 bg-teal/20 dark:bg-teal-light/20 rounded-full flex items-center justify-center mb-4">
                  <Handshake className="text-teal dark:text-teal-light" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-2">Valores</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Transparência em todo o processo</li>
                  <li>• Atendimento humanizado e personalizado</li>
                  <li>• Compromisso com a qualidade das acomodações</li>
                  <li>• Responsabilidade com nossos estudantes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nossos Diferenciais */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-bold text-neutrals-dark dark:text-white mb-10 text-center">
              Nossos Diferenciais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex">
                <div className="h-12 w-12 bg-teal/20 dark:bg-teal-light/20 rounded-full flex flex-shrink-0 items-center justify-center mr-4">
                  <Users className="text-teal dark:text-teal-light" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-2">Atendimento em Português</h3>
                  <p className="text-muted-foreground">
                    Comunicação clara e sem barreiras linguísticas, facilitando todo o processo de reserva e adaptação.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="h-12 w-12 bg-teal/20 dark:bg-teal-light/20 rounded-full flex flex-shrink-0 items-center justify-center mr-4">
                  <GraduationCap className="text-teal dark:text-teal-light" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-2">Experiência Local</h3>
                  <p className="text-muted-foreground">
                    Nossa equipe conhece profundamente o mercado imobiliário irlandês e as necessidades específicas dos estudantes.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="h-12 w-12 bg-teal/20 dark:bg-teal-light/20 rounded-full flex flex-shrink-0 items-center justify-center mr-4">
                  <Building className="text-teal dark:text-teal-light" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutrals-dark dark:text-white mb-2">Acomodações Verificadas</h3>
                  <p className="text-muted-foreground">
                    Todas as nossas acomodações são cuidadosamente selecionadas e verificadas para garantir conforto e segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-teal dark:bg-teal text-white">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pronto para encontrar sua acomodação?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Entre em contato conosco ou faça sua reserva diretamente.
              Estamos aqui para ajudar em cada passo da sua jornada!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/reservation-form"
                className="bg-white text-teal px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition btn-hover-effect"
              >
                Fazer Reserva
              </a>
              <a
                href="/contact"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition btn-hover-effect"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton phoneNumber="353000000000" showOptions={true} />
    </div>
  );
};

export default About;
