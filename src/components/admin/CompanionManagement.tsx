import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Crown, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";

export const CompanionManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: companions, isLoading, refetch } = useQuery({
    queryKey: ['companions'],
    queryFn: async () => {
      let query = supabase
        .from('companions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  });

  const handleVerify = async (companionId: string) => {
    const { error } = await supabase
      .from('companions')
      .update({ is_verified: true })
      .eq('id', companionId);

    if (error) {
      toast({
        title: "Erro ao verificar acompanhante",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Acompanhante verificada",
      description: "A acompanhante foi verificada com sucesso."
    });
    refetch();
  };

  const handleTogglePremium = async (companionId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('companions')
      .update({ is_premium: !currentStatus })
      .eq('id', companionId);

    if (error) {
      toast({
        title: "Erro ao atualizar status premium",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Status premium atualizado",
      description: `Status premium ${!currentStatus ? 'ativado' : 'desativado'} com sucesso.`
    });
    refetch();
  };

  const handleDelete = async (companionId: string) => {
    const { error } = await supabase
      .from('companions')
      .delete()
      .eq('id', companionId);

    if (error) {
      toast({
        title: "Erro ao deletar acompanhante",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Acompanhante deletada",
      description: "A acompanhante foi deletada com sucesso."
    });
    refetch();
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar acompanhante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companions?.map((companion) => (
              <TableRow key={companion.id}>
                <TableCell className="font-medium">{companion.name}</TableCell>
                <TableCell>{companion.whatsapp}</TableCell>
                <TableCell>{`${companion.neighborhood}, ${companion.city} - ${companion.state}`}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {companion.is_verified && (
                      <Badge variant="success">Verificada</Badge>
                    )}
                    {companion.is_premium && (
                      <Badge className="bg-yellow-500">
                        <Crown className="w-4 h-4 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {!companion.is_verified && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerify(companion.id)}
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Verificar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant={companion.is_premium ? "destructive" : "outline"}
                      onClick={() => handleTogglePremium(companion.id, companion.is_premium)}
                    >
                      <Crown className="w-4 h-4 mr-1" />
                      {companion.is_premium ? 'Remover Premium' : 'Tornar Premium'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(companion.id)}
                    >
                      <UserX className="w-4 h-4 mr-1" />
                      Deletar
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