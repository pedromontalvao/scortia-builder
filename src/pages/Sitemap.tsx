import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface City {
  name: string;
  state: string;
  url: string;
}

interface StateGroup {
  [key: string]: City[];
}

export const Sitemap = () => {
  const [cities, setCities] = useState<StateGroup>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        console.log("Fetching cities data...");
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        const data = await response.json();
        
        const organizedCities = data.reduce((acc: StateGroup, city: any) => {
          const stateName = city.microrregiao.mesorregiao.UF.nome;
          const cityName = city.nome;
          
          if (!acc[stateName]) {
            acc[stateName] = [];
          }
          
          acc[stateName].push({
            name: cityName,
            state: stateName,
            url: `/${cityName.toLowerCase().replace(/ /g, "-")}`
          });
          
          return acc;
        }, {});

        console.log("Cities organized by state:", organizedCities);
        setCities(organizedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast({
          title: "Erro ao carregar cidades",
          description: "Não foi possível carregar a lista de cidades.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <MapPin className="text-pink-500 h-6 w-6" />
        <h1 className="text-3xl font-bold">Mapa do Site</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cities).sort().map(([state, stateCities]) => (
          <Card key={state} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {state}
              </h2>
              <ScrollArea className="h-48 pr-4">
                <div className="space-y-2">
                  {stateCities.sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                    <Link
                      key={city.url}
                      to={city.url}
                      className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span>{city.name}</span>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};