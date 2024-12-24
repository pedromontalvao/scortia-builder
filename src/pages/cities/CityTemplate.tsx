import React from 'react';
import { CityHero } from '@/components/city/CityHero';
import { CompanionGrid } from '@/components/home/CompanionGrid';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface CityTemplateProps {
  city: string;
  state: string;
  flagUrl: string;
  description: string;
  population: string;
  founded: string;
}

export const CityTemplate = ({
  city,
  state,
  flagUrl,
  description,
  population,
  founded
}: CityTemplateProps) => {
  const { data: companions, isLoading } = useQuery({
    queryKey: ['companions', city],
    queryFn: async () => {
      if (process.env.NODE_ENV === 'development') {
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
          city: city,
          state: state
        }];
      }

      const { data, error } = await supabase
        .from('companions')
        .select('*')
        .eq('city', city)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    }
  });

  return (
    <div>
      <CityHero
        city={city}
        state={state}
        flagUrl={flagUrl}
        description={description}
        population={population}
        founded={founded}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">
          Acompanhantes em {city}
        </h2>
        
        <CompanionGrid 
          companions={companions || []} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
};