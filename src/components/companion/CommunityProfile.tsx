import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface CommunityPost {
  id: string;
  content: string;
  likes: number;
  comments: number;
  created_at: string;
}

interface CommunityProfileProps {
  userId: string;
  posts: CommunityPost[];
  followers: number;
  following: number;
}

export const CommunityProfile = ({
  userId,
  posts,
  followers,
  following
}: CommunityProfileProps) => {
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

        <div className="space-y-4">
          {posts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg bg-white border border-purple-100 hover:border-purple-200 transition-colors"
            >
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