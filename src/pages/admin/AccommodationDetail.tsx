
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AccommodationDetails from "@/components/admin/AccommodationDetails";
import AccommodationForm from "@/components/admin/AccommodationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminAccommodationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  
  // Se não houver ID, redirecionar para a lista
  useEffect(() => {
    if (!id) {
      navigate("/admin/accommodations");
    }
  }, [id, navigate]);
  
  const handleEdit = () => {
    setShowEditForm(true);
  };
  
  const handleFormSuccess = () => {
    setShowEditForm(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/admin/accommodations")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Detalhes da Acomodação</h1>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {id && <AccommodationDetails accommodationId={id} onEdit={handleEdit} />}
        </CardContent>
      </Card>
      
      {/* Modal de edição */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Editar Acomodação</DialogTitle>
            <DialogDescription>
              Atualize os detalhes da acomodação conforme necessário.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto py-4">
            {id && (
              <AccommodationForm 
                accommodationId={id}
                onSuccess={handleFormSuccess}
                onCancel={() => setShowEditForm(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAccommodationDetail;
