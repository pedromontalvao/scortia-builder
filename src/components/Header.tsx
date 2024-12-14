import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AuthDialog } from "./auth/AuthDialog";
import { useToast } from "./ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [defaultAuthTab, setDefaultAuthTab] = useState<"login" | "register">("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userType");
    toast({
      title: "Logout realizado com sucesso",
      description: "Até logo!"
    });
    navigate("/");
  };

  const NavItems = () => (
    <>
      {isLoggedIn ? (
        <>
          <Button 
            variant="ghost" 
            className="text-white hover:text-pink-500"
            onClick={() => navigate(userType === "companion" ? "/painel" : "/perfil")}
          >
            Meu Painel
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:text-pink-500"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className="text-white hover:text-pink-500"
            onClick={() => {
              setDefaultAuthTab("login");
              setShowAuthDialog(true);
            }}
          >
            Entrar
          </Button>
          <Button
            className="bg-pink-500 hover:bg-pink-600"
            onClick={() => {
              setDefaultAuthTab("register");
              setShowAuthDialog(true);
            }}
          >
            Cadastrar
          </Button>
        </>
      )}
    </>
  );

  return (
    <header className="bg-[#15171E] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-pink-500 h-6 w-6" />
            <a href="/" className="text-2xl font-bold tracking-tight">
              VIV<span className="text-pink-500">ACOMPANHANTES</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Input 
              type="search"
              placeholder="Buscar acompanhantes..."
              className="w-64 bg-gray-800 border-gray-700 focus:ring-pink-500"
            />
            <Input
              type="text"
              placeholder="Localização"
              className="w-48 bg-gray-800 border-gray-700 focus:ring-pink-500"
            />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <NavItems />
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#15171E] text-white border-gray-800">
              <div className="flex flex-col gap-4 mt-8">
                <Input 
                  type="search"
                  placeholder="Buscar acompanhantes..."
                  className="bg-gray-800 border-gray-700"
                />
                <Input
                  type="text"
                  placeholder="Localização"
                  className="bg-gray-800 border-gray-700"
                />
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        defaultTab={defaultAuthTab}
      />
    </header>
  );
};