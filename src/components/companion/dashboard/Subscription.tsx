import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Rocket, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: string;
  type: "free" | "premium" | "booster";
  features: string[];
  isActive?: boolean;
  expiresAt?: string;
}

export const Subscription = () => {
  const { toast } = useToast();
  const [activePlan, setActivePlan] = useState<Plan | null>(null);

  // Mock data - in a real app this would come from an API
  const plans: Plan[] = [
    {
      id: "free",
      name: "Plano Gratuito",
      price: 0,
      duration: "30 dias",
      type: "free",
      features: [
        "Verificação por 30 dias",
        "2 fotos de perfil",
        "Perfil básico",
        "Chat com clientes"
      ],
      isActive: true,
      expiresAt: "2024-04-20"
    },
    {
      id: "premium",
      name: "Plano Premium",
      price: 99.90,
      duration: "Mensal",
      type: "premium",
      features: [
        "Rankeamento prioritário",
        "Até 10 fotos",
        "Upload de vídeos",
        "Upload de áudios",
        "Destaque nos resultados",
        "Estatísticas avançadas",
        "Chat ilimitado",
        "Suporte prioritário"
      ]
    },
    {
      id: "booster",
      name: "Plano Booster",
      price: 49.90,
      duration: "7 dias",
      type: "booster",
      features: [
        "Destaque máximo nos resultados",
        "Selo especial no perfil",
        "+5 fotos temporárias",
        "Notificações push para clientes",
        "Aparece na página inicial",
        "Estatísticas em tempo real"
      ]
    }
  ];

  const handleSubscribe = (plan: Plan) => {
    // Here we would handle the subscription process
    toast({
      title: "Assinar plano",
      description: `Você selecionou o ${plan.name}. Em breve você será redirecionado para o pagamento.`,
    });
  };

  const getPlanIcon = (type: Plan["type"]) => {
    switch (type) {
      case "premium":
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case "booster":
        return <Rocket className="w-6 h-6 text-pink-500" />;
      default:
        return <Star className="w-6 h-6 text-blue-500" />;
    }
  };

  const getPlanBadge = (plan: Plan) => {
    if (plan.isActive) {
      return (
        <Badge variant="success" className="absolute top-2 right-2">
          Plano Atual
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <div className="flex items-center gap-2">
                {getPlanIcon(plan.type)}
                <CardTitle>{plan.name}</CardTitle>
              </div>
              {getPlanBadge(plan)}
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-bold">
                    {plan.price === 0 ? (
                      "Grátis"
                    ) : (
                      <>
                        R$ {plan.price.toFixed(2)}
                        <span className="text-sm text-gray-500">/{plan.duration}</span>
                      </>
                    )}
                  </p>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.isActive ? (
                  <div className="text-sm text-gray-500">
                    Expira em: {new Date(plan.expiresAt!).toLocaleDateString()}
                  </div>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={() => handleSubscribe(plan)}
                  >
                    Assinar Agora
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Assinaturas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500">
            Nenhuma assinatura anterior encontrada.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};