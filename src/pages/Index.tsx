import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CompanionCard } from "@/components/CompanionCard";
import { Footer } from "@/components/Footer";
import { Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ageRange, setAgeRange] = useState([18, 60]);
  const [distance, setDistance] = useState([50]);

  // Mock data - in a real app this would come from an API
  const companions = [
    {
      id: "1",
      name: "Isabella Santos",
      location: "São Paulo, SP",
      rating: 4.9,
      reviews: 127,
      price: 300,
      services: ["Eventos", "Viagens", "Jantar"],
      imageUrl: "/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png",
      isPremium: true,
      isVerified: true
    },
    {
      id: "2",
      name: "Julia Oliveira",
      location: "Rio de Janeiro, RJ",
      rating: 4.7,
      reviews: 89,
      price: 250,
      services: ["Eventos", "Viagens"],
      imageUrl: "/lovable-uploads/97d88f7a-34f8-450e-a9ac-f3c450dc1cfd.png",
      isVerified: true
    }
  ];

  const quickFilters = [
    "Com áudio",
    "Em expediente",
    "Online",
    "Fotos com rosto",
    "Com local",
    "Jovem",
    "A domicílio",
    "Aceita viajar",
    "Festas e eventos",
    "Hotéis"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Acompanhantes em Destaque</h2>
            <p className="text-gray-600">Conheça nossas acompanhantes mais bem avaliadas</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Busque por nome, cidade ou serviço..."
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtros
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600">
              Buscar
            </Button>
          </div>

          {showFilters && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Faixa de Preço
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-24"
                    />
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={50}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-24"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Faixa de Idade
                  </label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      value={ageRange[0]}
                      onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
                      className="w-24"
                    />
                    <Slider
                      value={ageRange}
                      onValueChange={setAgeRange}
                      min={18}
                      max={60}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={ageRange[1]}
                      onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
                      className="w-24"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Distância Máxima (km)
                  </label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={distance}
                      onValueChange={setDistance}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={distance[0]}
                      onChange={(e) => setDistance([+e.target.value])}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span>Premium</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span>Verificada</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox />
                    <span>Online</span>
                  </label>
                </div>

                <div>
                  <p className="font-medium mb-2">Filtros Rápidos</p>
                  <div className="flex flex-wrap gap-2">
                    {quickFilters.map((filter) => (
                      <Badge
                        key={filter}
                        variant="outline"
                        className="cursor-pointer hover:bg-pink-50"
                      >
                        {filter}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">
                  Limpar Filtros
                </Button>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  Aplicar
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className={`grid ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        } gap-6`}>
          {companions.map((companion) => (
            <CompanionCard key={companion.id} {...companion} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;