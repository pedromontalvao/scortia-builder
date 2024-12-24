import { Card, CardContent } from "../ui/card";
import { Star, MessageSquare } from "lucide-react";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="text-pink-500" />
          <h2 className="text-xl font-semibold">Avaliações</h2>
        </div>
        
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{review.user}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{review.comment}</p>
              <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};