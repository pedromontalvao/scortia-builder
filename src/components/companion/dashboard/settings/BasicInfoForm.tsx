import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { getStates, getCitiesByState, getNeighborhoodsByCity } from "@/lib/locations";

interface BasicInfoFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export const BasicInfoForm = ({ initialData, onSave }: BasicInfoFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [state, setState] = useState(initialData?.state || "");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState(initialData?.city || "");
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(initialData?.neighborhood || "");
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || "");
  const { toast } = useToast();

  const handleStateChange = async (newState: string) => {
    setState(newState);
    try {
      const citiesList = await getCitiesByState(newState);
      setCities(citiesList);
      setSelectedCity("");
      setSelectedNeighborhood("");
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast({
        title: "Erro ao carregar cidades",
        description: "Não foi possível carregar a lista de cidades.",
        variant: "destructive"
      });
    }
  };

  const handleCityChange = async (newCity: string) => {
    setSelectedCity(newCity);
    try {
      const neighborhoodsList = await getNeighborhoodsByCity(newCity);
      setNeighborhoods(neighborhoodsList);
      setSelectedNeighborhood("");
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
      toast({
        title: "Erro ao carregar bairros",
        description: "Não foi possível carregar a lista de bairros.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = () => {
    onSave({
      name,
      description,
      state,
      city: selectedCity,
      neighborhood: selectedNeighborhood,
      whatsapp
    });
  };

  return (
    <form className="space-y-6">
      <div>
        <Label htmlFor="name">Nome Artístico</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="state">Estado</Label>
          <Select value={state} onValueChange={handleStateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent>
              {/* Add state options */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Select value={selectedCity} onValueChange={handleCityChange}>
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
          <Label htmlFor="neighborhood">Bairro</Label>
          <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
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

      <div>
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
      </div>
    </form>
  );
};