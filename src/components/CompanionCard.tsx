import { Star, MapPin, Crown, Shield } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

interface CompanionCardProps {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  services: string[];
  imageUrl: string;
  isPremium?: boolean;
  isVerified?: boolean;
  neighborhood?: string;
  city?: string;
  state?: string;
}

export const CompanionCard = ({
  id,
  name,
  rating,
  reviews,
  price,
  services,
  imageUrl,
  isPremium,
  isVerified,
  neighborhood,
  city,
  state
}: CompanionCardProps) => {
  const locationString = [neighborhood, city, state].filter(Boolean).join(", ");

  return (
    <Link to={`/acompanhante/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
            {isPremium && (
              <Badge className="bg-yellow-500/90 backdrop-blur-sm">
                <Crown className="w-4 h-4 mr-1" />
                Premium
              </Badge>
            )}
            {isVerified && (
              <Badge className="bg-green-500/90 backdrop-blur-sm">
                <Shield className="w-4 h-4 mr-1" />
                Verificada
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating}</span>
              <span className="text-gray-500">({reviews})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{locationString}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {services.slice(0, 3).map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {services.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{services.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">A partir de</p>
                <p className="text-lg font-semibold text-pink-500">
                  R$ {price}
                </p>
              </div>
              <Badge variant="outline" className="bg-pink-50">
                Ver perfil
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};