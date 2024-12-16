import { useParams } from "react-router-dom";
import { useCompanionData } from "@/hooks/useCompanionData";
import { ProfileHeader } from "@/components/companion/ProfileHeader";
import { ProfileContent } from "@/components/companion/ProfileContent";
import { NotFoundState } from "@/components/companion/NotFoundState";

export const CompanionProfile = () => {
  const { id } = useParams();
  const { companion, isLoading, error } = useCompanionData(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
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
      <ProfileContent companion={companion} />
    </div>
  );
};