import { Facebook, Instagram, Twitter, Heart } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="bg-[#15171E] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">FAQ</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Contato</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Termos de Uso</Button></li>
              <li><Button variant="link" className="text-gray-400 hover:text-pink-500 p-0 h-auto">Política de Privacidade</Button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-400">
              <p>contato@vivacompanhantes.com</p>
              <p>(11) 9999-9999</p>
              <p>Seg - Sex, 9h às 18h</p>
              <div className="flex gap-4 mt-4">
                <Button variant="ghost" size="icon" className="hover:text-pink-500 p-2">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-pink-500 p-2">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-pink-500 p-2">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
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