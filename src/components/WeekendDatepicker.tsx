
import * as React from "react";
import { format, isWeekend } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface WeekendDatepickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label: string;
  placeholder?: string;
}

export function WeekendDatepicker({ 
  date, 
  onDateChange, 
  label,
  placeholder = "Selecione uma data"
}: WeekendDatepickerProps) {
  // Function to disable weekdays
  const disableWeekdays = (date: Date) => {
    return !isWeekend(date);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && !isWeekend(selectedDate)) {
      toast.error("Por favor, selecione apenas datas de sábado ou domingo.");
      return;
    }
    onDateChange(selectedDate);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <label htmlFor="date" className="text-sm font-medium text-neutrals-dark dark:text-white">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={disableWeekdays}
            initialFocus
            className="pointer-events-auto"
          />
          <div className="p-3 border-t border-border bg-muted/20">
            <p className="text-xs text-muted-foreground">
              Apenas sábados e domingos estão disponíveis para check-in/check-out
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
