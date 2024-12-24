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
}

interface StateGroup {
  [key: string]: City[];
}

export const CitiesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: cities, isLoading } = useQuery({
    queryKey: ['cities-directory', searchTerm],
    queryFn: async () => {
      console.log("Fetching cities data with search term:", searchTerm);
      
      try {
        // First, get cities with companions
        const { data: companionCities, error: companionError } = await supabase
          .from('companions')
          .select('city, state')
          .eq('is_published', true)
          .eq('is_verified', true);

        if (companionError) throw companionError;

        // Get all Brazilian cities from IBGE API
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        const allCities = await response.json();

        // Create a map of cities with companions
        const citiesWithCompanions = new Set(
          companionCities?.map(c => `${c.city}-${c.state}`) || []
        );

        // Organize cities by state
        const organizedCities = allCities.reduce((acc: StateGroup, city: any) => {
          const stateName = city.microrregiao.mesorregiao.UF.nome;
          const cityName = city.nome;
          const cityStateKey = `${cityName}-${stateName}`;
          
          // Filter by search term if present
          if (searchTerm && !cityName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return acc;
          }

          if (!acc[stateName]) {
            acc[stateName] = [];
          }
          
          acc[stateName].push({
            name: cityName,
            state: stateName,
            url: `/${cityName.toLowerCase().replace(/ /g, "-")}`,
            hasCompanions: citiesWithCompanions.has(cityStateKey),
            companionCount: companionCities?.filter(c => 
              c.city === cityName && c.state === stateName
            ).length
          });
          
          return acc;
        }, {});

        console.log("Cities organized by state:", organizedCities);
        return organizedCities;
      } catch (error) {
        console.error("Error fetching cities:", error);
        throw error;
      }
    }
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
              placeholder="Buscar cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(cities || {}).sort().map(([state, stateCities]) => (
            <Card 
              key={state} 
              className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-purple-50"
            >
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {state}
                </h2>
                <ScrollArea className="h-48 pr-4">
                  <div className="space-y-2">
                    {stateCities.sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                      <div key={city.url} className="flex items-center justify-between">
                        {city.hasCompanions ? (
                          <Link
                            to={city.url}
                            className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span>{city.name}</span>
                            {city.companionCount && (
                              <Badge variant="secondary" className="ml-2">
                                {city.companionCount}
                              </Badge>
                            )}
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