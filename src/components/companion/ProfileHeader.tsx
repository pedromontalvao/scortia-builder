import { ArrowLeft, Crown, Heart, Share2, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ProfileHeaderProps {
  name: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  views: number;
  likes: number;
  messages: number;
  price: number;
  isPremium: boolean;
  isVerified: boolean;
  imageUrl: string;
  onBack: () => void;
}

export const ProfileHeader = ({
  name,
  description,
  location,
  rating,
  reviews,
  experience,
  views,
  likes,
  messages,
  price,
  isPremium,
  isVerified,
  imageUrl,
  onBack
}: ProfileHeaderProps) => {
  return (
    <div className="relative h-[60vh] bg-gradient-to-r from-purple-900 to-pink-900">
      <div className="absolute inset-0 bg-black/40">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover mix-blend-overlay" />
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-start justify-between pt-6">
            <Button variant="ghost" className="text-white" onClick={onBack}>
              <ArrowLeft className="mr-2" />
              Voltar
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-white">
                <Heart className="mr-2" />
                Favoritar
              </Button>
              <Button variant="ghost" className="text-white">
                <Share2 className="mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-4xl font-bold">{name}</h1>
              {isPremium && (
                <Badge className="bg-yellow-500">
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </Badge>
              )}
              {isVerified && (
                <Badge className="bg-green-500">
                  Verificada
                </Badge>
              )}
            </div>
            
            <p className="text-gray-200 mb-4 max-w-2xl">{description}</p>
            
            <div className="flex items-center gap-4 text-gray-200">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {rating} ({reviews} avaliações)
              </div>
              <div>{experience}</div>
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm text-gray-300">
              <div>{views} visualizações</div>
              <div>{likes} curtidas</div>
              <div>{messages} mensagens</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};