import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase";

const services = [
  "Oral", "Anal", "BDSM", "Tratamento de namorados", "Atriz porno",
  "Ejaculação corporal", "Massagem erótica", "Massagem tântrica",
  "Fetiches", "Beijo francês", "Jogos de interpretação", "Trio",
  "Sexting", "Videochamada"
];

const serviceFor = ["Homens", "Mulheres", "Casais", "Pessoas com deficiência"];

const locations = [
  "Em casa", "Eventos e festas", "Hotel / Motel", "Clubes", "Sem ligação"
];

const ethnicities = [
  "Africana", "Indiana", "Asiática", "Árabe", "Latina", "Caucasiana", "Brasileiras"
];

const nationalities = [
  { label: "Brasileira", flag: "🇧🇷" },
  { label: "Venezuelana", flag: "🇻🇪" },
  { label: "Albanesa", flag: "🇦🇱" },
  { label: "Americana", flag: "🇺🇸" }
];

const breastTypes = ["Seios Natural", "Com silicone"];

const hairColors = [
  "Cabelo Loiro", "Cabelo Castanho", "Cabelo Preto", "Cabelo Ruivo"
];

const bodyTypes = ["Magra", "Curvas", "BBW"];

const weekDays = [
  "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
];

export const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedServiceFor, setSelectedServiceFor] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [ethnicity, setEthnicity] = useState("");
  const [nationality, setNationality] = useState("");
  const [breastType, setBreastType] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [availability, setAvailability] = useState<{[key: string]: {start: string, end: string}}>(
    weekDays.reduce((acc, day) => ({...acc, [day]: {start: "", end: ""}}), {})
  );
  const { toast } = useToast();

  useEffect(() => {
    if (state) {
      fetchCities(state);
    }
  }, [state]);

  useEffect(() => {
    if (selectedCity) {
      fetchNeighborhoods(selectedCity);
    }
  }, [selectedCity]);

  const fetchCities = async (state: string) => {
    const { data, error } = await supabase
      .from('locations')
      .select('city')
      .eq('state', state)
      .order('city');
      
    if (!error && data) {
      setCities([...new Set(data.map(item => item.city))]);
    }
  };

  const fetchNeighborhoods = async (city: string) => {
    const { data, error } = await supabase
      .from('locations')
      .select('neighborhood')
      .eq('city', city)
      .order('neighborhood');
      
    if (!error && data) {
      setNeighborhoods([...new Set(data.map(item => item.neighborhood))]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('companions')
      .update({
        name,
        description,
        state,
        city: selectedCity,
        neighborhood: selectedNeighborhood,
        whatsapp,
        services: selectedServices,
        service_for: selectedServiceFor,
        service_locations: selectedLocations,
        ethnicity,
        nationality,
        breast_type: breastType,
        hair_color: hairColor,
        body_type: bodyType,
        availability
      })
      .eq('id', 'current-user-id'); // You'll need to replace this with actual user ID

    if (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Alterações salvas com sucesso!"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="characteristics">Características</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
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
                  <Select value={state} onValueChange={setState}>
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
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
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
          </TabsContent>

          <TabsContent value="services">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Serviços Oferecidos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedServices([...selectedServices, service]);
                          } else {
                            setSelectedServices(selectedServices.filter(s => s !== service));
                          }
                        }}
                      />
                      <label htmlFor={service}>{service}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Atende</h3>
                <div className="grid grid-cols-2 gap-4">
                  {serviceFor.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={selectedServiceFor.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedServiceFor([...selectedServiceFor, type]);
                          } else {
                            setSelectedServiceFor(selectedServiceFor.filter(t => t !== type));
                          }
                        }}
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Local de Atendimento</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLocations([...selectedLocations, location]);
                          } else {
                            setSelectedLocations(selectedLocations.filter(l => l !== location));
                          }
                        }}
                      />
                      <label htmlFor={location}>{location}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="characteristics">
            <div className="space-y-6">
              <div>
                <Label>Etnia</Label>
                <Select value={ethnicity} onValueChange={setEthnicity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua etnia" />
                  </SelectTrigger>
                  <SelectContent>
                    {ethnicities.map((eth) => (
                      <SelectItem key={eth} value={eth}>
                        {eth}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Nacionalidade</Label>
                <Select value={nationality} onValueChange={setNationality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua nacionalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {nationalities.map((nat) => (
                      <SelectItem key={nat.label} value={nat.label}>
                        {nat.flag} {nat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Seios</Label>
                <Select value={breastType} onValueChange={setBreastType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {breastTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Cabelo</Label>
                <Select value={hairColor} onValueChange={setHairColor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a cor do cabelo" />
                  </SelectTrigger>
                  <SelectContent>
                    {hairColors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tipo de Corpo</Label>
                <Select value={bodyType} onValueChange={setBodyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de corpo" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="availability">
            <div className="space-y-6">
              <h3 className="text-lg font-medium mb-4">Horários de Atendimento</h3>
              {weekDays.map((day) => (
                <div key={day} className="grid grid-cols-3 gap-4 items-center">
                  <Label>{day}</Label>
                  <div>
                    <Input
                      type="time"
                      value={availability[day].start}
                      onChange={(e) => setAvailability({
                        ...availability,
                        [day]: { ...availability[day], start: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      value={availability[day].end}
                      onChange={(e) => setAvailability({
                        ...availability,
                        [day]: { ...availability[day], end: e.target.value }
                      })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button onClick={handleSubmit} className="w-full">
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};