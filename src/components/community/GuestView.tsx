import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useState } from "react";
import { Users, MessageCircle, TrendingUp } from "lucide-react";

export const GuestView = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Bem-vindo à Comunidade VivAcompanhantes
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Participe de discussões, compartilhe experiências e conecte-se com outros membros da comunidade.
        </p>
        <Button 
          onClick={() => setShowAuthDialog(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Entrar para Participar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Comunidade Ativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Junte-se a milhares de usuários compartilhando experiências e dicas.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-pink-500" />
              Discussões Relevantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Participe de conversas sobre segurança, dicas e experiências.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Conteúdo Exclusivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Acesse conteúdo premium e exclusivo das acompanhantes.
            </p>
          </CardContent>
        </Card>
      </div>

      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)}
      />
    </div>
  );
};