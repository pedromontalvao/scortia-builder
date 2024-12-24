import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

export const ErrorState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-6 min-h-[400px]">
          <AlertCircle className="h-16 w-16 text-red-500 animate-bounce" />
          <div className="text-center space-y-2">
            <p className="text-red-500 font-medium text-lg">
              Erro ao carregar acompanhantes
            </p>
            <p className="text-gray-500">
              Por favor, tente novamente mais tarde
            </p>
          </div>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="hover:bg-pink-50"
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
};