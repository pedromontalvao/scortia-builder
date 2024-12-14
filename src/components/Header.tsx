import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Header = () => {
  return (
    <header className="bg-[#15171E] text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-pink-500" />
            <span className="text-2xl font-bold">VIV<span className="text-pink-500">ACOMPANHANTES</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Input 
              type="search"
              placeholder="Buscar acompanhantes..."
              className="w-64 bg-gray-800 border-gray-700"
            />
            <Input
              type="text"
              placeholder="Localização"
              className="w-48 bg-gray-800 border-gray-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-white hover:text-pink-500">
              Entrar
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600">
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};