import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const CommunityReviews = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['community-reviews'],
    queryFn: async () => {
      console.log('Fetching community reviews...');
      if (import.meta.env.DEV) {
        return [
          {
            id: 1,
            author: "Cliente Anônimo",
            rating: 5,
            comment: "Excelente atendimento, muito profissional e educada.",
            companionName: "Ana Silva",
            date: "2024-03-20T10:30:00Z"
          },
          {
            id: 2,
            author: "Cliente Verificado",
            rating: 4,
            comment: "Ótima experiência, recomendo!",
            companionName: "Julia Santos",
            date: "2024-03-19T15:45:00Z"
          }
        ];
      }

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

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
      {reviews?.map((review) => (
        <Card key={review.id} className="bg-white/50 hover:bg-white/80 transition-colors">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{review.companionName}</CardTitle>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{review.author}</span>
              <span>{new Date(review.date).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};