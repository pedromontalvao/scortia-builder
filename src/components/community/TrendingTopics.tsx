import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, MessageCircle, ThumbsUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const TrendingTopics = () => {
  const { data: trendingTopics, isLoading } = useQuery({
    queryKey: ['trending-topics'],
    queryFn: async () => {
      console.log('Fetching trending topics...');
      if (import.meta.env.DEV) {
        return [
          {
            id: 1,
            title: "Dicas de segurança essenciais",
            engagement: 156,
            replies: 45,
          },
          {
            id: 2,
            title: "Melhores regiões em SP",
            engagement: 132,
            replies: 38,
          },
          {
            id: 3,
            title: "Como lidar com clientes difíceis",
            engagement: 98,
            replies: 27,
          }
        ];
      }

      const { data, error } = await supabase
        .from('trending_topics')
        .select('*')
        .order('engagement', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          Em Alta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendingTopics?.map((topic) => (
          <div
            key={topic.id}
            className="p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors cursor-pointer"
          >
            <h3 className="font-medium mb-2">{topic.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {topic.engagement}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {topic.replies}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};