
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Download, Check, Clock, AlertCircle, X } from "lucide-react";

export type DocumentStatus = 'approved' | 'pending' | 'rejected' | 'not_uploaded';

export interface Document {
  id: string;
  name: string;
  type: 'upload' | 'download';
  description: string;
  status: DocumentStatus;
  filename?: string;
  uploadDate?: string;
  downloadUrl?: string;
}

interface DocumentManagementSectionProps {
  documents: Document[];
  onUpload: (documentId: string, file: File) => void;
  onDownload: (documentId: string) => void;
  className?: string;
}

const DocumentManagementSection = ({
  documents,
  onUpload,
  onDownload,
  className = ""
}: DocumentManagementSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, documentId: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onUpload(documentId, file);
    }
  };

  const getStatusDisplay = (status: DocumentStatus) => {
    switch (status) {
      case 'approved':
        return { label: 'Aprovado', icon: <Check className="h-4 w-4 text-green-500" />, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' };
      case 'pending':
        return { label: 'Em análise', icon: <Clock className="h-4 w-4 text-amber-500" />, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' };
      case 'rejected':
        return { label: 'Reprovado', icon: <X className="h-4 w-4 text-red-500" />, color: 'text-red-500 bg-red-50 dark:bg-red-900/20' };
      case 'not_uploaded':
        return { label: 'Não enviado', icon: <Upload className="h-4 w-4 text-gray-500" />, color: 'text-gray-500 bg-gray-50 dark:bg-gray-800/30' };
      default:
        return { label: 'Desconhecido', icon: <AlertCircle className="h-4 w-4 text-gray-500" />, color: 'text-gray-500 bg-gray-50 dark:bg-gray-800/30' };
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Documentos</CardTitle>
        <CardDescription>Gerenciar seus documentos de reserva</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 border border-border rounded-lg">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">{doc.name}</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                  
                  {doc.type === 'upload' && doc.status !== 'not_uploaded' && (
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <span>{doc.filename}</span>
                      {doc.uploadDate && (
                        <>
                          <span>•</span>
                          <span>Enviado em {doc.uploadDate}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusDisplay(doc.status).color}`}>
                    {getStatusDisplay(doc.status).icon}
                    <span>{getStatusDisplay(doc.status).label}</span>
                  </div>
                  
                  {doc.type === 'upload' ? (
                    <div className="relative">
                      <input
                        id={`file-upload-${doc.id}`}
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleFileChange(e, doc.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        <span>{doc.status === 'not_uploaded' ? 'Enviar' : 'Atualizar'}</span>
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onDownload(doc.id)}
                      disabled={!doc.downloadUrl}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      <span>Baixar</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentManagementSection;
