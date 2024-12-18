import { CompanionCard } from "@/components/CompanionCard";

interface CompanionGridProps {
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
  viewMode: "grid" | "list";
}

export const CompanionGrid = ({ companions, viewMode }: CompanionGridProps) => {
  console.log("Rendering companions:", companions);
  
  if (!companions || companions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma acompanhante encontrada.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${
      viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
    } gap-6`}>
      {companions.map((companion) => (
        <CompanionCard
          key={companion.id}
          id={companion.id}
          name={companion.name}
          neighborhood={companion.neighborhood}
          city={companion.city}
          state={companion.state}
          rating={companion.rating}
          reviews={companion.reviews}
          price={companion.price}
          services={companion.services}
          imageUrl={companion.companion_photos?.[0]?.url || "/placeholder.svg"}
          isPremium={companion.is_premium}
          isVerified={companion.is_verified}
        />
      ))}
    </div>
  );
};