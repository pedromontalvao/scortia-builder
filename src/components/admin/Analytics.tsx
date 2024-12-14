import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, Eye, Calendar } from "lucide-react";

export const Analytics = () => {
  // Mock data - in a real app this would come from an API
  const visitData = [
    { name: 'Jan', visits: 4000 },
    { name: 'Fev', visits: 3000 },
    { name: 'Mar', visits: 2000 },
    { name: 'Abr', visits: 2780 },
    { name: 'Mai', visits: 1890 },
    { name: 'Jun', visits: 2390 },
  ];

  const stats = [
    {
      title: "Usuários Ativos",
      value: "1,234",
      icon: Users,
      change: "+12%",
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 45.231",
      icon: DollarSign,
      change: "+23%",
    },
    {
      title: "Visualizações",
      value: "89,234",
      icon: Eye,
      change: "+42%",
    },
    {
      title: "Agendamentos",
      value: "2,345",
      icon: Calendar,
      change: "+18%",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visualizações por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};