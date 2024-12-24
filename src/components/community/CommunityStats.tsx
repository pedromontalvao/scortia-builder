import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageCircle, Star, Activity } from "lucide-react";

interface CommunityStatsProps {
  stats?: {
    totalMembers: number;
    activeDiscussions: number;
    totalReviews: number;
    onlineNow: number;
  };
  isLoading: boolean;
}

export const CommunityStats = ({ stats, isLoading }: CommunityStatsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white/50">
            <CardContent className="h-24" />
          </Card>
        ))}
      </div>
    );
  }

  const statItems = [
    {
      label: "Membros",
      value: stats?.totalMembers || 0,
      icon: Users,
      color: "text-purple-500"
    },
    {
      label: "Discussões Ativas",
      value: stats?.activeDiscussions || 0,
      icon: MessageCircle,
      color: "text-pink-500"
    },
    {
      label: "Avaliações",
      value: stats?.totalReviews || 0,
      icon: Star,
      color: "text-yellow-500"
    },
    {
      label: "Online Agora",
      value: stats?.onlineNow || 0,
      icon: Activity,
      color: "text-green-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <Card key={index} className="bg-white/50 hover:bg-white/80 transition-colors">
          <CardContent className="flex items-center p-6">
            <item.icon className={`h-8 w-8 ${item.color}`} />
            <div className="ml-4">
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="text-2xl font-bold">{item.value.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};