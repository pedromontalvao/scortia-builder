import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AuthDialog } from "./auth/AuthDialog";
import { useToast } from "./ui/use-toast";

export const Header = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [defaultAuthTab, setDefaultAuthTab] = useState<"login" | "register">("login");
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
          </div>
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