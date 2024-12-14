import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Grid, List, Search } from "lucide-react";
import { ServiceFilters } from "./filters/ServiceFilters";
import { CharacteristicsFilters } from "./filters/CharacteristicsFilters";
import { LocationFilters } from "./filters/LocationFilters";

interface SearchFiltersProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  onSearch: (filters: any) => void;
}

export const SearchFilters = ({ viewMode, setViewMode, onSearch }: SearchFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedEthnicity, setSelectedEthnicity] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");
  const [selectedHairColor, setSelectedHairColor] = useState("");

  const handleSearch = () => {
    onSearch({
      searchTerm,
      priceRange,
      services: selectedServices,
      state: selectedState,
      city: selectedCity,
      neighborhood: selectedNeighborhood,
      ethnicity: selectedEthnicity,
      bodyType: selectedBodyType,
      hairColor: selectedHairColor,
    });
  };

  const handleServiceChange = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
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

          <LocationFilters
            selectedState={selectedState}
            selectedCity={selectedCity}
            selectedNeighborhood={selectedNeighborhood}
            onStateChange={setSelectedState}
            onCityChange={setSelectedCity}
            onNeighborhoodChange={setSelectedNeighborhood}
          />

          <ServiceFilters
            selectedServices={selectedServices}
            onServiceChange={handleServiceChange}
          />

          <CharacteristicsFilters
            selectedEthnicity={selectedEthnicity}
            selectedBodyType={selectedBodyType}
            selectedHairColor={selectedHairColor}
            onEthnicityChange={setSelectedEthnicity}
            onBodyTypeChange={setSelectedBodyType}
            onHairColorChange={setSelectedHairColor}
          />
        </div>
      )}
    </div>
  );
};