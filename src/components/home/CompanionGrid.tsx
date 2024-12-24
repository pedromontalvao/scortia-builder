import { CompanionCard } from "@/components/CompanionCard";

interface Companion {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  services: string[];
  imageUrl: string;
  companion_photos?: { url: string }[];
  isPremium?: boolean;
  isVerified?: boolean;
  neighborhood?: string;
  city?: string;
  state?: string;
}

interface CompanionGridProps {
  companions: Companion[];
  isLoading?: boolean;
  viewMode?: "grid" | "list";
}

export const CompanionGrid = ({ companions, isLoading = false, viewMode = "grid" }: CompanionGridProps) => {
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!companions || companions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum resultado encontrado</p>
      </div>
    );
  }

  const processedCompanions = companions.map(companion => ({
    ...companion,
    imageUrl: companion.imageUrl || companion.companion_photos?.[0]?.url || '/placeholder.svg'
  }));

  return (
    <div className={
      viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "space-y-6"
    }>
      {processedCompanions.map((companion) => (
        <CompanionCard
          key={companion.id}
          id={companion.id}
          name={companion.name}
          rating={companion.rating}
          reviews={companion.reviews}
          price={companion.price}
          services={companion.services}
          imageUrl={companion.imageUrl}
          isPremium={companion.isPremium}
          isVerified={companion.isVerified}
          neighborhood={companion.neighborhood}
          city={companion.city}
          state={companion.state}
        />
      ))}
    </div>
  );
};