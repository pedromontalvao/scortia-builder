import { FeaturedCompanions } from "./FeaturedCompanions";
import { HowItWorks } from "./HowItWorks";
import { SearchFilters } from "./SearchFilters";
import { CompanionGrid } from "./CompanionGrid";
import { PopularLocations } from "./PopularLocations";
import { CommunityCallout } from "./CommunityCallout";
import { CommunityWidget } from "./CommunityWidget";
import { SexyMatchWidget } from "./SexyMatchWidget";
import { useInView } from "react-intersection-observer";

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
  const { ref: featuredRef, inView: featuredInView } = useInView({ triggerOnce: true });
  const { ref: howItWorksRef, inView: howItWorksInView } = useInView({ triggerOnce: true });
  const { ref: searchRef, inView: searchInView } = useInView({ triggerOnce: true });
  const { ref: locationsRef, inView: locationsInView } = useInView({ triggerOnce: true });

  return (
    <main className="container mx-auto px-4 py-12 space-y-24">
      {companions && (
        <div 
          ref={featuredRef}
          className={`transform transition-all duration-1000 ${
            featuredInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <FeaturedCompanions companions={companions} />
        </div>
      )}
      
      <div 
        ref={howItWorksRef}
        className={`transform transition-all duration-1000 delay-300 ${
          howItWorksInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <HowItWorks />
      </div>

      <div className="space-y-8">
        <SexyMatchWidget />
        <CommunityCallout />
        <CommunityWidget />
      </div>
      
      <div 
        ref={searchRef}
        className={`space-y-12 transform transition-all duration-1000 ${
          searchInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
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
      
      <div 
        ref={locationsRef}
        className={`transform transition-all duration-1000 delay-500 ${
          locationsInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <PopularLocations />
      </div>
    </main>
  );
};