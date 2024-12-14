import { Badge } from "@/components/ui/badge";

const services = [
  "Oral",
  "Anal",
  "BDSM",
  "Tratamento de namorados",
  "Atriz porno",
  "Ejaculação corporal",
  "Massagem erótica",
  "Massagem tântrica",
  "Fetiches",
  "Beijo francês",
  "Jogos de interpretação",
  "Trio",
  "Sexting",
  "Videochamada"
];

interface ServiceFiltersProps {
  selectedServices: string[];
  onServiceChange: (service: string) => void;
}

export const ServiceFilters = ({ selectedServices, onServiceChange }: ServiceFiltersProps) => {
  return (
    <div>
      <p className="font-medium mb-2">Serviços</p>
      <div className="flex flex-wrap gap-2">
        {services.map((service) => (
          <Badge
            key={service}
            variant={selectedServices.includes(service) ? "default" : "outline"}
            className="cursor-pointer hover:bg-pink-50"
            onClick={() => onServiceChange(service)}
          >
            {service}
          </Badge>
        ))}
      </div>
    </div>
  );
};