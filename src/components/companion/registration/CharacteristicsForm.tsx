import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface CharacteristicsFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const CharacteristicsForm = ({ data, onUpdate }: CharacteristicsFormProps) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      age: data.age || "",
      height: data.height || "",
      weight: data.weight || "",
      bust: data.bust || "",
      waist: data.waist || "",
      hips: data.hips || "",
      hair_color: data.hair_color || "",
      eye_color: data.eye_color || "",
      body_type: data.body_type || "",
      ethnicity: data.ethnicity || ""
    }
  });

  const formValues = watch();

  useEffect(() => {
    onUpdate(formValues);
  }, [formValues, onUpdate]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="age">Idade</Label>
          <Input
            id="age"
            type="number"
            {...register("age")}
            required
          />
        </div>

        <div>
          <Label htmlFor="height">Altura (cm)</Label>
          <Input
            id="height"
            type="number"
            {...register("height")}
            required
          />
        </div>

        <div>
          <Label htmlFor="weight">Peso (kg)</Label>
          <Input
            id="weight"
            type="number"
            {...register("weight")}
            required
          />
        </div>

        <div>
          <Label htmlFor="ethnicity">Etnia</Label>
          <Select
            value={formValues.ethnicity}
            onValueChange={(value) => setValue("ethnicity", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="branca">Branca</SelectItem>
              <SelectItem value="negra">Negra</SelectItem>
              <SelectItem value="parda">Parda</SelectItem>
              <SelectItem value="asiatica">Asiática</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bust">Busto (cm)</Label>
          <Input
            id="bust"
            {...register("bust")}
            required
          />
        </div>

        <div>
          <Label htmlFor="waist">Cintura (cm)</Label>
          <Input
            id="waist"
            {...register("waist")}
            required
          />
        </div>

        <div>
          <Label htmlFor="hips">Quadril (cm)</Label>
          <Input
            id="hips"
            {...register("hips")}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="hair_color">Cor do Cabelo</Label>
          <Select
            value={formValues.hair_color}
            onValueChange={(value) => setValue("hair_color", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loiro">Loiro</SelectItem>
              <SelectItem value="castanho">Castanho</SelectItem>
              <SelectItem value="preto">Preto</SelectItem>
              <SelectItem value="ruivo">Ruivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="eye_color">Cor dos Olhos</Label>
          <Select
            value={formValues.eye_color}
            onValueChange={(value) => setValue("eye_color", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="castanhos">Castanhos</SelectItem>
              <SelectItem value="azuis">Azuis</SelectItem>
              <SelectItem value="verdes">Verdes</SelectItem>
              <SelectItem value="mel">Mel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="body_type">Tipo Físico</Label>
          <Select
            value={formValues.body_type}
            onValueChange={(value) => setValue("body_type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="magro">Magro</SelectItem>
              <SelectItem value="atletico">Atlético</SelectItem>
              <SelectItem value="curvilinea">Curvilínea</SelectItem>
              <SelectItem value="plus">Plus Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};