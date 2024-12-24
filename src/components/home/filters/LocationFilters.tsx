import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getStates, getCitiesByState, getNeighborhoodsByCity } from "@/lib/locations";
import { useToast } from "@/hooks/use-toast";

interface LocationFiltersProps {
  selectedState: string;
  selectedCity: string;
  selectedNeighborhood: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onNeighborhoodChange: (value: string) => void;
}

export const LocationFilters = ({
  selectedState,
  selectedCity,
  selectedNeighborhood,
  onStateChange,
  onCityChange,
  onNeighborhoodChange,
}: LocationFiltersProps) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadStates = async () => {
      try {
        setIsLoading(true);
        const statesList = await getStates();
        console.log('States loaded:', statesList);
        setStates(statesList);
      } catch (error) {
        console.error('Error loading states:', error);
        toast({
          title: "Erro ao carregar estados",
          description: "Não foi possível carregar a lista de estados.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadStates();
  }, [toast]);

  useEffect(() => {
    const loadCities = async () => {
      if (selectedState) {
        try {
          setIsLoading(true);
          const citiesList = await getCitiesByState(selectedState);
          console.log('Cities loaded for state:', selectedState, citiesList);
          setCities(citiesList);
        } catch (error) {
          console.error('Error loading cities:', error);
          toast({
            title: "Erro ao carregar cidades",
            description: "Não foi possível carregar a lista de cidades.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadCities();
  }, [selectedState, toast]);

  useEffect(() => {
    const loadNeighborhoods = async () => {
      if (selectedCity) {
        try {
          setIsLoading(true);
          const neighborhoodsList = await getNeighborhoodsByCity(selectedCity);
          console.log('Neighborhoods loaded for city:', selectedCity, neighborhoodsList);
          setNeighborhoods(neighborhoodsList);
        } catch (error) {
          console.error('Error loading neighborhoods:', error);
          toast({
            title: "Erro ao carregar bairros",
            description: "Não foi possível carregar a lista de bairros.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadNeighborhoods();
  }, [selectedCity, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label>Estado</Label>
        <Select 
          value={selectedState} 
          onValueChange={onStateChange}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Cidade</Label>
        <Select 
          value={selectedCity} 
          onValueChange={onCityChange}
          disabled={isLoading || !selectedState}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cidade" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Bairro</Label>
        <Select 
          value={selectedNeighborhood} 
          onValueChange={onNeighborhoodChange}
          disabled={isLoading || !selectedCity}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o bairro" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoods.map((neighborhood) => (
              <SelectItem key={neighborhood} value={neighborhood}>
                {neighborhood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};