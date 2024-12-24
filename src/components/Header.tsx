import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, LogOut, Menu, User, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AuthDialog } from "./auth/AuthDialog";
import { useToast } from "./ui/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/lib/supabase";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [defaultAuthTab, setDefaultAuthTab] = useState<"login" | "register">("login");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const debouncedLocation = useDebounce(location, 500);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearch && !debouncedLocation) return;
      
      setIsSearching(true);
      console.log('Performing search with:', { debouncedSearch, debouncedLocation });

      try {
        let query = supabase
          .from('companions')
          .select('*')
          .limit(10);

        if (debouncedSearch) {
          query = query.ilike('name', `%${debouncedSearch}%`);
        }

        if (debouncedLocation) {
          query = query.or(`city.ilike.%${debouncedLocation}%,neighborhood.ilike.%${debouncedLocation}%`);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Search error:', error);
          toast({
            title: "Erro na busca",
            description: "Não foi possível realizar a busca. Tente novamente.",
            variant: "destructive"
          });
          return;
        }

        console.log('Search results:', data);
        setSearchResults(data || []);

        // Navigate to search results page with filters
        navigate(`/?search=${encodeURIComponent(debouncedSearch)}&location=${encodeURIComponent(debouncedLocation)}`);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearch, debouncedLocation, navigate, toast]);

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:text-pink-500">
              <User className="w-4 h-4 mr-2" />
              Minha Conta
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(userType === "companion" ? "/painel" : "/perfil")}>
              Meu Painel
            </DropdownMenuItem>
            {userType === "admin" && (
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                Painel Admin
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            <div className="relative">
              <Input 
                type="search"
                placeholder="Buscar acompanhantes..."
                className="w-64 bg-gray-800 border-gray-700 focus:ring-pink-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
              )}
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Localização"
                className="w-48 bg-gray-800 border-gray-700 focus:ring-pink-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {isSearching && (
                <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
              )}
            </div>
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
                <div className="relative">
                  <Input 
                    type="search"
                    placeholder="Buscar acompanhantes..."
                    className="bg-gray-800 border-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
                  )}
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Localização"
                    className="bg-gray-800 border-gray-700"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />
                  )}
                </div>
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