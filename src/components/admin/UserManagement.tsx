import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, UserCheck, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UserManagement = () => {
  const [userType, setUserType] = useState("companions");
  const { toast } = useToast();

  // Mock data - in a real app this would come from an API
  const users = [
    {
      id: "1",
      name: "Isabella Santos",
      email: "isabella@example.com",
      status: "pending",
      type: "companion",
      createdAt: "2024-02-20",
    },
    {
      id: "2",
      name: "João Silva",
      email: "joao@example.com",
      status: "active",
      type: "client",
      createdAt: "2024-02-19",
    },
  ];

  const handleApprove = (userId: string) => {
    // In a real app, this would call an API
    toast({
      title: "Usuário aprovado",
      description: "O usuário foi aprovado com sucesso.",
    });
  };

  const handleBan = (userId: string) => {
    // In a real app, this would call an API
    toast({
      title: "Usuário banido",
      description: "O usuário foi banido com sucesso.",
      variant: "destructive",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={userType} onValueChange={setUserType}>
          <TabsList className="mb-6">
            <TabsTrigger value="companions">Acompanhantes</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="companions">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.filter(user => user.type === "companion").map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "success" : "secondary"}>
                        {user.status === "active" ? "Ativo" : "Pendente"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(user.id)}
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleBan(user.id)}
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Banir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="clients">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.filter(user => user.type === "client").map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "success" : "secondary"}>
                        {user.status === "active" ? "Ativo" : "Pendente"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleBan(user.id)}
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Banir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};