import { MessageSquare, Crown, Heart, Share2, Star, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  whatsapp?: string;
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
  whatsapp,
}: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: name,
        text: description,
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Erro ao compartilhar",
        description: "Não foi possível compartilhar o perfil.",
        variant: "destructive"
      });
    }
  };

  const handleWhatsAppClick = () => {
    if (!whatsapp) {
      toast({
        title: "WhatsApp indisponível",
        description: "Número de WhatsApp não disponível no momento.",
        variant: "destructive"
      });
      return;
    }

    const message = `Olá ${name}, vi seu perfil no site e gostaria de mais informações.`;
    const whatsappUrl = `https://wa.me/55${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="relative min-h-[60vh] md:min-h-[70vh] bg-gradient-to-r from-purple-900 to-pink-900">
      <div className="absolute inset-0 bg-black/40">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover mix-blend-overlay animate-fade-in" 
        />
        <div className="container mx-auto px-4 h-full relative">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between pt-6">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 backdrop-blur-sm animate-fade-in animation-delay-200" 
                onClick={() => navigate(-1)}
              >
                Voltar
              </Button>
              <div className="flex gap-2 animate-fade-in animation-delay-300">
                <Button 
                  variant="ghost" 
                  className={`text-white hover:bg-white/20 backdrop-blur-sm ${isLiked ? 'text-pink-500' : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current animate-scale-in' : ''}`} />
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-auto pb-6 text-white animate-fade-in animation-delay-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
                    <div className="flex flex-wrap gap-2">
                      {isPremium && (
                        <Badge className="bg-yellow-500/90 backdrop-blur-sm animate-scale-in">
                          <Crown className="w-4 h-4 mr-1" />
                          Premium
                        </Badge>
                      )}
                      {isVerified && (
                        <Badge className="bg-green-500/90 backdrop-blur-sm animate-scale-in">
                          <Shield className="w-4 h-4 mr-1" />
                          Verificada
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-200 max-w-2xl text-sm md:text-base">{description}</p>
                </div>
                
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white animate-scale-in animation-delay-500 hover:scale-105 transition-transform"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chamar no WhatsApp
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm md:text-base mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {rating} ({reviews} avaliações)
                </div>
                <div>{experience}</div>
                <div>{location}</div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {messages} mensagens
                </div>
                <div>{views} visualizações</div>
                <div>{likes} curtidas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};