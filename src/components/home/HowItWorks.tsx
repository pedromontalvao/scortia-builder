import { Shield, Heart, Star, MessageCircle, Search } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section className="py-12 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Como Funciona</h2>
        <p className="text-gray-600 mt-2">Conheça o processo simples e seguro</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="font-semibold text-lg">Busque</h3>
          <p className="text-gray-600">Encontre a acompanhante ideal usando nossos filtros avançados</p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="font-semibold text-lg">Escolha</h3>
          <p className="text-gray-600">Veja fotos, avaliações e informações detalhadas</p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="font-semibold text-lg">Contate</h3>
          <p className="text-gray-600">Entre em contato diretamente com a acompanhante</p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="font-semibold text-lg">Avalie</h3>
          <p className="text-gray-600">Compartilhe sua experiência com a comunidade</p>
        </div>
      </div>
    </section>
  );
};
