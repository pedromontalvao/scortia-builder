import { Star, MapPin, Crown, Shield, Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const locationString = [neighborhood, city, state].filter(Boolean).join(", ");

  return (
    <Link to={`/acompanhante/${id}`}>
      <Card 
        className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className={`object-cover w-full h-full transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
            <div className="flex gap-2">
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
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={(e) => {
                e.preventDefault();
                // Add to favorites logic here
              }}
            >
              <Heart className="w-5 h-5" />
            </Button>
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
              <Badge variant="outline" className="bg-pink-50 group-hover:bg-pink-100 transition-colors">
                Ver perfil
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};