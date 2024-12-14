import { CompanionCard } from "@/components/CompanionCard";

interface CompanionGridProps {
  companions: any[];
  viewMode: "grid" | "list";
}

export const CompanionGrid = ({ companions, viewMode }: CompanionGridProps) => {
  return (
    <div className={`grid ${
      viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
    } gap-6`}>
      {companions.map((companion) => (
        <CompanionCard
          key={companion.id}
          id={companion.id}
          name={companion.name}
          location={`${companion.city}, ${companion.state}`}
          rating={companion.rating || 0}
          reviews={companion.reviews || 0}
          price={companion.price || 0}
          services={companion.services || []}
          imageUrl={companion.companion_photos?.[0]?.url || "/placeholder.svg"}
          isPremium={companion.is_premium}
          isVerified={companion.is_verified}
        />
      ))}
    </div>
  );
};