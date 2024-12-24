import React, { useState } from 'react';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { HeroSection } from "@/components/HeroSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface IndexProps {
  city?: string;
}

const Index: React.FC<IndexProps> = ({ city }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();
  
  const { data: companions, isLoading, error } = useQuery({
    queryKey: ['companions', city],
    queryFn: async () => {
      console.log('Fetching companions from Supabase...');
      
      // In development, return demo data if Supabase is not configured
      if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
        console.log('Using demo data in development mode');
        return [
          {
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
            city: 'São Paulo',
            state: 'SP'
          },
          // Add more demo companions as needed
        ];
      }

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
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: {
      onError: () => {
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar as acompanhantes. Tente novamente mais tarde.",
          variant: "destructive"
        });
      }
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
          <div className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
            <p className="text-gray-500">Carregando acompanhantes...</p>
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
          <div className="text-center space-y-4">
            <p className="text-red-500 font-medium">
              Erro ao carregar acompanhantes. Por favor, tente novamente mais tarde.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
            >
              Tentar novamente
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          <SearchFilters 
            viewMode={viewMode} 
            setViewMode={setViewMode} 
            onSearch={handleSearch}
          />
          
          {companions && companions.length > 0 ? (
            <CompanionGrid 
              companions={companions} 
              viewMode={viewMode} 
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Nenhuma acompanhante encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;