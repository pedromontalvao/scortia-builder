import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const weekDays = [
  "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
];

interface AvailabilityFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export const AvailabilityForm = ({ initialData, onSave }: AvailabilityFormProps) => {
  const [availability, setAvailability] = useState<{[key: string]: {start: string, end: string}}>(
    initialData?.availability || weekDays.reduce((acc, day) => ({...acc, [day]: {start: "", end: ""}}), {})
  );

  const handleSubmit = () => {
    onSave({ availability });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Horários de Atendimento</h3>
      {weekDays.map((day) => (
        <div key={day} className="grid grid-cols-3 gap-4 items-center">
          <Label>{day}</Label>
          <div>
            <Input
              type="time"
              value={availability[day].start}
              onChange={(e) => setAvailability({
                ...availability,
                [day]: { ...availability[day], start: e.target.value }
              })}
            />
          </div>
          <div>
            <Input
              type="time"
              value={availability[day].end}
              onChange={(e) => setAvailability({
                ...availability,
                [day]: { ...availability[day], end: e.target.value }
              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
};