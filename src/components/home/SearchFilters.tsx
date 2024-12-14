import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Grid, List, Search } from "lucide-react";

interface SearchFiltersProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onSearch: (filters: any) => void;
}

export const SearchFilters = ({ viewMode, setViewMode, onSearch }: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ageRange, setAgeRange] = useState([18, 60]);
  const [distance, setDistance] = useState([50]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = () => {
    onSearch({
      searchTerm,
      priceRange,
      ageRange,
      distance,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Busque por nome, cidade ou serviço..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtros
        </Button>
        <Button className="bg-pink-500 hover:bg-pink-600" onClick={handleSearch}>
          Buscar
        </Button>
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
        </div>
      )}
    </div>
  );
};