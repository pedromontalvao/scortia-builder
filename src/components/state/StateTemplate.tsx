import React from 'react';
import { StateHero } from './StateHero';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface StateTemplateProps {
  name: string;
  flagUrl: string;
  description: string;
  population: string;
  founded: string;
}

export const StateTemplate = ({
  name,
  flagUrl,
  description,
  population,
  founded
}: StateTemplateProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: companions, isLoading } = useQuery({
    queryKey: ['companions', name],
    queryFn: async () => {
      console.log(`Fetching companions for state: ${name}`);
      
      if (import.meta.env.DEV) {
        return [{
          id: 'demo-1',
          name: 'Ana Silva',
          rating: 4.8,
          reviews: 24,
          price: 300,
          services: ['Massagem', 'Jantar', 'Eventos'],
          companion_photos: [{ url: '/demo/ana-1.jpg' }],
          is_premium: true,
          is_verified: true,
          neighborhood: 'Centro',
          city: 'Capital',
          state: name
        }];
      }

      const { data, error } = await supabase
        .from('companions')
        .select(`
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
        `)
        .eq('state', name)
        .eq('is_active', true);

      if (error) throw error;
      return data || [];
    }
  });

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StateHero 
        name={name}
        flagUrl={flagUrl}
        description={description}
        population={population}
        founded={founded}
      />
      <main className="container mx-auto px-4 py-8">
        <SearchFilters 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onSearch={handleSearch}
        />
        <CompanionGrid 
          companions={companions || []} 
          isLoading={isLoading}
          viewMode={viewMode}
        />
      </main>
    </div>
  );
};