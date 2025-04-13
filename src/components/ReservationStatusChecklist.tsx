
import { Check, Clock, FileText, AlertCircle, Upload, FileSignature, FileCheck, FileSearch } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export type ReservationStepStatus = 'completed' | 'in_progress' | 'pending';

export interface ReservationStep {
  id: string;
  label: string;
  status: ReservationStepStatus;
  description?: string;
}

interface ReservationStatusChecklistProps {
  steps: ReservationStep[];
  className?: string;
}

const ReservationStatusChecklist = ({ steps, className = "" }: ReservationStatusChecklistProps) => {
  // Calculate completion percentage
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const getStepIcon = (id: string, status: ReservationStepStatus) => {
    // Choose icon based on step type and status
    switch (id) {
      case "passport":
        return status === 'completed' ? <FileCheck className="h-5 w-5" /> : <FileText className="h-5 w-5" />;
      case "school_letter":
        return status === 'completed' ? <FileCheck className="h-5 w-5" /> : <FileText className="h-5 w-5" />;
      case "payment":
        return status === 'completed' ? <Check className="h-5 w-5" /> : <Clock className="h-5 w-5" />;
      case "contract":
        return status === 'completed' ? <FileSignature className="h-5 w-5" /> : <FileSignature className="h-5 w-5" />;
      case "accommodation_letter":
        return status === 'completed' ? <FileCheck className="h-5 w-5" /> : <FileSearch className="h-5 w-5" />;
      case "confirmation":
        return status === 'completed' ? <Check className="h-5 w-5" /> : <Clock className="h-5 w-5" />;
      default:
        return status === 'completed' ? <Check className="h-5 w-5" /> : 
               status === 'in_progress' ? <Clock className="h-5 w-5" /> : 
               <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStepColorClass = (status: ReservationStepStatus) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800';
      case 'in_progress':
        return 'text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800';
      case 'pending':
      default:
        return 'text-gray-400 bg-gray-50 border-gray-200 dark:bg-gray-950/30 dark:border-gray-800';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">Progresso da sua reserva</h3>
        <span className="text-sm font-medium">{progressPercentage}% Completo</span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="grid gap-2 mt-4">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`flex items-center p-3 border rounded-md ${getStepColorClass(step.status)}`}
          >
            <div className="mr-3">
              {getStepIcon(step.id, step.status)}
            </div>
            <div>
              <span className="font-medium">{step.label}</span>
              {step.description && (
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationStatusChecklist;
