import React from 'react';
import { CityHero } from '@/components/city/CityHero';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { useState } from 'react';

// Demo data for Várzea Grande
const demoCompanions = [
  {
    id: "vg-001",
    name: "Juliana Santos",
    rating: 4.8,
    reviews: 15,
    price: 300,
    services: ["Massagem", "Jantar", "Eventos"],
    companion_photos: [{ url: "/demo/juliana-1.jpg" }],
    is_premium: true,
    is_verified: true,
    neighborhood: "Centro",
    city: "Várzea Grande",
    state: "MT"
  },
  {
    id: "vg-002",
    name: "Mariana Costa",
    rating: 4.7,
    reviews: 12,
    price: 250,
    services: ["Massagem", "Eventos"],
    companion_photos: [{ url: "/demo/mariana-1.jpg" }],
    is_premium: false,
    is_verified: true,
    neighborhood: "Cristo Rei",
    city: "Várzea Grande",
    state: "MT"
  },
  {
    id: "vg-003",
    name: "Patricia Lima",
    rating: 4.9,
    reviews: 20,
    price: 350,
    services: ["Jantar", "Eventos", "Viagens"],
    companion_photos: [{ url: "/demo/patricia-1.jpg" }],
    is_premium: true,
    is_verified: true,
    neighborhood: "Nova Várzea Grande",
    city: "Várzea Grande",
    state: "MT"
  }
];

const VarzeaGrande = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
        <CompanionGrid companions={demoCompanions} viewMode={viewMode} />
      </main>
    </div>
  );
};

export default VarzeaGrande;