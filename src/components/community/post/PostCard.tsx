import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostActions } from "./PostActions";
import { useToast } from "@/hooks/use-toast";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
    };
    category: string;
    likes: number;
    replies: number;
    created_at: string;
    is_pinned: boolean;
    images?: string[];
    isLiked?: boolean;
  };
}

export const PostCard = ({ post }: PostCardProps) => {
  const { toast } = useToast();

  const handleLike = () => {
    toast({
      title: "Curtido!",
      description: "Você curtiu esta publicação.",
    });
  };

  const handleComment = () => {
    toast({
      title: "Comentários",
      description: "Em breve você poderá comentar nesta publicação.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para sua área de transferência.",
    });
  };

  const handleReport = () => {
    toast({
      title: "Denúncia enviada",
      description: "Nossa equipe de moderação irá analisar o conteúdo.",
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
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Badge variant="outline">{post.category}</Badge>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-700">{post.content}</p>
          
          {post.images && post.images.length > 0 && (
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
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onReport={handleReport}
          />
        </div>
      </CardContent>
    </Card>
  );
};