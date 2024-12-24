import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Users, MessageCircle } from "lucide-react";
import { CommunityStats } from "@/components/community/CommunityStats";
import { TopicList } from "@/components/community/TopicList";
import { CategoryList } from "@/components/community/CategoryList";
import { CommunityReviews } from "@/components/community/CommunityReviews";
import { TrendingTopics } from "@/components/community/TrendingTopics";
import { CreatePostDialog } from "@/components/community/CreatePostDialog";
import { useToast } from "@/hooks/use-toast";
import { CommunityRules } from "@/components/community/CommunityRules";
import { CommunityDiscussions } from "@/components/community/CommunityDiscussions";

export const Community = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['community-stats'],
    queryFn: async () => {
      console.log('Fetching community stats...');
      if (import.meta.env.DEV) {
        return {
          totalMembers: 1250,
          activeDiscussions: 45,
          totalReviews: 892,
          onlineNow: 78,
          topContributors: 25,
          weeklyGrowth: 15
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

  const handleCreatePost = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para criar uma publicação.",
        variant: "destructive"
      });
      return;
    }
    setIsCreatePostOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Comunidade VivAcompanhantes
          </h1>
          <Button onClick={handleCreatePost} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Publicação
          </Button>
        </div>

        <CommunityStats stats={stats} isLoading={isLoadingStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-8">
            <Card className="bg-white/50">
              <CardContent className="p-6">
                <CategoryList />
              </CardContent>
            </Card>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="discussions">Discussões</TabsTrigger>
                <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="mt-6">
                <TopicList />
              </TabsContent>

              <TabsContent value="discussions" className="mt-6">
                <CommunityDiscussions />
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <CommunityReviews />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <CommunityRules />
            <TrendingTopics />
          </div>
        </div>
      </div>

      <CreatePostDialog 
        open={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen}
      />
    </div>
  );
};