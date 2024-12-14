import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const availableServices = [
  "Massagem tântrica",
  "Massagem relaxante",
  "Jantar",
  "Pernoite",
  "Viagens",
  "Eventos",
  "Fetiches",
  "Fantasias",
  "Dominação",
  "Inversão"
];

const serviceLocations = [
  "Local próprio",
  "Motel",
  "Hotel",
  "Residência",
  "Eventos"
];

interface ServicesFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const ServicesForm = ({ data, onUpdate }: ServicesFormProps) => {
  const selectedServices = data.services || [];
  const selectedLocations = data.service_locations || [];

  const handleServiceToggle = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter(s => s !== service)
      : [...selectedServices, service];
    
    onUpdate({
      ...data,
      services: updated
    });
  };

  const handleLocationToggle = (location: string) => {
    const updated = selectedLocations.includes(location)
      ? selectedLocations.filter(l => l !== location)
      : [...selectedLocations, location];
    
    onUpdate({
      ...data,
      service_locations: updated
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Serviços Oferecidos</h3>
        <div className="grid grid-cols-2 gap-4">
          {availableServices.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={selectedServices.includes(service)}
                onCheckedChange={() => handleServiceToggle(service)}
              />
              <label htmlFor={service}>{service}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Local de Atendimento</h3>
        <div className="grid grid-cols-2 gap-4">
          {serviceLocations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={location}
                checked={selectedLocations.includes(location)}
                onCheckedChange={() => handleLocationToggle(location)}
              />
              <label htmlFor={location}>{location}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};