import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { HeroSection } from "@/components/HeroSection";
import { LoadingState } from "@/components/home/LoadingState";
import { ErrorState } from "@/components/home/ErrorState";
import { MainContent } from "@/components/home/MainContent";

interface IndexProps {
  city?: string;
}

const Index: React.FC<IndexProps> = ({ city }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();
  const location = useLocation();
  
  // Track user engagement
  useEffect(() => {
    const trackEngagement = () => {
      const startTime = Date.now();
      const visitCount = parseInt(localStorage.getItem("visitCount") || "0") + 1;
      localStorage.setItem("visitCount", visitCount.toString());
      localStorage.setItem("lastVisit", new Date().toISOString());

      // Track time spent on page
      const handleBeforeUnload = () => {
        const timeSpent = Date.now() - startTime;
        console.log("Time spent on page:", timeSpent / 1000, "seconds");
        localStorage.setItem("averageTimeSpent", 
          ((parseInt(localStorage.getItem("averageTimeSpent") || "0") * (visitCount - 1) + timeSpent) / visitCount).toString()
        );
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    };

    return trackEngagement();
  }, []);

  // Auto-detect user's location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        console.log("User location detected:", position.coords);
        localStorage.setItem("userLocation", JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now()
        }));
        
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
    refetchInterval: 5 * 60 * 1000,
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

  // Track page views and user behavior
  useEffect(() => {
    console.log('Page view:', location.pathname);
    
    // Track scroll depth
    const handleScroll = () => {
      const scrollDepth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
      if (scrollDepth > parseFloat(localStorage.getItem("maxScrollDepth") || "0")) {
        localStorage.setItem("maxScrollDepth", scrollDepth.toString());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleSearch = (filters: any) => {
    console.log("Search filters:", filters);
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    recentSearches.unshift(filters);
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 5)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white transition-colors duration-500">
      <div className="animate-fade-in">
        <HeroSection />
      </div>
      
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState />
      ) : (
        <MainContent
          companions={companions || []}
          viewMode={viewMode}
          setViewMode={setViewMode}
          handleSearch={handleSearch}
        />
      )}
    </div>
  );
};

export default Index;