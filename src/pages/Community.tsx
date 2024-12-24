import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CommunityStats } from "@/components/community/CommunityStats";
import { TopicList } from "@/components/community/TopicList";
import { CategoryList } from "@/components/community/CategoryList";
import { CommunityReviews } from "@/components/community/CommunityReviews";

export const Community = () => {
  const [activeTab, setActiveTab] = useState("forum");

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['community-stats'],
    queryFn: async () => {
      console.log('Fetching community stats...');
      if (import.meta.env.DEV) {
        return {
          totalMembers: 1250,
          activeDiscussions: 45,
          totalReviews: 892,
          onlineNow: 78
        };
      }

      const { data, error } = await supabase
        .from('community_stats')
        .select('*')
        .single();

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Comunidade VivAcompanhantes
          </h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Criar Tópico
          </Button>
        </div>

        <CommunityStats stats={stats} isLoading={isLoadingStats} />

        <Card className="mt-8">
          <CardContent className="p-6">
            <CategoryList />
          </CardContent>
        </Card>

        <Tabs defaultValue={activeTab} className="mt-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forum">Fórum</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="mt-6">
            <TopicList />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <CommunityReviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};