import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, MessageCircle, Users, ArrowRight, ThumbsUp, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CommunityWidget = () => {
  const navigate = useNavigate();
  
  const { data: trendingTopics } = useQuery({
    queryKey: ['trending-topics-widget'],
    queryFn: async () => {
      console.log('Fetching trending topics for widget...');
      if (import.meta.env.DEV) {
        return [
          {
            id: 1,
            title: "Dicas de segurança essenciais",
            engagement: 156,
            author: "Maria Silva",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
            likes: 89,
            comments: 45,
            tags: ["Segurança", "Dicas"]
          },
          {
            id: 2,
            title: "Melhores regiões em SP",
            engagement: 132,
            author: "Ana Santos",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
            likes: 67,
            comments: 38,
            tags: ["São Paulo", "Localização"]
          }
        ];
      }

      const { data, error } = await supabase
        .from('trending_topics')
        .select('*')
        .order('engagement', { ascending: false })
        .limit(2);

      if (error) throw error;
      return data;
    }
  });

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-none shadow-lg overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Em Alta na Comunidade
            </span>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/comunidade')}
            className="text-purple-600 hover:text-purple-700 group"
          >
            Ver mais
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {trendingTopics?.map((topic) => (
            <Card 
              key={topic.id}
              className="bg-white/80 hover:bg-white transition-colors cursor-pointer group animate-fade-in mb-4"
              onClick={() => navigate('/comunidade')}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={topic.avatar} alt={topic.author} />
                    <AvatarFallback>{topic.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {topic.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {topic.tags?.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="bg-purple-100 text-purple-700 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {topic.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        {topic.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {topic.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};