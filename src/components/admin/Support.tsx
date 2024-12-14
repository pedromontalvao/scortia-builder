import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Support = () => {
  const { toast } = useToast();

  // Mock data - in a real app this would come from an API
  const tickets = [
    {
      id: "1",
      user: "João Silva",
      subject: "Problema com pagamento",
      status: "open",
      priority: "high",
      createdAt: "2024-02-20",
    },
    {
      id: "2",
      user: "Maria Santos",
      subject: "Dúvida sobre verificação",
      status: "closed",
      priority: "medium",
      createdAt: "2024-02-19",
    },
  ];

  const handleReply = (ticketId: string) => {
    toast({
      title: "Responder ticket",
      description: "Funcionalidade em desenvolvimento.",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="text-blue-500" />
          <h2 className="text-xl font-semibold">Tickets de Suporte</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.user}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  <Badge variant={ticket.status === "open" ? "secondary" : "success"}>
                    {ticket.status === "open" ? "Aberto" : "Fechado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.priority === "high"
                        ? "destructive"
                        : ticket.priority === "medium"
                        ? "warning"
                        : "default"
                    }
                  >
                    {ticket.priority === "high"
                      ? "Alta"
                      : ticket.priority === "medium"
                      ? "Média"
                      : "Baixa"}
                  </Badge>
                </TableCell>
                <TableCell>{ticket.createdAt}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReply(ticket.id)}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Responder
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