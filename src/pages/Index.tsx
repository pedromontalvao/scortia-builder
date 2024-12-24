import React, { useState, useEffect } from 'react';
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { SearchFilters } from "@/components/home/SearchFilters";
import { HeroSection } from "@/components/HeroSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedCompanions } from "@/components/home/FeaturedCompanions";
import { PopularLocations } from "@/components/home/PopularLocations";
import { HowItWorks } from "@/components/home/HowItWorks";
import { useLocation } from "react-router-dom";

interface IndexProps {
  city?: string;
}

const Index: React.FC<IndexProps> = ({ city }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();
  const location = useLocation();
  
  // Auto-detect user's location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        console.log("User location detected:", position.coords);
        
        // You could use these coordinates to fetch nearby companions
        // For now, we'll just show a toast
        toast({
          title: "Localização detectada",
          description: "Mostrando acompanhantes próximas a você.",
        });
      } catch (error) {
        console.log("Error detecting location:", error);
      }
    };

    detectLocation();
  }, [toast]);

  // Auto-refresh data periodically
  const { data: companions, isLoading, error } = useQuery({
    queryKey: ['companions', city],
    queryFn: async () => {
      console.log('Fetching companions from Supabase...');
      
      if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
        console.log('Using demo data in development mode');
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
          city: 'São Paulo',
          state: 'SP'
        }];
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
      
      console.log('Fetched companions data:', data);
      return data || [];
    },
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
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

  // Auto-save view mode preference
  useEffect(() => {
    localStorage.setItem('preferredViewMode', viewMode);
  }, [viewMode]);

  // Load saved view mode on mount
  useEffect(() => {
    const savedViewMode = localStorage.getItem('preferredViewMode') as "grid" | "list" | null;
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  // Track page views
  useEffect(() => {
    console.log('Page view:', location.pathname);
    // You could send this to an analytics service
  }, [location]);

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    // Save recent searches
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recentSearches.unshift(filters);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 5)));
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
        <div className="space-y-16">
          {companions && <FeaturedCompanions companions={companions} />}
          
          <HowItWorks />
          
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
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhuma acompanhante encontrada com os filtros selecionados.
                </p>
              </div>
            )}
          </div>
          
          <PopularLocations />
        </div>
      </main>
    </div>
  );
};

export default Index;