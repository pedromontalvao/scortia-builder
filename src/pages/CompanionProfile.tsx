import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProfileHeader } from "@/components/companion/ProfileHeader";
import { PersonalInfo } from "@/components/companion/PersonalInfo";
import { Measurements } from "@/components/companion/Measurements";
import { LocationInfo } from "@/components/companion/LocationInfo";
import { AudioSection } from "@/components/companion/AudioSection";
import { ContactInfo } from "@/components/companion/ContactInfo";
import { PhotoGallery } from "@/components/companion/PhotoGallery";
import { ServicesAndPrices } from "@/components/companion/ServicesAndPrices";
import { supabase } from "@/lib/supabase";

export const CompanionProfile = () => {
  const { id } = useParams();

  const { data: companion, isLoading } = useQuery({
    queryKey: ['companion', id],
    queryFn: async () => {
      const { data: companion, error } = await supabase
        .from('companions')
        .select(`
          *,
          companion_photos (
            url,
            is_primary
          ),
          companion_services (
            title,
            duration,
            price,
            description
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return companion;
    }
  });

  const handleContact = () => {
    if (companion?.whatsapp) {
      window.open(`https://wa.me/${companion.whatsapp.replace(/\D/g, '')}`, '_blank');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!companion) {
    return <div>Acompanhante não encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader
        name={companion.name}
        description={companion.description}
        location={companion.location}
        rating={4.8}
        reviews={0}
        experience="2 anos"
        views={1234}
        likes={89}
        messages={45}
        price={companion.price_per_hour}
        isPremium={companion.is_premium}
        isVerified={companion.is_verified}
        imageUrl={companion.companion_photos?.find(p => p.is_primary)?.url || "/placeholder.svg"}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <PersonalInfo {...companion.personal_info} />
            <Measurements {...companion.measurements} />
            <PhotoGallery photos={companion.companion_photos?.map(p => p.url) || []} />
            <ServicesAndPrices services={companion.companion_services || []} />
          </div>

          <div className="space-y-8">
            <LocationInfo 
              location={companion.location}
              serviceAreas={companion.service_areas || []}
              neighborhood={companion.neighborhood || ""}
              city={companion.city || ""}
              state={companion.state || ""}
            />
            <ContactInfo
              whatsapp={companion.whatsapp}
              email={companion.email}
              schedule={{
                weekdays: companion.weekday_hours || "10:00 - 20:00",
                saturday: companion.weekend_hours || "12:00 - 18:00"
              }}
              onContact={handleContact}
            />
          </div>
        </div>
      </main>
    </div>
  );
};