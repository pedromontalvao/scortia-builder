import { PersonalInfo } from "./PersonalInfo";
import { LocationInfo } from "./LocationInfo";
import { PhotoGallery } from "./PhotoGallery";
import { ServicesAndPrices } from "./ServicesAndPrices";
import { ContactInfo } from "./ContactInfo";
import { AudioSection } from "./AudioSection";
import { Measurements } from "./Measurements";
import { Reviews } from "./Reviews";
import { Statistics } from "./Statistics";
import { useToast } from "@/hooks/use-toast";

interface ProfileContentProps {
  companion: any; // Type this properly based on your Supabase schema
}

export const ProfileContent = ({ companion }: ProfileContentProps) => {
  const { toast } = useToast();

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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <PersonalInfo
            age={companion.age || ""}
            height={companion.height || ""}
            weight={companion.weight || ""}
            hair={companion.hair_color || ""}
            eyes={companion.eye_color || ""}
            physique={companion.body_type || ""}
          />
          
          <Measurements
            bust={companion.bust || ""}
            waist={companion.waist || ""}
            hips={companion.hips || ""}
          />
          
          <PhotoGallery 
            photos={companion.companion_photos?.map(photo => photo.url) || []} 
          />
          
          {companion.companion_services && companion.companion_services.length > 0 && (
            <ServicesAndPrices 
              services={companion.companion_services} 
            />
          )}
          
          {(companion.presentation_audio || companion.voice_message) && (
            <AudioSection
              presentationAudio={companion.presentation_audio || ""}
              voiceMessageAudio={companion.voice_message || ""}
            />
          )}

          {companion.reviews_data && companion.reviews_data.length > 0 && (
            <Reviews reviews={companion.reviews_data} />
          )}

          {companion.stats && (
            <Statistics
              totalMeetings={companion.stats.total_meetings}
              repeatClients={companion.stats.repeat_clients}
              satisfactionRate={companion.stats.satisfaction_rate}
            />
          )}
        </div>

        <div className="space-y-8">
          <ContactInfo
            whatsapp={companion.whatsapp || ""}
            email={companion.email || ""}
            schedule={{
              weekdays: companion.weekday_hours || "Sob consulta",
              saturday: companion.weekend_hours || "Sob consulta"
            }}
            onContact={handleContact}
          />
          
          <LocationInfo
            location={`${companion.neighborhood}, ${companion.city} - ${companion.state}`}
            serviceAreas={companion.service_areas || []}
            neighborhood={companion.neighborhood || ""}
            city={companion.city || ""}
            state={companion.state || ""}
          />
        </div>
      </div>
    </main>
  );
};