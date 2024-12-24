import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const MatchingWidget = () => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Rodada de Seleção</span>
          <Clock className="text-purple-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Próxima rodada em:</span>
            <span className="font-semibold">23:45:12</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>5 perfis disponíveis para você</span>
          </div>

          <Button className="w-full" asChild>
            <Link to="/matching">
              Participar da Rodada
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};