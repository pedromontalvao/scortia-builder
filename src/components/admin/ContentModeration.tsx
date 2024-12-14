import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContentModeration = () => {
  const { toast } = useToast();

  // Mock data - in a real app this would come from an API
  const reports = [
    {
      id: "1",
      type: "photo",
      reportedUser: "Isabella Santos",
      reason: "Conteúdo inadequado",
      status: "pending",
      createdAt: "2024-02-20",
    },
    {
      id: "2",
      type: "profile",
      reportedUser: "Julia Silva",
      reason: "Informações falsas",
      status: "resolved",
      createdAt: "2024-02-19",
    },
  ];

  const handleApprove = (reportId: string) => {
    toast({
      title: "Conteúdo aprovado",
      description: "O conteúdo foi aprovado e a denúncia arquivada.",
    });
  };

  const handleRemove = (reportId: string) => {
    toast({
      title: "Conteúdo removido",
      description: "O conteúdo foi removido e o usuário notificado.",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertTriangle className="text-yellow-500" />
          <h2 className="text-xl font-semibold">Denúncias Pendentes</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="capitalize">{report.type}</TableCell>
                <TableCell>{report.reportedUser}</TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>
                  <Badge variant={report.status === "resolved" ? "success" : "warning"}>
                    {report.status === "resolved" ? "Resolvido" : "Pendente"}
                  </Badge>
                </TableCell>
                <TableCell>{report.createdAt}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(report.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(report.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remover
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};