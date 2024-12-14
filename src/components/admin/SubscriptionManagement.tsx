import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SubscriptionManagement = () => {
  const { toast } = useToast();

  // Mock data - in a real app this would come from an API
  const plans = [
    {
      id: "1",
      name: "Plano Básico",
      price: 99.90,
      duration: "30 dias",
      features: ["2 fotos", "Verificação", "Perfil básico"],
      status: "active",
    },
    {
      id: "2",
      name: "Plano Premium",
      price: 199.90,
      duration: "30 dias",
      features: ["10 fotos", "Verificação", "Destaque", "Analytics"],
      status: "active",
    },
  ];

  const handleEdit = (planId: string) => {
    toast({
      title: "Editar plano",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  const handleCreate = () => {
    toast({
      title: "Novo plano",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Planos de Assinatura</h2>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Plano
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Recursos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell>R$ {plan.price.toFixed(2)}</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {plan.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={plan.status === "active" ? "success" : "secondary"}>
                    {plan.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(plan.id)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};