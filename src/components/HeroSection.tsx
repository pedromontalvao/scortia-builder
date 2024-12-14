import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-pink-600 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Encontre a Companhia Perfeita
        </h1>
        <p className="text-xl mb-8">
          As melhores acompanhantes em um só lugar
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Busque por nome, cidade ou serviço..."
                className="pl-10 h-12 w-full bg-white text-gray-900"
              />
            </div>
            <Button className="h-12 px-8 bg-[#15171E] hover:bg-gray-900">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};