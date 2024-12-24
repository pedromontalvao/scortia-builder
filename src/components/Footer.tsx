import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface City {
  name: string;
  state: string;
  url: string;
}

export const Footer = () => {
  const [userCity, setUserCity] = useState<string | null>(null);
  const [popularCities, setPopularCities] = useState<City[]>([
    { name: "Cuiabá", state: "MT", url: "/cidades/cuiaba" },
    { name: "Várzea Grande", state: "MT", url: "/cidades/varzea-grande" },
    { name: "Rondonópolis", state: "MT", url: "/cidades/rondonopolis" },
    { name: "Sinop", state: "MT", url: "/cidades/sinop" },
    { name: "Tangará da Serra", state: "MT", url: "/cidades/tangara-da-serra" },
    { name: "Cáceres", state: "MT", url: "/cidades/caceres" },
    { name: "Primavera do Leste", state: "MT", url: "/cidades/primavera-do-leste" },
    { name: "Barra do Garças", state: "MT", url: "/cidades/barra-do-garcas" }
  ]);

  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        console.log('Attempting to detect user location...');
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        console.log('User location detected:', data);
        
        if (data.city) {
          setUserCity(data.city);
          
          // Reorder cities based on proximity to user's location
          const reorderedCities = [...popularCities].sort((a, b) => {
            // If one of the cities matches user's city, prioritize it
            if (a.name === data.city) return -1;
            if (b.name === data.city) return 1;
            
            // Prioritize Rondonópolis and major cities
            if (a.name === "Rondonópolis") return -1;
            if (b.name === "Rondonópolis") return 1;
            
            // Keep original order for other cities
            return 0;
          });
          
          setPopularCities(reorderedCities);
        }
      } catch (error) {
        console.error('Error detecting user location:', error);
      }
    };

    detectUserLocation();
  }, []);

  return (
    <footer className="bg-[#15171E] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-pink-500 h-6 w-6" />
              <span className="text-2xl font-bold">
                VIV<span className="text-pink-500">ACOMPANHANTES</span>
              </span>
            </div>
            <p className="text-gray-400">
              A melhor plataforma para encontrar acompanhantes de qualidade, com segurança e discrição.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Sobre Nós</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Cadastre-se</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Login</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Blog</Button></li>
              <li>
                <Link to="/comunidade">
                  <Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">
                    Comunidade
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/cidades">
                  <Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">
                    Cidades
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">FAQ</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Termos de Uso</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Política de Privacidade</Button></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {userCity ? `Principais Cidades próximas a ${userCity}` : 'Principais Cidades'}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {popularCities.map((city) => (
                <Button
                  key={city.url}
                  variant="link"
                  className={`text-gray-400 hover:text-pink-500 p-0 h-auto text-left justify-start ${
                    city.name === userCity ? 'text-pink-500 font-semibold' : ''
                  }`}
                  asChild
                >
                  <Link to={city.url}>{city.name} - {city.state}</Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">SEO Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto text-left justify-start" asChild>
                <Link to="/acompanhantes-cuiaba">Acompanhantes Cuiabá</Link>
              </Button>
              <Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto text-left justify-start" asChild>
                <Link to="/garotas-de-programa-cuiaba">Garotas de Programa Cuiabá</Link>
              </Button>
              <Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto text-left justify-start" asChild>
                <Link to="/acompanhantes-varzea-grande">Acompanhantes Várzea Grande</Link>
              </Button>
              <Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto text-left justify-start" asChild>
                <Link to="/garotas-de-programa-varzea-grande">Garotas de Programa Várzea Grande</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 VivAcompanhantes. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
