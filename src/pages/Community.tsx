import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityDiscussions } from "@/components/community/CommunityDiscussions";
import { CommunityReviews } from "@/components/community/CommunityReviews";
import { CommunityStats } from "@/components/community/CommunityStats";

export const Community = () => {
  const [activeTab, setActiveTab] = useState("discussions");

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
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Comunidade VivAcompanhantes
        </h1>

        <CommunityStats stats={stats} isLoading={isLoadingStats} />

        <Tabs defaultValue={activeTab} className="mt-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="discussions">Discussões</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions">
            <CommunityDiscussions />
          </TabsContent>

          <TabsContent value="reviews">
            <CommunityReviews />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};