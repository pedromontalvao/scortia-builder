import { Card, CardContent } from "../ui/card";
import { DollarSign, Clock } from "lucide-react";

interface Service {
  title: string;
  duration: string;
  price: number;
  description: string;
}

interface ServicesAndPricesProps {
  services: Service[];
}

export const ServicesAndPrices = ({ services }: ServicesAndPricesProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="text-pink-500" />
          <h2 className="text-xl font-semibold">Serviços e Valores</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{service.duration}</span>
              </div>
              <p className="text-2xl font-bold text-pink-500">
                R$ {service.price}
              </p>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};