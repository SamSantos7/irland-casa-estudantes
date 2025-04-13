
import { ExternalLink, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContractSigningSectionProps {
  signatureUrl: string;
  isSigned: boolean;
  className?: string;
}

const ContractSigningSection = ({ signatureUrl, isSigned, className = "" }: ContractSigningSectionProps) => {
  return (
    <div className={`border rounded-lg p-4 bg-white dark:bg-neutrals-dark ${className}`}>
      <h3 className="text-base font-medium mb-4">Assinatura do Contrato</h3>
      
      <div className="flex items-center gap-4">
        <div className="bg-teal/10 dark:bg-teal-light/10 p-3 rounded-full">
          <FileSignature className="h-6 w-6 text-teal dark:text-teal-light" />
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
        
        <Button
          variant={isSigned ? "outline" : "default"}
          disabled={isSigned}
        >
          {isSigned ? (
            <>
              <FileSignature className="mr-2 h-4 w-4" />
              Assinado
            </>
          ) : (
            <>
              <ExternalLink className="mr-2 h-4 w-4" />
              <a 
                href={signatureUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white"
              >
                Assinar Agora
              </a>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ContractSigningSection;
