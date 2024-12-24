import { FeaturedCompanions } from "./FeaturedCompanions";
import { HowItWorks } from "./HowItWorks";
import { SearchFilters } from "./SearchFilters";
import { CompanionGrid } from "./CompanionGrid";
import { PopularLocations } from "./PopularLocations";

interface MainContentProps {
  companions: any[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  handleSearch: (filters: any) => void;
}

export const MainContent = ({ 
  companions, 
  viewMode, 
  setViewMode, 
  handleSearch 
}: MainContentProps) => {
  return (
    <main className="container mx-auto px-4 py-12 space-y-16 animate-fade-in">
      {companions && (
        <div className="transform hover:scale-[1.01] transition-transform duration-300">
          <FeaturedCompanions companions={companions} />
        </div>
      )}
      
      <div className="transform hover:scale-[1.01] transition-transform duration-300">
        <HowItWorks />
      </div>
      
      <div className="space-y-12">
        <SearchFilters 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onSearch={handleSearch}
        />
        
        {companions && companions.length > 0 ? (
          <CompanionGrid 
            companions={companions.map(companion => ({
              ...companion,
              imageUrl: companion.companion_photos?.[0]?.url || '/placeholder.svg'
            }))}
            viewMode={viewMode} 
          />
        ) : (
          <div className="text-center py-12 bg-pink-50/50 rounded-lg">
            <p className="text-gray-500">
              Nenhuma acompanhante encontrada com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
      
      <div className="transform hover:scale-[1.01] transition-transform duration-300">
        <PopularLocations />
      </div>
    </main>
  );
};