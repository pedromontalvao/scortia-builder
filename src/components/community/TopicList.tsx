import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ThumbsUp, ThumbsDown, MessageCircle, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Topic {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  votes: number;
  replies: number;
  created_at: string;
  is_pinned: boolean;
}

export const TopicList = () => {
  const { toast } = useToast();
  
  const { data: topics, isLoading } = useQuery({
    queryKey: ['community-topics'],
    queryFn: async () => {
      console.log('Fetching community topics...');
      if (import.meta.env.DEV) {
        return [
          {
            id: 1,
            title: "Dicas de segurança para encontros",
            content: "Compartilhem suas experiências e dicas...",
            author: "Maria Silva",
            category: "Segurança",
            votes: 42,
            replies: 15,
            created_at: "2024-03-20T10:30:00Z",
            is_pinned: true
          },
          {
            id: 2,
            title: "Melhores regiões em São Paulo",
            content: "Quais são as regiões mais seguras...",
            author: "João Santos",
            category: "Localização",
            votes: 38,
            replies: 23,
            created_at: "2024-03-19T15:45:00Z",
            is_pinned: false
          }
        ];
      }

      const { data, error } = await supabase
        .from('community_topics')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleVote = (topicId: number, type: 'up' | 'down') => {
    toast({
      title: "Voto registrado",
      description: "Obrigado por participar da comunidade!",
    });
  };

  const handleReport = (topicId: number) => {
    toast({
      title: "Conteúdo reportado",
      description: "Nossa equipe de moderação irá analisar o conteúdo.",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white/50">
            <CardContent className="h-32" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics?.map((topic) => (
        <Card 
          key={topic.id} 
          className={`bg-white/50 hover:bg-white/80 transition-colors ${
            topic.is_pinned ? 'border-2 border-purple-500' : ''
          }`}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {topic.is_pinned && (
                    <Badge variant="secondary" className="mr-2">
                      Fixado
                    </Badge>
                  )}
                  {topic.title}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Badge variant="outline">{topic.category}</Badge>
                  <span>por {topic.author}</span>
                  <span>•</span>
                  <span>{new Date(topic.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{topic.content}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(topic.id, 'up')}
                  className="text-green-600"
                >
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {topic.votes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleVote(topic.id, 'down')}
                  className="text-red-600"
                >
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                {topic.replies} respostas
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReport(topic.id)}
                className="ml-auto text-gray-500"
              >
                <Flag className="w-4 h-4" />
                Reportar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};