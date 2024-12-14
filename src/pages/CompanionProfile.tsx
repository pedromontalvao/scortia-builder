import { useParams } from "react-router-dom";
import { ProfileHeader } from "@/components/companion/ProfileHeader";
import { PersonalInfo } from "@/components/companion/PersonalInfo";
import { Measurements } from "@/components/companion/Measurements";
import { LocationInfo } from "@/components/companion/LocationInfo";
import { PhotoGallery } from "@/components/companion/PhotoGallery";
import { ServicesAndPrices } from "@/components/companion/ServicesAndPrices";

// Static data for demo companions
const demoCompanions = {
  'comp-001': {
    id: 'comp-001',
    name: 'Isabela Santos',
    description: 'Olá! Sou a Isabela, uma acompanhante de luxo em Cuiabá. Carinhosa e elegante, busco proporcionar momentos únicos e inesquecíveis.',
    neighborhood: 'Centro Sul',
    city: 'Cuiabá',
    state: 'MT',
    rating: 4.9,
    reviews: 156,
    experience: '2 anos',
    views: 1234,
    likes: 89,
    messages: 45,
    price: 400,
    isPremium: true,
    isVerified: true,
    imageUrl: '/demo/isabela1.jpg',
    photos: ['/demo/isabela1.jpg', '/demo/isabela2.jpg', '/demo/isabela3.jpg'],
    personal_info: {
      age: '23 anos',
      height: '1.68m',
      weight: '58kg',
      hair: 'Preto',
      eyes: 'Castanhos',
      physique: 'Curvilínea'
    },
    measurements: {
      bust: '92cm',
      waist: '60cm',
      hips: '92cm'
    },
    services: [
      {
        title: 'Encontro Casual',
        duration: '1 hora',
        price: 400,
        description: 'Encontro casual com muito carinho e sensualidade'
      },
      {
        title: 'Jantar ou Evento',
        duration: '4 horas',
        price: 1200,
        description: 'Acompanhamento em jantares ou eventos sociais'
      },
      {
        title: 'Pernoite',
        duration: '12 horas',
        price: 2000,
        description: 'Acompanhamento completo durante toda a noite'
      }
    ],
    service_areas: ['Centro Sul', 'Centro Norte', 'Jardim das Américas', 'Santa Rosa']
  },
  'comp-002': {
    // ... similar structure for other companions
  }
};

export const CompanionProfile = () => {
  const { id } = useParams();
  const companion = demoCompanions[id as keyof typeof demoCompanions];

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
        isPremium={companion.isPremium}
        isVerified={companion.isVerified}
        imageUrl={companion.imageUrl}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <PersonalInfo {...companion.personal_info} />
            <Measurements {...companion.measurements} />
            <PhotoGallery photos={companion.photos} />
            <ServicesAndPrices services={companion.services} />
          </div>

          <div className="space-y-8">
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