import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Heart, Crown, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface CommunityPost {
  id: string;
  content: string;
  likes: number;
  comments: number;
  created_at: string;
  is_premium?: boolean;
}

interface CommunityProfileProps {
  userId: string;
  posts: CommunityPost[];
  followers: number;
  following: number;
  subscriptionPrice?: number;
  hasActiveSubscription?: boolean;
}

export const CommunityProfile = ({
  userId,
  posts,
  followers,
  following,
  subscriptionPrice = 49.90,
  hasActiveSubscription = false
}: CommunityProfileProps) => {
  const { toast } = useToast();

  const handleSubscribe = () => {
    toast({
      title: "Assinatura",
      description: "Em breve você será redirecionado para o pagamento.",
    });
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-purple-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Perfil na Comunidade</span>
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/comunidade/perfil/${userId}`}>Ver mais</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-purple-600">{posts.length}</p>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-purple-600">{followers}</p>
            <p className="text-sm text-gray-500">Seguidores</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-semibold text-purple-600">{following}</p>
            <p className="text-sm text-gray-500">Seguindo</p>
          </div>
        </div>

        {!hasActiveSubscription && (
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5" />
                <h3 className="font-semibold">Conteúdo Exclusivo</h3>
              </div>
              <p className="text-sm mb-4">
                Assine para ter acesso a fotos e vídeos exclusivos, além de chat privado!
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">
                  R$ {subscriptionPrice.toFixed(2)}/mês
                </span>
                <Button 
                  variant="secondary" 
                  className="bg-white text-purple-600 hover:bg-purple-50"
                  onClick={handleSubscribe}
                >
                  Assinar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg bg-white border border-purple-100 hover:border-purple-200 transition-colors relative"
            >
              {post.is_premium && !hasActiveSubscription && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Lock className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Conteúdo exclusivo para assinantes</p>
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {post.content}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  {post.comments}
                </div>
                {post.is_premium && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {posts.length > 3 && (
          <Button
            variant="outline"
            className="w-full mt-4 border-purple-200 hover:bg-purple-50"
            asChild
          >
            <Link to={`/comunidade/perfil/${userId}`}>
              Ver todos os posts
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};