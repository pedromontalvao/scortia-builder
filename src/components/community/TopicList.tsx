import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PostCard } from "./post/PostCard";

export const TopicList = () => {
  const { data: topics, isLoading } = useQuery({
    queryKey: ['community-topics'],
    queryFn: async () => {
      console.log('Fetching community topics...');
      if (import.meta.env.DEV) {
        return [
          {
            id: 1,
            title: "Dicas de segurança para encontros",
            content: "Compartilhem suas experiências e dicas de segurança para encontros. É importante mantermos nossa comunidade segura!",
            author: {
              name: "Maria Silva",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
            },
            category: "Segurança",
            likes: 42,
            replies: 15,
            created_at: "2024-03-20T10:30:00Z",
            is_pinned: true,
            images: [],
            isLiked: false
          },
          {
            id: 2,
            title: "Melhores regiões em São Paulo",
            content: "Quais são as regiões mais seguras e com melhor infraestrutura em São Paulo? Compartilhem suas experiências!",
            author: {
              name: "João Santos",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao"
            },
            category: "Localização",
            likes: 38,
            replies: 23,
            created_at: "2024-03-19T15:45:00Z",
            is_pinned: false,
            images: ["https://picsum.photos/seed/sp1/800/600", "https://picsum.photos/seed/sp2/800/600"],
            isLiked: true
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
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {topics?.map((topic) => (
        <PostCard key={topic.id} post={topic} />
      ))}
    </div>
  );
};