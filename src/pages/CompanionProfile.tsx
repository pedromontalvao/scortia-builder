import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/companion/ProfileHeader";
import { PersonalInfo } from "@/components/companion/PersonalInfo";
import { LocationInfo } from "@/components/companion/LocationInfo";
import { PhotoGallery } from "@/components/companion/PhotoGallery";
import { ServicesAndPrices } from "@/components/companion/ServicesAndPrices";
import { ContactInfo } from "@/components/companion/ContactInfo";
import { AudioSection } from "@/components/companion/AudioSection";
import { Measurements } from "@/components/companion/Measurements";
import { NotFoundState } from "@/components/companion/NotFoundState";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Demo data for development
const demoCompanion = {
  id: "comp-001",
  name: "Ana Silva",
  description: "Olá! Sou a Ana, uma acompanhante profissional com experiência em proporcionar momentos únicos e especiais.",
  neighborhood: "Centro",
  city: "Várzea Grande",
  state: "MT",
  rating: 4.8,
  reviews: 24,
  experience: "3 anos",
  views: 1500,
  likes: 120,
  messages: 45,
  price: 300,
  is_premium: true,
  is_verified: true,
  age: "25",
  height: "1.70m",
  weight: "55kg",
  hair_color: "Loiro",
  eye_color: "Castanhos",
  body_type: "Atlético",
  bust: "95cm",
  waist: "60cm",
  hips: "90cm",
  whatsapp: "(65) 99999-9999",
  email: "ana.silva@example.com",
  weekday_hours: "9h às 22h",
  weekend_hours: "10h às 20h",
  service_areas: ["Várzea Grande", "Cuiabá"],
  companion_photos: [
    { url: "/demo/ana-1.jpg", is_primary: true },
    { url: "/demo/ana-2.jpg", is_primary: false },
    { url: "/demo/ana-3.jpg", is_primary: false }
  ],
  companion_services: [
    {
      title: "Encontro Casual",
      duration: "1 hora",
      price: 300,
      description: "Encontro casual com muito carinho e atenção"
    },
    {
      title: "Pernoite",
      duration: "12 horas",
      price: 1500,
      description: "Acompanhamento completo durante toda a noite"
    }
  ],
  presentation_audio: "/demo/presentation.mp3",
  voice_message: "/demo/voice-message.mp3"
};

export const CompanionProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();

  console.log('Fetching companion data for ID:', id);

  const { data: companion, isLoading, error } = useQuery({
    queryKey: ['companion', id],
    queryFn: async () => {
      if (id === 'comp-001') {
        console.log('Returning demo data for comp-001');
        return demoCompanion;
      }

      const { data, error } = await supabase
        .from('companions')
        .select(`
          *,
          companion_photos(url, is_primary),
          companion_services(title, duration, price, description)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching companion:', error);
        throw error;
      }
      
      console.log('Fetched companion data:', data);
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500" />
      </div>
    );
  }

  if (error || !companion) {
    return <NotFoundState />;
  }

  const primaryPhoto = companion.companion_photos?.find(photo => photo.is_primary)?.url || companion.companion_photos?.[0]?.url;

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
    </div>
  );
};