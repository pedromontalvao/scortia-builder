import React from 'react';
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export const NotFoundState = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <span className="text-6xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Acompanhante não encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            O perfil que você está procurando não existe ou foi removido.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="w-full"
          >
            <Home className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Button>
        </div>
      </div>
    </div>
  );
};