import React from 'react';
import { CityHero } from '@/components/city/CityHero';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { useState } from 'react';

const VarzeaGrande = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const filteredCompanions = demoCompanions.filter(
    companion => companion.city === "Várzea Grande"
  );

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CityHero 
        city="Várzea Grande"
        state="Mato Grosso"
        flagUrl="/cities/varzea-grande-flag.jpg"
        description="Várzea Grande é um município brasileiro do estado de Mato Grosso. É a segunda cidade mais populosa do estado, fazendo parte da Região Metropolitana do Vale do Rio Cuiabá."
        population="284.971 habitantes"
        founded="15 de maio de 1867"
      />
      <main className="container mx-auto px-4 py-8">
        <SearchFilters 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onSearch={handleSearch}
        />
        <CompanionGrid companions={filteredCompanions} viewMode={viewMode} />
      </main>
    </div>
  );
};

export default VarzeaGrande;