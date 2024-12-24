import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, MessageCircle, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
          },
          {
            id: 2,
            title: "Melhores regiões em SP",
            engagement: 132,
            author: "Ana Santos",
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
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            Em Alta na Comunidade
          </span>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/comunidade')}
            className="text-purple-600 hover:text-purple-700"
          >
            Ver mais
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingTopics?.map((topic) => (
          <Card 
            key={topic.id}
            className="bg-white/80 hover:bg-white transition-colors cursor-pointer"
            onClick={() => navigate('/comunidade')}
          >
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900">{topic.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {topic.author}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {topic.engagement} interações
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};