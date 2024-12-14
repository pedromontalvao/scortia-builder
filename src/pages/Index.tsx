import React from 'react';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { HeroSection } from "@/components/HeroSection";

interface IndexProps {
  city?: string;
}

const Index: React.FC<IndexProps> = ({ city }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <SearchFilters />
        <CompanionGrid city={city} />
      </main>
    </div>
  );
};

export default Index;