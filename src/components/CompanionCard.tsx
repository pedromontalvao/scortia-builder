import { Star, MapPin, Crown, Shield, Heart } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

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
  const [isFavorite, setIsFavorite] = useState(false);
  const locationString = [neighborhood, city, state].filter(Boolean).join(", ");
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Load favorite state from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

  // Save favorite state to localStorage
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((favId: string) => favId !== id)
      : [...favorites, id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <Link to={`/acompanhante/${id}`}>
        <Card 
          className="group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className={`object-cover w-full h-full transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
              <div className="flex gap-2">
                {isPremium && (
                  <Badge className="bg-yellow-500/90 backdrop-blur-sm animate-fade-in">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Badge>
                )}
                {isVerified && (
                  <Badge className="bg-green-500/90 backdrop-blur-sm animate-fade-in">
                    <Shield className="w-4 h-4 mr-1" />
                    Verificada
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className={`text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 ${
                  isFavorite ? 'bg-pink-500/50 hover:bg-pink-500/70' : ''
                }`}
                onClick={toggleFavorite}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold group-hover:text-pink-600 transition-colors">
                {name}
              </h3>
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
                <Badge 
                  key={service} 
                  variant="secondary" 
                  className="text-xs bg-pink-50 text-pink-700 group-hover:bg-pink-100 transition-colors"
                >
                  {service}
                </Badge>
              ))}
              {services.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-pink-50 text-pink-700 group-hover:bg-pink-100 transition-colors"
                >
                  +{services.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">A partir de</p>
                  <p className="text-lg font-semibold text-pink-600">
                    R$ {price}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className="bg-pink-50 text-pink-700 group-hover:bg-pink-100 transition-colors"
                >
                  Ver perfil
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};