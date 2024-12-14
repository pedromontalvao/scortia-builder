import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, Mail, Phone } from "lucide-react";

interface ContactInfoProps {
  whatsapp: string;
  email: string;
  schedule: {
    weekdays: string;
    saturday: string;
  };
  onContact: () => void;
}

export const ContactInfo = ({ whatsapp, email, schedule, onContact }: ContactInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="text-pink-500" />
          <h2 className="text-xl font-semibold">Contato</h2>
        </div>
        
        <div className="space-y-4 mb-6">
          <div>
            <p className="text-gray-500">WhatsApp</p>
            <p className="font-medium">{whatsapp}</p>
          </div>
          
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{email}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-gray-500" />
            <p className="font-medium">Horários de Atendimento</p>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-gray-500">Segunda a Sexta</p>
              <p>{schedule.weekdays}</p>
            </div>
            <div>
              <p className="text-gray-500">Sábado</p>
              <p>{schedule.saturday}</p>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-pink-500 hover:bg-pink-600"
          onClick={onContact}
        >
          Agendar Agora
        </Button>
      </CardContent>
    </Card>
  );
};