import React, { useState } from 'react';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { HeroSection } from "@/components/HeroSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface IndexProps {
  city?: string;
}

const Index: React.FC<IndexProps> = ({ city }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { data: companions, isLoading, error } = useQuery({
    queryKey: ['companions', city],
    queryFn: async () => {
      console.log('Fetching companions from Supabase...');
      let query = supabase.from('companions').select(`
        id,
        name,
        rating,
        reviews,
        price,
        services,
        companion_photos (url),
        is_premium,
        is_verified,
        neighborhood,
        city,
        state
      `);

      if (city) {
        query = query.eq('city', city);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching companions:', error);
        throw error;
      }
      
      console.log('Fetched companions:', data);
      return data || [];
    }
  });

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // Implement search functionality here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500" />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    console.error('Error loading companions:', error);
    return (
      <div className="min-h-screen bg-gray-50">
        <HeroSection />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            Erro ao carregar acompanhantes. Por favor, tente novamente mais tarde.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <SearchFilters 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onSearch={handleSearch}
        />
        <CompanionGrid 
          companions={companions || []} 
          viewMode={viewMode} 
        />
      </main>
    </div>
  );
};

export default Index;