import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFoundState = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Acompanhante não encontrada
        </h1>
        <p className="text-gray-600 max-w-md mx-auto">
          O perfil que você está procurando não existe ou foi removido.
          Por favor, tente buscar outra acompanhante.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-pink-500 hover:bg-pink-600"
        >
          Voltar para a Página Inicial
        </Button>
      </div>
    </div>
  );
};