import { Star, MapPin, Crown } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

interface CompanionCardProps {
  id: string;
  name: string;
  location: string;
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
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {isPremium && (
            <Badge className="absolute top-2 right-2 bg-yellow-500">
              <Crown className="w-4 h-4 mr-1" />
              Premium
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>{rating}</span>
              <span className="text-gray-500">({reviews})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{locationString}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {services.map((service) => (
              <Badge key={service} variant="secondary">
                {service}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">A partir de</p>
              <p className="text-lg font-semibold text-pink-500">
                R$ {price}
              </p>
            </div>
            {isVerified && (
              <Badge className="bg-green-500">
                Verificada
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};