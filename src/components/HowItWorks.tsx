
import { Search, Calendar, Home, CheckCircle } from "lucide-react";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step = ({ icon, title, description }: StepProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-teal dark:bg-teal-light text-white dark:text-teal mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-neutrals-dark dark:text-white">
        {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-neutrals-dark dark:text-white">
          Como Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <Step
            icon={<Search size={32} />}
            title="Busque"
            description="Pesquise entre nossas diversas opções de acomodações em Dublin, Cork, Galway e Limerick."
          />
          <Step
            icon={<Calendar size={32} />}
            title="Reserve"
            description="Preencha o formulário com seus dados e período desejado para estadia."
          />
          <Step
            icon={<Home size={32} />}
            title="Confirme"
            description="Receba a confirmação da sua reserva e os detalhes do pagamento em até 24 horas."
          />
          <Step
            icon={<CheckCircle size={32} />}
            title="Aproveite"
            description="Chegue na Irlanda com sua acomodação garantida e suporte em português."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
