import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, Heart } from "lucide-react";

export const CommunityRules = () => {
  const rules = [
    {
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      title: "Respeito Mútuo",
      description: "Trate todos com respeito e dignidade."
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      title: "Conteúdo Apropriado",
      description: "Evite conteúdo explícito ou inadequado."
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "Comunidade Segura",
      description: "Denuncie conteúdo impróprio ou ofensivo."
    }
  ];

  return (
    <Card className="bg-white/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Regras da Comunidade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-start gap-3">
              {rule.icon}
              <div>
                <h4 className="font-medium">{rule.title}</h4>
                <p className="text-sm text-gray-600">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};