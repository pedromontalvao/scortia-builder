import { useParams, useNavigate } from "react-router-dom";
import { useCompanionData } from "@/hooks/useCompanionData";
import { ProfileHeader } from "@/components/companion/ProfileHeader";
import { ProfileContent } from "@/components/companion/ProfileContent";
import { NotFoundState } from "@/components/companion/NotFoundState";
import { CommunityProfile } from "@/components/companion/CommunityProfile";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const CompanionProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: companion, isLoading, error } = useCompanionData(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (error || !companion) {
    return <NotFoundState />;
  }

  const primaryPhoto = companion.companion_photos?.find(photo => photo.is_primary)?.url || 
                      companion.companion_photos?.[0]?.url;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className="mb-4 hover:bg-purple-100 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <ProfileHeader
        name={companion.name}
        description={companion.description || ""}
        location={`${companion.neighborhood}, ${companion.city} - ${companion.state}`}
        rating={companion.rating || 0}
        reviews={companion.reviews || 0}
        experience={companion.experience || "Nova"}
        views={companion.views || 0}
        likes={companion.likes || 0}
        messages={companion.messages || 0}
        price={companion.price || 0}
        isPremium={companion.is_premium || false}
        isVerified={companion.is_verified || false}
        imageUrl={primaryPhoto || "/placeholder.svg"}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileContent companion={companion} />
          </div>
          <div className="space-y-8">
            <CommunityProfile
              userId={companion.user_id}
              posts={companion.community_posts || []}
              followers={companion.followers || 0}
              following={companion.following || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};