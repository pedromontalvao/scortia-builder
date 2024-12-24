import { Card, CardContent } from "../ui/card";
import { Activity, Users, ThumbsUp, Star } from "lucide-react";

interface StatisticsProps {
  totalMeetings: number;
  repeatClients: number;
  satisfactionRate: number;
}

export const Statistics = ({ totalMeetings, repeatClients, satisfactionRate }: StatisticsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-pink-500" />
          <h2 className="text-xl font-semibold">Estatísticas</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-pink-500 mb-2" />
              <span className="text-2xl font-bold">{totalMeetings}</span>
              <span className="text-sm text-gray-500">Encontros</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col items-center">
              <ThumbsUp className="w-8 h-8 text-pink-500 mb-2" />
              <span className="text-2xl font-bold">{repeatClients}</span>
              <span className="text-sm text-gray-500">Clientes Regulares</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-pink-500 mb-2" />
              <span className="text-2xl font-bold">{satisfactionRate}%</span>
              <span className="text-sm text-gray-500">Satisfação</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
