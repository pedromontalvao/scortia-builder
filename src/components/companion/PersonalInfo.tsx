import { Card, CardContent } from "../ui/card";
import { User } from "lucide-react";

interface PersonalInfoProps {
  age: string;
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  physique: string;
}

export const PersonalInfo = ({
  age,
  height,
  weight,
  hair,
  eyes,
  physique
}: PersonalInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="text-pink-500" />
          <h2 className="text-xl font-semibold">Informações Pessoais</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500">Idade</p>
            <p className="font-medium">{age}</p>
          </div>
          <div>
            <p className="text-gray-500">Altura</p>
            <p className="font-medium">{height}</p>
          </div>
          <div>
            <p className="text-gray-500">Peso</p>
            <p className="font-medium">{weight}</p>
          </div>
          <div>
            <p className="text-gray-500">Cabelo</p>
            <p className="font-medium">{hair}</p>
          </div>
          <div>
            <p className="text-gray-500">Olhos</p>
            <p className="font-medium">{eyes}</p>
          </div>
          <div>
            <p className="text-gray-500">Tipo Físico</p>
            <p className="font-medium">{physique}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};