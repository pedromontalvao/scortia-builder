import { Search, MapPin, Star, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 opacity-90" />
      <div className={`absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20 transition-opacity duration-500 ${scrolled ? 'opacity-10' : 'opacity-20'}`} />
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center text-white space-y-8 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100">
            Encontre a Companhia Perfeita
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-fade-in animation-delay-200 text-pink-50">
            As melhores acompanhantes em um só lugar, com segurança e discrição
          </p>
          
          <div className="max-w-3xl mx-auto animate-fade-in animation-delay-300">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                <Input
                  type="search"
                  placeholder="Busque por nome, cidade ou serviço..."
                  className="pl-10 h-12 w-full bg-white/95 backdrop-blur-sm text-gray-900 border-0 ring-2 ring-white/20 focus:ring-pink-500 transition-all"
                />
              </div>
              <Button className="h-12 px-8 bg-pink-600 hover:bg-pink-700 group transition-all duration-300 hover:scale-105">
                Buscar
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <MapPin className="h-10 w-10 text-pink-300" />
            <div>
              <h3 className="font-semibold text-lg">Localização</h3>
              <p className="text-pink-100">Encontre acompanhantes próximas a você</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <Star className="h-10 w-10 text-pink-300" />
            <div>
              <h3 className="font-semibold text-lg">Avaliações</h3>
              <p className="text-pink-100">Feedback real de clientes verificados</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <Shield className="h-10 w-10 text-pink-300" />
            <div>
              <h3 className="font-semibold text-lg">Segurança</h3>
              <p className="text-pink-100">Perfis verificados e confiáveis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};