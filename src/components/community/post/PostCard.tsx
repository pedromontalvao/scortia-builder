import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostActions } from "./PostActions";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
      isVerified?: boolean;
      hasSubscriptionContent?: boolean;
    };
    category: string;
    likes: number;
    replies: number;
    created_at: string;
    is_pinned: boolean;
    images?: string[];
    isLiked?: boolean;
    isSubscriptionContent?: boolean;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleSubscribe = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para assinar conteúdo exclusivo.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Assinatura",
      description: "Em breve você poderá assinar conteúdo exclusivo!",
    });
  };

  return (
    <Card className="bg-white/50 hover:bg-white/80 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {post.is_pinned && (
                  <Badge variant="secondary" className="mr-2">
                    Fixado
                  </Badge>
                )}
                {post.author.name}
                {post.author.isVerified && (
                  <Badge variant="success" className="ml-2">
                    Verificada
                  </Badge>
                )}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Badge variant="outline">{post.category}</Badge>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          {post.author.hasSubscriptionContent && (
            <Button onClick={handleSubscribe} variant="outline" size="sm">
              <Lock className="w-4 h-4 mr-2" />
              Assinar Conteúdo
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{post.content}</p>
          
          {post.isSubscriptionContent ? (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <Lock className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">Este é um conteúdo exclusivo para assinantes</p>
              <Button onClick={handleSubscribe} className="mt-2">
                Assinar para ver
              </Button>
            </div>
          ) : post.images && post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <PostActions
            postId={post.id}
            likes={post.likes}
            replies={post.replies}
            isLiked={post.isLiked}
            onLike={() => {
              if (!isLoggedIn) {
                toast({
                  title: "Login necessário",
                  description: "Você precisa estar logado para curtir publicações.",
                  variant: "destructive"
                });
                return;
              }
              toast({
                title: "Curtido!",
                description: "Você curtiu esta publicação.",
              });
            }}
            onComment={() => {
              if (!isLoggedIn) {
                toast({
                  title: "Login necessário",
                  description: "Você precisa estar logado para comentar.",
                  variant: "destructive"
                });
                return;
              }
              toast({
                title: "Comentários",
                description: "Em breve você poderá comentar nesta publicação.",
              });
            }}
            onShare={() => {
              navigator.clipboard.writeText(window.location.href);
              toast({
                title: "Link copiado!",
                description: "O link foi copiado para sua área de transferência.",
              });
            }}
            onReport={() => {
              if (!isLoggedIn) {
                toast({
                  title: "Login necessário",
                  description: "Você precisa estar logado para denunciar conteúdo.",
                  variant: "destructive"
                });
                return;
              }
              toast({
                title: "Denúncia enviada",
                description: "Nossa equipe de moderação irá analisar o conteúdo.",
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};