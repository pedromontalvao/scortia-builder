import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/home/SearchFilters";
import { CompanionGrid } from "@/components/home/CompanionGrid";
import { useToast } from "@/hooks/use-toast";

// Static companions data
const staticCompanions = [
  {
    id: 'comp-001',
    name: 'Isabela Santos',
    neighborhood: 'Centro Sul',
    city: 'Cuiabá',
    state: 'MT',
    rating: 4.9,
    reviews: 156,
    price: 400,
    services: ['Massagem tântrica', 'Jantar', 'Pernoite', 'Viagens'],
    companion_photos: [{ url: '/demo/isabela1.jpg' }],
    is_premium: true,
    is_verified: true
  },
  {
    id: 'comp-002',
    name: 'Amanda Lima',
    neighborhood: 'Jardim das Américas',
    city: 'Cuiabá',
    state: 'MT',
    rating: 4.7,
    reviews: 98,
    price: 300,
    services: ['Massagem relaxante', 'Jantar', 'Eventos', 'Pernoite'],
    companion_photos: [{ url: '/demo/amanda1.jpg' }],
    is_premium: false,
    is_verified: true
  },
  {
    id: 'comp-003',
    name: 'Juliana Costa',
    neighborhood: 'Goiabeiras',
    city: 'Cuiabá',
    state: 'MT',
    rating: 4.8,
    reviews: 187,
    price: 500,
    services: ['Massagem tântrica', 'Eventos', 'Viagens', 'Pernoite'],
    companion_photos: [{ url: '/demo/juliana1.jpg' }],
    is_premium: true,
    is_verified: true
  },
  {
    id: 'comp-004',
    name: 'Larissa Mendes',
    neighborhood: 'Santa Rosa',
    city: 'Cuiabá',
    state: 'MT',
    rating: 4.6,
    reviews: 76,
    price: 350,
    services: ['Massagem relaxante', 'Jantar', 'Pernoite', 'Eventos'],
    companion_photos: [{ url: '/demo/larissa1.jpg' }],
    is_premium: false,
    is_verified: true
  },
  {
    id: 'comp-005',
    name: 'Gabriela Oliveira',
    neighborhood: 'Centro Norte',
    city: 'Cuiabá',
    state: 'MT',
    rating: 4.9,
    reviews: 203,
    price: 450,
    services: ['Massagem tântrica', 'Viagens', 'Pernoite', 'Eventos VIP'],
    companion_photos: [{ url: '/demo/gabriela1.jpg' }],
    is_premium: true,
    is_verified: true
  }
];

const Index = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredCompanions, setFilteredCompanions] = useState(staticCompanions);

  const handleSearch = (filters: any) => {
    console.log('Applying filters:', filters);
    
    let filtered = staticCompanions;

    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(companion => 
        companion.name.toLowerCase().includes(searchLower) ||
        companion.city.toLowerCase().includes(searchLower) ||
        companion.services.some((service: string) => 
          service.toLowerCase().includes(searchLower)
        )
      );
    }

    if (filters.state) {
      filtered = filtered.filter(companion => companion.state === filters.state);
    }

    if (filters.city) {
      filtered = filtered.filter(companion => companion.city === filters.city);
    }

    if (filters.neighborhood) {
      filtered = filtered.filter(companion => companion.neighborhood === filters.neighborhood);
    }

    if (filters.services && filters.services.length > 0) {
      filtered = filtered.filter(companion =>
        filters.services.every((service: string) =>
          companion.services.includes(service)
        )
      );
    }

    if (filters.priceRange) {
      filtered = filtered.filter(companion =>
        companion.price >= filters.priceRange[0] &&
        companion.price <= filters.priceRange[1]
      );
    }

    setFilteredCompanions(filtered);

    toast({
      title: `${filtered.length} acompanhantes encontradas`,
      description: "Resultados atualizados com base nos filtros selecionados.",
    });
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

        <CompanionGrid companions={filteredCompanions} viewMode={viewMode} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;