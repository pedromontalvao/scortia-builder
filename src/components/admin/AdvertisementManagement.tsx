import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";

export const AdvertisementManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: advertisements, isLoading, refetch } = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      if (process.env.NODE_ENV === 'development') {
        return [{
          id: 'demo-1',
          title: 'Anúncio Demo',
          description: 'Descrição do anúncio demo',
          status: 'pending',
          created_at: new Date().toISOString(),
          user: {
            name: 'Usuário Demo',
            email: 'demo@example.com'
          }
        }];
      }

      let query = supabase
        .from('advertisements')
        .select('*, user:users(name, email)')
        .order('created_at', { ascending: false });
      
      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    }
  });

  const handleApprove = async (adId: string) => {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({ status: 'approved' })
        .eq('id', adId);

      if (error) throw error;

      toast({
        title: "Anúncio aprovado",
        description: "O anúncio foi aprovado com sucesso."
      });
      refetch();
    } catch (error: any) {
      console.error('Error approving advertisement:', error);
      toast({
        title: "Erro ao aprovar anúncio",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleReject = async (adId: string) => {
    try {
      const { error } = await supabase
        .from('advertisements')
        .update({ status: 'rejected' })
        .eq('id', adId);

      if (error) throw error;

      toast({
        title: "Anúncio rejeitado",
        description: "O anúncio foi rejeitado com sucesso."
      });
      refetch();
    } catch (error: any) {
      console.error('Error rejecting advertisement:', error);
      toast({
        title: "Erro ao rejeitar anúncio",
        description: error.message,
        variant: "destructive"
      });
    }
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
              placeholder="Buscar anúncio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {advertisements?.map((ad: any) => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">{ad.title}</TableCell>
                <TableCell>{ad.user?.name || 'N/A'}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ad.status === 'approved' ? 'success' :
                      ad.status === 'rejected' ? 'destructive' :
                      'default'
                    }
                  >
                    {ad.status === 'approved' ? 'Aprovado' :
                     ad.status === 'rejected' ? 'Rejeitado' :
                     'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(ad.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {ad.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(ad.id)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(ad.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Rejeitar
                        </Button>
                      </>
                    )}
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