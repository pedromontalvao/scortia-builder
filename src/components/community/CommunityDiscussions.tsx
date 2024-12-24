import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const CommunityDiscussions = () => {
  const { data: discussions, isLoading } = useQuery({
    queryKey: ['community-discussions'],
    queryFn: async () => {
      console.log('Fetching community discussions...');
      if (import.meta.env.DEV) {
        return [
          {
            id: 1,
            title: "Dicas de segurança para encontros",
            author: "Maria Silva",
            replies: 24,
            lastActivity: "2024-03-20T10:30:00Z"
          },
          {
            id: 2,
            title: "Melhores regiões em São Paulo",
            author: "João Santos",
            replies: 15,
            lastActivity: "2024-03-19T15:45:00Z"
          }
        ];
      }

      const { data, error } = await supabase
        .from('community_discussions')
        .select('*')
        .order('last_activity', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white/50">
            <CardContent className="h-24" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {discussions?.map((discussion) => (
        <Card key={discussion.id} className="bg-white/50 hover:bg-white/80 transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="text-lg">{discussion.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Por: {discussion.author}</span>
              <span>{discussion.replies} respostas</span>
              <span>Última atividade: {new Date(discussion.lastActivity).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};