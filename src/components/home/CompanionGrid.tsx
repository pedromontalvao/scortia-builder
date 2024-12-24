import { CompanionCard } from "@/components/CompanionCard";

interface CompanionGridProps {
  companions: any[];
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

  return (
    <div className={
      viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        : "space-y-6"
    }>
      {companions.map((companion) => (
        <CompanionCard
          key={companion.id}
          companion={companion}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};