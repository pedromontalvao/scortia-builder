import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useState } from "react";
import { Users, MessageCircle, TrendingUp, Shield, Heart } from "lucide-react";

export const GuestView = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Bem-vindo à Comunidade VivAcompanhantes
        </h1>
        <p className="text-gray-600 text-lg">
          Participe de discussões, compartilhe experiências e conecte-se com outros membros da comunidade.
          Junte-se a nós para uma experiência única e enriquecedora.
        </p>
        <Button 
          onClick={() => setShowAuthDialog(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          Entrar para Participar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card className="bg-white/50 hover:bg-white/80 transition-colors group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
              Comunidade Ativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Junte-se a milhares de usuários compartilhando experiências e dicas valiosas.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 hover:bg-white/80 transition-colors group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" />
              Discussões Relevantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Participe de conversas sobre segurança, dicas e experiências com outros membros.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/50 hover:bg-white/80 transition-colors group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
              Conteúdo Exclusivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Acesse conteúdo premium e exclusivo das acompanhantes verificadas.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Regras da Comunidade</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <Shield className="w-8 h-8 text-purple-500 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-lg">Respeito Mútuo</h4>
              <p className="text-gray-600">
                Mantenha um ambiente respeitoso e acolhedor para todos os membros.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="w-8 h-8 text-pink-500 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-lg">Comunidade Segura</h4>
              <p className="text-gray-600">
                Ajude a manter nossa comunidade segura reportando conteúdo inadequado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)}
      />
    </div>
  );
};