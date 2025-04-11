import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import AccommodationCard from "../components/AccommodationCard";
import TestimonialCard from "../components/TestimonialCard";
import FaqSection from "../components/FaqSection";
import HowItWorks from "../components/HowItWorks";
import WhatsAppButton from "../components/WhatsAppButton";
import SEO from "../components/SEO";
import { ArrowRight } from "lucide-react";

// Sample data for featured accommodations
const featuredAccommodations = [
  {
    id: 1,
    name: "Dublin Central Residence",
    city: "Dublin",
    roomType: "individual",
    pricePerWeek: 250,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Cork Student House",
    city: "Cork",
    roomType: "shared",
    pricePerWeek: 180,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Galway Campus Suite",
    city: "Galway",
    roomType: "double",
    pricePerWeek: 320,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Limerick City View",
    city: "Limerick",
    roomType: "individual",
    pricePerWeek: 230,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

// Sample data for testimonials
const testimonials = [
  {
    name: "Maria Silva",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    testimonial:
      "A Casa Estudantes me ajudou a encontrar o lugar perfeito para ficar durante meu curso de inglês. O suporte em português foi essencial para me sentir segura!",
    location: "Estudante em Dublin",
  },
  {
    name: "Pedro Oliveira",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    testimonial:
      "Processo super fácil e rápido! Em menos de uma semana já tinha minha acomodação confirmada em Cork. Recomendo demais!",
    location: "Estudante em Cork",
  },
  {
    name: "Ana Rodrigues",
    image: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    testimonial:
      "Estava super insegura de viajar sozinha para a Irlanda, mas ter uma acomodação já garantida antes de chegar fez toda diferença. Equipe atenciosa e prestativa!",
    location: "Estudante em Galway",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Acomodações estudantis na Irlanda | Irlanda Casa Estudantes"
        description="Encontre acomodação estudantil ideal na Irlanda com suporte em português. Residências em Dublin, Cork, Galway e Limerick para seu intercâmbio."
        canonical="/"
      />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-teal to-teal-light dark:from-neutrals-dark dark:to-teal text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                Encontre sua acomodação estudantil ideal na Irlanda com suporte em português.
              </h1>
              <p className="text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Residências estudantis em Dublin, Cork, Galway e Limerick com processo simplificado e atendimento personalizado.
              </p>
              <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link
                  to="/accommodations"
                  className="bg-white text-teal px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition btn-hover-effect"
                >
                  Ver Acomodações
                </Link>
                <Link
                  to="/contact"
                  className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition btn-hover-effect"
                >
                  Contato
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXJlbGFuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                alt="Paisagem da Irlanda"
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-neutrals-light dark:bg-neutrals-dark relative z-10">
        <div className="container">
          <div className="-mt-20">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Accommodations */}
      <section className="py-16 bg-neutrals-light dark:bg-neutrals-dark">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-neutrals-dark dark:text-white">
              Acomodações em Destaque
            </h2>
            <Link
              to="/accommodations"
              className="flex items-center text-teal dark:text-teal-light hover:underline"
            >
              <span>Ver todas</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAccommodations.map((accommodation) => (
              <AccommodationCard key={accommodation.id} {...accommodation} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-neutrals-dark dark:text-white">
            O que Nossos Clientes Dizem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutrals-light dark:bg-neutrals-dark">
        <div className="container">
          <FaqSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal dark:bg-teal text-white">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto para encontrar sua acomodação ideal?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco agora mesmo ou faça sua reserva diretamente.
            Nossa equipe está pronta para te ajudar!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservation-form"
              className="bg-white text-teal px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition btn-hover-effect"
            >
              Fazer Reserva
            </Link>
            <Link
              to="/contact"
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition btn-hover-effect"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton phoneNumber="353000000000" showOptions={true} />
    </div>
  );
};

export default Index;
