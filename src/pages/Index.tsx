import React, { useState } from 'react';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { HeroSection } from "@/components/HeroSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface IndexProps {
  city?: string;
}

// Demo data for companions
const demoCompanions = [
  {
    id: "comp-001",
    name: "Ana Silva",
    rating: 4.8,
    reviews: 24,
    price: 300,
    services: ["Massagem", "Jantar", "Pernoite"],
    companion_photos: [{ url: "/demo/ana-1.jpg" }],
    is_premium: true,
    is_verified: true,
    neighborhood: "Centro Norte",
    city: "Cuiabá",
    state: "MT"
  },
  {
    id: "comp-002",
    name: "Beatriz Santos",
    rating: 4.9,
    reviews: 32,
    price: 400,
    services: ["Massagem", "Eventos", "Viagens"],
    companion_photos: [{ url: "/demo/bia-1.jpg" }],
    is_premium: true,
    is_verified: true,
    neighborhood: "Jardim das Américas",
    city: "Cuiabá",
    state: "MT"
  },
  {
    id: "comp-003",
    name: "Carolina Lima",
    rating: 4.7,
    reviews: 18,
    price: 250,
    services: ["Jantar", "Eventos"],
    companion_photos: [{ url: "/demo/carol-1.jpg" }],
    is_premium: false,
    is_verified: true,
    neighborhood: "Santa Rosa",
    city: "Cuiabá",
    state: "MT"
  },
  {
    id: "comp-004",
    name: "Diana Oliveira",
    rating: 4.6,
    reviews: 15,
    price: 300,
    services: ["Massagem", "Pernoite"],
    companion_photos: [{ url: "/demo/diana-1.jpg" }],
    is_premium: false,
    is_verified: true,
    neighborhood: "Goiabeiras",
    city: "Cuiabá",
    state: "MT"
  },
  {
    id: "comp-005",
    name: "Elena Costa",
    rating: 5.0,
    reviews: 28,
    price: 500,
    services: ["Massagem", "Jantar", "Viagens", "Pernoite"],
    companion_photos: [{ url: "/demo/elena-1.jpg" }],
    is_premium: true,
    is_verified: true,
    neighborhood: "Popular",
    city: "Cuiabá",
    state: "MT"
  }
];

const Index: React.FC<IndexProps> = ({ city }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter companions based on city prop if provided
  const filteredCompanions = city 
    ? demoCompanions.filter(companion => companion.city === city)
    : demoCompanions;

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // Implement search functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <SearchFilters 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onSearch={handleSearch}
        />
        <CompanionGrid companions={filteredCompanions} viewMode={viewMode} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;