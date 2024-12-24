import { ThumbsUp, ThumbsDown, MessageCircle, Flag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PostActionsProps {
  postId: number;
  likes: number;
  replies: number;
  isLiked?: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onReport: () => void;
}

export const PostActions = ({
  postId,
  likes,
  replies,
  isLiked,
  onLike,
  onComment,
  onShare,
  onReport
}: PostActionsProps) => {
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleAction = (action: () => void, requiresAuth: boolean = true) => {
    if (requiresAuth && !isLoggedIn) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para realizar esta ação.",
        variant: "destructive"
      });
      return;
    }
    action();
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleAction(onLike)}
          className={isLiked ? "text-blue-600" : "text-gray-600"}
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          {likes}
        </Button>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => handleAction(onComment)}
        className="text-gray-600"
      >
        <MessageCircle className="w-4 h-4 mr-1" />
        {replies} comentários
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleAction(onShare, false)}
        className="text-gray-600"
      >
        <Share2 className="w-4 h-4 mr-1" />
        Compartilhar
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleAction(onReport)}
        className="text-gray-600"
      >
        <Flag className="w-4 h-4" />
        Denunciar
      </Button>
    </div>
  );
};