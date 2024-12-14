import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin } from "lucide-react";

interface LocationInfoProps {
  location: string;
  serviceAreas: string[];
}

export const LocationInfo = ({ location, serviceAreas }: LocationInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-pink-500" />
          <h2 className="text-xl font-semibold">Localização</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-500">Local</p>
          <p className="font-medium">{location}</p>
        </div>
        
        <div>
          <p className="text-gray-500 mb-2">Áreas de Atendimento</p>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <Badge key={area} variant="secondary">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};