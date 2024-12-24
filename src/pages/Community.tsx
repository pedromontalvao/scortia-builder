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
import { GuestView } from "@/components/community/GuestView";

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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-12">
          <GuestView />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Comunidade VivAcompanhantes
          </h1>
          <Button 
            onClick={handleCreatePost} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 group"
          >
            <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Nova Publicação
          </Button>
        </div>

        <div className="mb-8">
          <CommunityStats stats={stats} isLoading={isLoadingStats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <CategoryList />
              </CardContent>
            </Card>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
                <TabsTrigger value="feed" className="data-[state=active]:bg-white">Feed</TabsTrigger>
                <TabsTrigger value="discussions" className="data-[state=active]:bg-white">Discussões</TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-white">Avaliações</TabsTrigger>
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
            <div className="sticky top-4">
              <CommunityRules />
              <div className="mt-8">
                <TrendingTopics />
              </div>
            </div>
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