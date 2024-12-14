import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#15171E] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">VivAcompanhantes</h3>
            <p className="text-gray-400">
              A melhor plataforma para encontrar acompanhantes de qualidade, com segurança e discrição.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-500">Sobre Nós</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500">Cadastre-se</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500">Login</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-pink-500">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500">Termos de Uso</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-500">Política de Privacidade</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-400">
              <p>contato@vivacompanhantes.com</p>
              <p>(11) 9999-9999</p>
              <p>Seg - Sex, 9h às 18h</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-pink-500"><Facebook /></a>
                <a href="#" className="hover:text-pink-500"><Instagram /></a>
                <a href="#" className="hover:text-pink-500"><Twitter /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};