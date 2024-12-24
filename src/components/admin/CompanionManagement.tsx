import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCheck, UserX, Crown, Search, Eye, MessageSquare, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CompanionManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const { data: companions, isLoading, refetch } = useQuery({
    queryKey: ['companions', searchTerm, filterStatus],
    queryFn: async () => {
      console.log('Fetching companions with filters:', { searchTerm, filterStatus });
      
      let query = supabase
        .from('companions')
        .select(`
          *,
          companion_photos (url, is_primary),
          stats:companion_stats (total_views, total_messages, total_appointments)
        `)
        .order('created_at', { ascending: false });
      
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,whatsapp.ilike.%${searchTerm}%`);
      }

      if (filterStatus !== 'all') {
        query = query.eq('is_verified', filterStatus === 'verified');
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching companions:', error);
        throw error;
      }

      console.log('Fetched companions:', data);
      return data || [];
    }
  });

  const handleVerify = async (companionId: string) => {
    const { error } = await supabase
      .from('companions')
      .update({ 
        is_verified: true,
        verified_at: new Date().toISOString()
      })
      .eq('id', companionId);

    if (error) {
      console.error('Error verifying companion:', error);
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
      .update({ 
        is_premium: !currentStatus,
        premium_updated_at: new Date().toISOString()
      })
      .eq('id', companionId);

    if (error) {
      console.error('Error updating premium status:', error);
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
      console.error('Error deleting companion:', error);
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
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Carregando...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Acompanhantes</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou WhatsApp..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="verified">Verificadas</SelectItem>
              <SelectItem value="unverified">Não verificadas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Métricas</TableHead>
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
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Eye className="w-4 h-4" />
                        {companion.stats?.total_views || 0}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MessageSquare className="w-4 h-4" />
                        {companion.stats?.total_messages || 0}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        {companion.stats?.total_appointments || 0}
                      </div>
                    </div>
                  </TableCell>
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
        </div>
      </CardContent>
    </Card>
  );
};