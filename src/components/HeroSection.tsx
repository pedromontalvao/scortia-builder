import { Search, MapPin, Star, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-90" />
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="text-center text-white space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold animate-fade-in">
            Encontre a Companhia Perfeita
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-fade-in animation-delay-200">
            As melhores acompanhantes em um só lugar, com segurança e discrição
          </p>
          
          <div className="max-w-3xl mx-auto animate-fade-in animation-delay-300">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Busque por nome, cidade ou serviço..."
                  className="pl-10 h-12 w-full bg-white/90 text-gray-900 backdrop-blur-sm"
                />
              </div>
              <Button className="h-12 px-8 bg-[#15171E] hover:bg-gray-900 group">
                Buscar
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
            <MapPin className="h-10 w-10" />
            <div>
              <h3 className="font-semibold text-lg">Localização</h3>
              <p>Encontre acompanhantes próximas a você</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
            <Star className="h-10 w-10" />
            <div>
              <h3 className="font-semibold text-lg">Avaliações</h3>
              <p>Feedback real de clientes verificados</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors">
            <Shield className="h-10 w-10" />
            <div>
              <h3 className="font-semibold text-lg">Segurança</h3>
              <p>Perfis verificados e confiáveis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};