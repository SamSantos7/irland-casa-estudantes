
import { Check, Clock, FileText, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export type ReservationStepStatus = 'completed' | 'in_progress' | 'pending';

interface ReservationStep {
  id: string;
  label: string;
  status: ReservationStepStatus;
}

interface ReservationProgressBarProps {
  steps: ReservationStep[];
  className?: string;
}

export const ReservationProgressBar = ({ steps, className = "" }: ReservationProgressBarProps) => {
  // Calculate completion percentage
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const getStepIcon = (status: ReservationStepStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'pending':
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
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
              {getStepIcon(step.status)}
            </div>
            <span className="font-medium">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationProgressBar;
