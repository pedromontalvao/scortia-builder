import { MessageSquare, Crown, Heart, Share2, Star, Shield, Eye, Flag, AlertTriangle, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    <div className="relative min-h-[40vh] md:min-h-[50vh]">
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70" />
      </div>
      
      <div className="container mx-auto px-4 h-full relative">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between pt-6">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 backdrop-blur-sm" 
              onClick={() => navigate(-1)}
            >
              Voltar
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                className={`text-white hover:bg-white/20 backdrop-blur-sm ${isLiked ? 'text-pink-500' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    <Flag className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Denunciar Perfil</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja denunciar este perfil? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                      toast({
                        title: "Denúncia enviada",
                        description: "Sua denúncia foi enviada e será analisada pela nossa equipe.",
                      });
                    }}>
                      Denunciar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          <div className="mt-auto pb-6 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-4">
              <div className="space-y-4 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold">{name}</h1>
                  <div className="flex flex-wrap gap-2">
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
                
                <p className="text-gray-200 text-sm md:text-base">{description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {rating} ({reviews} avaliações)
                  </div>
                  <div>{experience}</div>
                  <div>{location}</div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {views} visualizações hoje
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {messages} mensagens
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {likes} curtidas
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <Button 
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chamar no WhatsApp
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/20 backdrop-blur-sm w-full md:w-auto"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Isenção de Responsabilidade
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Isenção de Responsabilidade</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-2">
                        <p>Este site atua apenas como um diretório de anúncios e não se responsabiliza pelo conteúdo, veracidade ou serviços oferecidos nos anúncios.</p>
                        <p>Todas as informações são de responsabilidade exclusiva dos anunciantes.</p>
                        <p>Recomendamos que você:</p>
                        <ul className="list-disc pl-4">
                          <li>Verifique a identidade da pessoa</li>
                          <li>Não envie dinheiro antecipadamente</li>
                          <li>Encontre-se apenas em locais seguros</li>
                          <li>Informe a alguém de confiança sobre seu encontro</li>
                        </ul>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>Entendi</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};