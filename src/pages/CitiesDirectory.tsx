import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Search, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface City {
  name: string;
  state: string;
  url: string;
  hasCompanions: boolean;
  companionCount?: number;
  neighborhoods?: string[];
}

interface StateGroup {
  [key: string]: City[];
}

const BRAZILIAN_STATES = [
  { name: "Acre", abbr: "AC" },
  { name: "Alagoas", abbr: "AL" },
  { name: "Amapá", abbr: "AP" },
  { name: "Amazonas", abbr: "AM" },
  { name: "Bahia", abbr: "BA" },
  { name: "Ceará", abbr: "CE" },
  { name: "Distrito Federal", abbr: "DF" },
  { name: "Espírito Santo", abbr: "ES" },
  { name: "Goiás", abbr: "GO" },
  { name: "Maranhão", abbr: "MA" },
  { name: "Mato Grosso", abbr: "MT" },
  { name: "Mato Grosso do Sul", abbr: "MS" },
  { name: "Minas Gerais", abbr: "MG" },
  { name: "Pará", abbr: "PA" },
  { name: "Paraíba", abbr: "PB" },
  { name: "Paraná", abbr: "PR" },
  { name: "Pernambuco", abbr: "PE" },
  { name: "Piauí", abbr: "PI" },
  { name: "Rio de Janeiro", abbr: "RJ" },
  { name: "Rio Grande do Norte", abbr: "RN" },
  { name: "Rio Grande do Sul", abbr: "RS" },
  { name: "Rondônia", abbr: "RO" },
  { name: "Roraima", abbr: "RR" },
  { name: "Santa Catarina", abbr: "SC" },
  { name: "São Paulo", abbr: "SP" },
  { name: "Sergipe", abbr: "SE" },
  { name: "Tocantins", abbr: "TO" }
];

export const CitiesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: cities, isLoading } = useQuery({
    queryKey: ['cities-directory', searchTerm],
    queryFn: async () => {
      console.log("Fetching cities data with search term:", searchTerm);
      
      try {
        // Get cities and neighborhoods with companions
        const { data: companionLocations, error: companionError } = await supabase
          .from('companions')
          .select('city, state, neighborhood')
          .eq('is_published', true)
          .eq('is_verified', true);

        if (companionError) throw companionError;

        // Create a map of cities with companions and their neighborhoods
        const citiesWithCompanions = new Map();
        companionLocations?.forEach(location => {
          const key = `${location.city}-${location.state}`;
          if (!citiesWithCompanions.has(key)) {
            citiesWithCompanions.set(key, {
              count: 1,
              neighborhoods: new Set([location.neighborhood])
            });
          } else {
            const cityData = citiesWithCompanions.get(key);
            cityData.count++;
            cityData.neighborhoods.add(location.neighborhood);
          }
        });

        // Organize cities by state
        const organizedCities = BRAZILIAN_STATES.reduce((acc: StateGroup, state) => {
          // Filter by search term if present
          if (searchTerm && !state.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return acc;
          }

          acc[state.name] = [];
          
          // Add major cities for each state
          const majorCities = getMajorCitiesForState(state.name);
          majorCities.forEach(cityName => {
            const cityStateKey = `${cityName}-${state.name}`;
            const companionData = citiesWithCompanions.get(cityStateKey);
            
            acc[state.name].push({
              name: cityName,
              state: state.name,
              url: `/${cityName.toLowerCase().replace(/ /g, "-")}`,
              hasCompanions: !!companionData,
              companionCount: companionData?.count || 0,
              neighborhoods: companionData ? Array.from(companionData.neighborhoods) : []
            });
          });
          
          return acc;
        }, {});

        console.log("Cities organized by state:", organizedCities);
        return organizedCities;
      } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false
  });

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
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="text-pink-500 h-6 w-6" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cidades Disponíveis
            </h1>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cidade ou estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(cities || {}).map(([state, stateCities]) => (
            <Card 
              key={state} 
              className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-purple-50"
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {state}
                </h2>
                <ScrollArea className="h-48 pr-4">
                  <div className="space-y-4">
                    {stateCities.map((city) => (
                      <div key={city.url} className="space-y-2">
                        <div className="flex items-center justify-between">
                          {city.hasCompanions ? (
                            <Link
                              to={city.url}
                              className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                            >
                              <ChevronRight className="h-4 w-4" />
                              <span>{city.name}</span>
                              <Badge variant="secondary" className="ml-2">
                                {city.companionCount}
                              </Badge>
                            </Link>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-400">
                              <ChevronRight className="h-4 w-4" />
                              <span>{city.name}</span>
                              <Badge variant="outline" className="ml-2">
                                Em breve
                              </Badge>
                            </div>
                          )}
                        </div>
                        {city.hasCompanions && city.neighborhoods && city.neighborhoods.length > 0 && (
                          <div className="ml-6 text-sm">
                            <p className="text-gray-500 mb-1">Bairros:</p>
                            <div className="flex flex-wrap gap-1">
                              {city.neighborhoods.map((neighborhood) => (
                                <Badge 
                                  key={neighborhood} 
                                  variant="secondary"
                                  className="text-xs bg-purple-100 text-purple-700"
                                >
                                  {neighborhood}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get major cities for each state
function getMajorCitiesForState(state: string): string[] {
  const majorCities: { [key: string]: string[] } = {
    "São Paulo": ["São Paulo", "Campinas", "Santos", "Guarulhos", "São Bernardo do Campo"],
    "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "São Gonçalo", "Duque de Caxias"],
    "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
    "Mato Grosso": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop"],
    // Add more states and their major cities as needed
  };

  return majorCities[state] || ["Capital"]; // Return capital as default if no cities defined
}