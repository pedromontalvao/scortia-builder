import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const Analytics = () => {
  const { data: viewsData, isLoading: isLoadingViews } = useQuery({
    queryKey: ['companion-views'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companion_views')
        .select('*')
        .order('date', { ascending: true })
        .limit(30);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['companion-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('companion_stats')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Visualizações</h3>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-sm text-green-500">+12% essa semana</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Mensagens</h3>
            <div className="text-3xl font-bold">56</div>
            <p className="text-sm text-green-500">+8% essa semana</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Agendamentos</h3>
            <div className="text-3xl font-bold">23</div>
            <p className="text-sm text-green-500">+15% essa semana</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Visualizações</h3>
            <div className="text-3xl font-bold">0</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Contatos</h3>
            <div className="text-3xl font-bold">0</div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Favoritos</h3>
            <div className="text-3xl font-bold">0</div>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visualizações do Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};