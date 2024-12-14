import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getStates, getCitiesByState, getNeighborhoodsByCity } from "@/lib/locations";

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

  useEffect(() => {
    const loadStates = async () => {
      const statesList = await getStates();
      setStates(statesList);
    };
    loadStates();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (selectedState) {
        const citiesList = await getCitiesByState(selectedState);
        setCities(citiesList);
      }
    };
    loadCities();
  }, [selectedState]);

  useEffect(() => {
    const loadNeighborhoods = async () => {
      if (selectedCity) {
        const neighborhoodsList = await getNeighborhoodsByCity(selectedCity);
        setNeighborhoods(neighborhoodsList);
      }
    };
    loadNeighborhoods();
  }, [selectedCity]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label>Estado</Label>
        <Select value={selectedState} onValueChange={onStateChange}>
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
        <Select value={selectedCity} onValueChange={onCityChange}>
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
        <Select value={selectedNeighborhood} onValueChange={onNeighborhoodChange}>
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