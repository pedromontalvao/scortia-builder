import { ProfileHeader } from "@/components/companion/ProfileHeader";
import { PersonalInfo } from "@/components/companion/PersonalInfo";
import { AudioSection } from "@/components/companion/AudioSection";
import { PhotoGallery } from "@/components/companion/PhotoGallery";
import { ServicesAndPrices } from "@/components/companion/ServicesAndPrices";

export const CompanionProfile = () => {
  // Mock data - in a real app this would come from an API
  const companion = {
    id: "1",
    name: "Isabella Santos",
    description: "Olá! Sou a Isabella, uma acompanhante de luxo em São Paulo. Ofereço momentos únicos e inesquecíveis com muito carinho e discrição.",
    location: "Jardins, São Paulo - SP",
    rating: 4.8,
    reviews: 124,
    experience: "2 anos de experiência",
    views: 1234,
    likes: 89,
    messages: 45,
    price: 300,
    isPremium: true,
    isVerified: true,
    imageUrl: "/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png",
    personalInfo: {
      age: "24 anos",
      height: "175cm",
      weight: "58kg",
      hair: "Castanho",
      eyes: "Verde",
      physique: "Atlético"
    },
    photos: [
      "/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png",
      "/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png",
      "/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png"
    ],
    services: [
      {
        title: "1 Hora",
        duration: "1 hora",
        price: 300,
        description: "Encontro casual e agradável"
      },
      {
        title: "2 Horas",
        duration: "2 horas",
        price: 500,
        description: "Tempo para um encontro mais elaborado"
      },
      {
        title: "Pernoite",
        duration: "12 horas",
        price: 1500,
        description: "Acompanhamento completo com pernoite"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader
        {...companion}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <PersonalInfo {...companion.personalInfo} />
            <PhotoGallery photos={companion.photos} />
            <ServicesAndPrices services={companion.services} />
          </div>

          <div className="space-y-8">
            <AudioSection
              presentationAudio="/audio/presentation.mp3"
              voiceMessageAudio="/audio/voice-message.mp3"
            />
          </div>
        </div>
      </main>
    </div>
  );
};