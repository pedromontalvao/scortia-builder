import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/companion/ProfileHeader";
import { PersonalInfo } from "@/components/companion/PersonalInfo";
import { Measurements } from "@/components/companion/Measurements";
import { LocationInfo } from "@/components/companion/LocationInfo";
import { PhotoGallery } from "@/components/companion/PhotoGallery";
import { ServicesAndPrices } from "@/components/companion/ServicesAndPrices";
import { ContactInfo } from "@/components/companion/ContactInfo";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const CompanionProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: companion, isLoading } = useQuery({
    queryKey: ['companion', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companions')
        .select(`
          *,
          companion_photos(url, is_primary),
          companion_services(title, duration, price, description)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const handleContact = () => {
    if (!companion?.whatsapp) {
      toast({
        title: "Erro",
        description: "Número de WhatsApp não disponível",
        variant: "destructive"
      });
      return;
    }

    const message = `Olá ${companion.name}, vi seu perfil no site e gostaria de mais informações.`;
    const whatsappUrl = `https://wa.me/55${companion.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!companion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acompanhante não encontrada</h1>
          <p className="text-gray-600">O perfil que você está procurando não existe ou foi removido.</p>
        </div>
      </div>
    );
  }

  const primaryPhoto = companion.companion_photos?.find(photo => photo.is_primary)?.url || companion.companion_photos?.[0]?.url;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader
        name={companion.name}
        description={companion.description}
        location={`${companion.neighborhood}, ${companion.city} - ${companion.state}`}
        rating={companion.rating}
        reviews={companion.reviews}
        experience={companion.experience}
        views={companion.views}
        likes={companion.likes}
        messages={companion.messages}
        price={companion.price}
        isPremium={companion.is_premium}
        isVerified={companion.is_verified}
        imageUrl={primaryPhoto}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <PersonalInfo {...companion.personal_info} />
            <Measurements {...companion.measurements} />
            <PhotoGallery photos={companion.companion_photos?.map(photo => photo.url) || []} />
            {companion.companion_services && companion.companion_services.length > 0 && (
              <ServicesAndPrices services={companion.companion_services} />
            )}
          </div>

          <div className="space-y-8">
            <ContactInfo
              whatsapp={companion.whatsapp}
              email={companion.email}
              schedule={{
                weekdays: companion.weekday_hours || "Sob consulta",
                saturday: companion.weekend_hours || "Sob consulta"
              }}
              onContact={handleContact}
            />
            <LocationInfo
              location={`${companion.neighborhood}, ${companion.city} - ${companion.state}`}
              serviceAreas={companion.service_areas}
              neighborhood={companion.neighborhood}
              city={companion.city}
              state={companion.state}
            />
          </div>
        </div>
      </main>
    </div>
  );
};