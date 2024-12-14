import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/home/SearchFilters";
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    searchTerm: "",
    priceRange: [0, 1000],
    ageRange: [18, 60],
    distance: 50,
  });

  const { data: companions, isLoading } = useQuery({
    queryKey: ['companions', filters],
    queryFn: async () => {
      console.log('Fetching companions with filters:', filters);
      
      let query = supabase
        .from('companions')
        .select(`
          *,
          companion_photos (
            url,
            is_primary
          )
        `)
        .order('created_at', { ascending: false });

      if (filters.searchTerm) {
        query = query.or(`
          name.ilike.%${filters.searchTerm}%,
          city.ilike.%${filters.searchTerm}%,
          services.cs.{${filters.searchTerm}}
        `);
      }

      if (filters.priceRange) {
        query = query
          .gte('price', filters.priceRange[0])
          .lte('price', filters.priceRange[1]);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching companions:', error);
        toast({
          title: "Erro ao carregar acompanhantes",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive"
        });
        throw error;
      }

      console.log('Fetched companions:', data);
      return data || [];
    }
  });

  const handleSearch = (newFilters: any) => {
    console.log('Applying new filters:', newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Acompanhantes em Destaque</h2>
          <p className="text-gray-600">Conheça nossas acompanhantes mais bem avaliadas</p>
        </div>

        <SearchFilters
          viewMode={viewMode}
          setViewMode={setViewMode}
          onSearch={handleSearch}
        />

        {isLoading ? (
          <div className="text-center py-8">Carregando acompanhantes...</div>
        ) : companions && companions.length > 0 ? (
          <CompanionGrid companions={companions} viewMode={viewMode} />
        ) : (
          <div className="text-center py-8">
            Nenhuma acompanhante encontrada com os filtros selecionados.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;