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

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(id));
  }, [id]);

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
          className="group relative overflow-hidden rounded-xl transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 bg-gradient-to-b from-purple-50 to-white border-purple-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-xl">
            <img
              src={imageUrl}
              alt={name}
              className={`object-cover w-full h-full transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges container with glass effect */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start backdrop-blur-sm bg-gradient-to-b from-white/10 to-transparent">
              <div className="flex gap-2">
                {isPremium && (
                  <Badge className="bg-yellow-500/90 backdrop-blur-sm animate-fade-in shadow-lg">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Badge>
                )}
                {isVerified && (
                  <Badge className="bg-green-500/90 backdrop-blur-sm animate-fade-in shadow-lg">
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
                } shadow-lg`}
                onClick={toggleFavorite}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-purple-600 transition-all">
                {name}
              </h3>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-yellow-700">{rating}</span>
                <span className="text-yellow-600">({reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate text-sm">{locationString}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {services.slice(0, 3).map((service) => (
                <Badge 
                  key={service} 
                  variant="secondary" 
                  className="text-xs bg-purple-50 text-purple-700 group-hover:bg-purple-100 transition-colors"
                >
                  {service}
                </Badge>
              ))}
              {services.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-purple-50 text-purple-700 group-hover:bg-purple-100 transition-colors"
                >
                  +{services.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="pt-2 border-t border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">A partir de</p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    R$ {price}
                  </p>
                </div>
                <Badge 
                  variant="outline" 
                  className="bg-purple-50 text-purple-700 group-hover:bg-purple-100 transition-colors border-purple-200 hover:border-purple-300"
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