
import { useState } from "react";
import { Upload, FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface Document {
  id: string;
  name: string;
  type: "upload" | "download";
  status: "pending" | "uploaded" | "approved" | "rejected";
  url?: string;
  fileName?: string;
}

interface DocumentManagerProps {
  documents: Document[];
  onDocumentUpload?: (documentId: string, file: File) => Promise<void>;
  className?: string;
}

const DocumentManager = ({ documents, onDocumentUpload, className = "" }: DocumentManagerProps) => {
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("O arquivo é muito grande. Limite máximo: 5MB", {
        position: "bottom-center",
        icon: <AlertCircle className="text-red-500" />
      });
      return;
    }
    
    if (onDocumentUpload) {
      setUploading(prev => ({ ...prev, [documentId]: true }));
      
      try {
        await onDocumentUpload(documentId, file);
        toast.success(`Documento "${file.name}" enviado com sucesso!`, {
          position: "bottom-center",
          icon: <CheckCircle className="text-green-500" />
        });
      } catch (error) {
        toast.error("Erro ao enviar o documento. Tente novamente.", {
          position: "bottom-center",
          icon: <AlertCircle className="text-red-500" />
        });
      } finally {
        setUploading(prev => ({ ...prev, [documentId]: false }));
      }
    }
  };

  const handleDownload = (doc: Document) => {
    if (doc.url) {
      window.open(doc.url, "_blank");
    } else {
      toast.error("Link de download não disponível", {
        position: "bottom-center",
        icon: <AlertCircle className="text-red-500" />
      });
    }
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "uploaded":
        return <FileText className="h-4 w-4 text-amber-500" />;
      case "pending":
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: Document["status"]) => {
    switch (status) {
      case "approved": return "Aprovado";
      case "rejected": return "Rejeitado";
      case "uploaded": return "Enviado";
      case "pending": default: return "Pendente";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-base font-medium mb-4">Documentos</h3>
      
      <div className="grid gap-3">
        {documents.map((doc) => (
          <div key={doc.id} className="border rounded-lg p-4 bg-white dark:bg-neutrals-dark">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-teal dark:text-teal-light" />
                <div>
                  <h4 className="text-sm font-medium">{doc.name}</h4>
                  <div className="flex items-center mt-1">
                    {getStatusIcon(doc.status)}
                    <span className="text-xs ml-1">{getStatusText(doc.status)}</span>
                  </div>
                </div>
              </div>
              
              {doc.type === "upload" && (
                <div>
                  <input
                    type="file"
                    id={`file-${doc.id}`}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, doc.id)}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label htmlFor={`file-${doc.id}`}>
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={uploading[doc.id]}
                      className="cursor-pointer"
                      asChild
                    >
                      <span>
                        {uploading[doc.id] ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-teal border-t-transparent mr-1"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-1" />
                            {doc.status === "pending" ? "Enviar" : "Atualizar"}
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              )}
              
              {doc.type === "download" && (
                <Button 
                  size="sm" 
                  variant="outline"
                  disabled={!doc.url}
                  onClick={() => handleDownload(doc)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
              )}
            </div>
            
            {doc.fileName && doc.status !== "pending" && (
              <p className="text-xs text-gray-500 mt-2">
                Arquivo: {doc.fileName}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentManager;
