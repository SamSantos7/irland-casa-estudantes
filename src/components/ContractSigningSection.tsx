
import { ExternalLink, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ContractSigningSectionProps {
  signatureUrl: string;
  isSigned: boolean;
  className?: string;
  onSigningComplete?: () => void;
}

const ContractSigningSection = ({ 
  signatureUrl, 
  isSigned: initialIsSigned, 
  className = "",
  onSigningComplete 
}: ContractSigningSectionProps) => {
  const [isSigned, setIsSigned] = useState(initialIsSigned);
  
  // Simula o retorno da assinatura do contrato
  const handleContractSigned = () => {
    // Em uma implementação real, isso seria chamado quando o usuário retornasse 
    // da página de assinatura através de um callback ou webhook
    setTimeout(() => {
      setIsSigned(true);
      toast.success("Contrato assinado com sucesso!");
      if (onSigningComplete) {
        onSigningComplete();
      }
    }, 1000);
  };

  return (
    <div className={`border rounded-lg p-4 bg-white dark:bg-neutrals-dark ${className}`}>
      <h3 className="text-base font-medium mb-4">Assinatura do Contrato</h3>
      
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${isSigned ? 'bg-green-100 dark:bg-green-900/20' : 'bg-teal/10 dark:bg-teal-light/10'}`}>
          <FileSignature className={`h-6 w-6 ${isSigned ? 'text-green-500 dark:text-green-400' : 'text-teal dark:text-teal-light'}`} />
        </div>
        
        <div className="flex-grow">
          <h4 className="font-medium">
            {isSigned ? "Contrato assinado" : "Assinar contrato"}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {isSigned 
              ? "Obrigado! Seu contrato foi assinado e está em processamento." 
              : "Por favor, assine o contrato digital para prosseguir com sua reserva."}
          </p>
        </div>
        
        {isSigned ? (
          <Button variant="outline" disabled>
            <FileSignature className="mr-2 h-4 w-4" />
            Assinado
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={handleContractSigned} // Em produção, isso abriria uma nova aba e não chamaria diretamente esta função
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            <a 
              href={signatureUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white"
              onClick={(e) => {
                // Em produção, removeria esta simulação
                e.preventDefault();
                handleContractSigned();
              }}
            >
              Assinar Agora
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContractSigningSection;
