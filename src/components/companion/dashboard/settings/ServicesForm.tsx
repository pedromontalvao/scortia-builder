import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const services = [
  "Oral", "Anal", "BDSM", "Tratamento de namorados", "Atriz porno",
  "Ejaculação corporal", "Massagem erótica", "Massagem tântrica",
  "Fetiches", "Beijo francês", "Jogos de interpretação", "Trio",
  "Sexting", "Videochamada"
];

const serviceFor = ["Homens", "Mulheres", "Casais", "Pessoas com deficiência"];

const locations = [
  "Em casa", "Eventos e festas", "Hotel / Motel", "Clubes", "Sem ligação"
];

interface ServicesFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export const ServicesForm = ({ initialData, onSave }: ServicesFormProps) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(initialData?.services || []);
  const [selectedServiceFor, setSelectedServiceFor] = useState<string[]>(initialData?.service_for || []);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialData?.service_locations || []);

  const handleSubmit = () => {
    onSave({
      services: selectedServices,
      service_for: selectedServiceFor,
      service_locations: selectedLocations
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Serviços Oferecidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={selectedServices.includes(service)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedServices([...selectedServices, service]);
                  } else {
                    setSelectedServices(selectedServices.filter(s => s !== service));
                  }
                }}
              />
              <label htmlFor={service}>{service}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Atende</h3>
        <div className="grid grid-cols-2 gap-4">
          {serviceFor.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedServiceFor.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedServiceFor([...selectedServiceFor, type]);
                  } else {
                    setSelectedServiceFor(selectedServiceFor.filter(t => t !== type));
                  }
                }}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Local de Atendimento</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={location}
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedLocations([...selectedLocations, location]);
                  } else {
                    setSelectedLocations(selectedLocations.filter(l => l !== location));
                  }
                }}
              />
              <label htmlFor={location}>{location}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};