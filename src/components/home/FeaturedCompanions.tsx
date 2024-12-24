import { CompanionCard } from "@/components/CompanionCard";

interface FeaturedCompanionsProps {
  companions: Array<{
    id: string;
    name: string;
    rating: number;
    reviews: number;
    price: number;
    services: string[];
    companion_photos: Array<{ url: string }>;
    is_premium?: boolean;
    is_verified?: boolean;
    neighborhood?: string;
    city?: string;
    state?: string;
  }>;
}

export const FeaturedCompanions = ({ companions }: FeaturedCompanionsProps) => {
  console.log('FeaturedCompanions received companions:', companions);
  
  if (!companions?.length) {
    console.log('No companions data available');
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Acompanhantes em Destaque</h2>
        <p className="text-gray-600 mt-2">Conheça nossas acompanhantes mais bem avaliadas</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companions.map((companion) => {
          console.log('Processing companion:', companion);
          const imageUrl = companion.companion_photos?.[0]?.url || "/placeholder.svg";
          
          return (
            <CompanionCard
              key={companion.id}
              id={companion.id}
              name={companion.name}
              rating={companion.rating}
              reviews={companion.reviews}
              price={companion.price}
              services={companion.services}
              imageUrl={imageUrl}
              isPremium={companion.is_premium}
              isVerified={companion.is_verified}
              neighborhood={companion.neighborhood}
              city={companion.city}
              state={companion.state}
            />
          );
        })}
      </div>
    </section>
  );
};