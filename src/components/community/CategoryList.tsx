import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface Category {
  id: number;
  name: string;
  icon: string;
  topic_count: number;
}

export const CategoryList = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['community-categories'],
    queryFn: async () => {
      console.log('Fetching community categories...');
      if (import.meta.env.DEV) {
        return [
          { id: 1, name: "Segurança", icon: "🛡️", topic_count: 45 },
          { id: 2, name: "Localização", icon: "📍", topic_count: 32 },
          { id: 3, name: "Experiências", icon: "💭", topic_count: 78 },
          { id: 4, name: "Dúvidas", icon: "❓", topic_count: 56 },
          { id: 5, name: "Eventos", icon: "📅", topic_count: 23 },
        ];
      }

      const { data, error } = await supabase
        .from('community_categories')
        .select('*')
        .order('topic_count', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex gap-2 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 w-32 bg-gray-200 rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 pb-4">
        <Button variant="outline" className="whitespace-nowrap">
          🌟 Todos
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="whitespace-nowrap"
          >
            {category.icon} {category.name} ({category.topic_count})
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};