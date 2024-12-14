import { Card, CardContent } from "../ui/card";
import { Ruler } from "lucide-react";

interface MeasurementsProps {
  bust: string;
  waist: string;
  hips: string;
}

export const Measurements = ({ bust, waist, hips }: MeasurementsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="text-pink-500" />
          <h2 className="text-xl font-semibold">Medidas</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500">Busto</p>
            <p className="font-medium">{bust}</p>
          </div>
          <div>
            <p className="text-gray-500">Cintura</p>
            <p className="font-medium">{waist}</p>
          </div>
          <div>
            <p className="text-gray-500">Quadril</p>
            <p className="font-medium">{hips}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};