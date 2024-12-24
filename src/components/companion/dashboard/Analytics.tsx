import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Eye, MessageSquare, Heart, Calendar } from "lucide-react";

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
      return data || [];
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
      return data || {
        views: 0,
        messages: 0,
        favorites: 0,
        appointments: 0,
        views_change: 0,
        messages_change: 0,
        favorites_change: 0,
        appointments_change: 0
      };
    }
  });

  const metrics = [
    {
      title: "Visualizações",
      value: stats?.views || 0,
      change: stats?.views_change || 0,
      icon: Eye
    },
    {
      title: "Mensagens",
      value: stats?.messages || 0,
      change: stats?.messages_change || 0,
      icon: MessageSquare
    },
    {
      title: "Favoritos",
      value: stats?.favorites || 0,
      change: stats?.favorites_change || 0,
      icon: Heart
    },
    {
      title: "Agendamentos",
      value: stats?.appointments || 0,
      change: stats?.appointments_change || 0,
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className={`text-xs ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}% essa semana
                </p>
              </CardContent>
            </Card>
          );
        })}
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