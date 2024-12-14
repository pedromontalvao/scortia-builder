import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ethnicities = [
  "Africana", "Indiana", "Asiática", "Árabe", "Latina", "Caucasiana", "Brasileiras"
];

const nationalities = [
  { label: "Brasileira", flag: "🇧🇷" },
  { label: "Venezuelana", flag: "🇻🇪" },
  { label: "Albanesa", flag: "🇦🇱" },
  { label: "Americana", flag: "🇺🇸" }
];

const breastTypes = ["Seios Natural", "Com silicone"];

const hairColors = [
  "Cabelo Loiro", "Cabelo Castanho", "Cabelo Preto", "Cabelo Ruivo"
];

const bodyTypes = ["Magra", "Curvas", "BBW"];

interface CharacteristicsFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export const CharacteristicsForm = ({ initialData, onSave }: CharacteristicsFormProps) => {
  const [ethnicity, setEthnicity] = useState(initialData?.ethnicity || "");
  const [nationality, setNationality] = useState(initialData?.nationality || "");
  const [breastType, setBreastType] = useState(initialData?.breast_type || "");
  const [hairColor, setHairColor] = useState(initialData?.hair_color || "");
  const [bodyType, setBodyType] = useState(initialData?.body_type || "");

  const handleSubmit = () => {
    onSave({
      ethnicity,
      nationality,
      breast_type: breastType,
      hair_color: hairColor,
      body_type: bodyType
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Etnia</Label>
        <Select value={ethnicity} onValueChange={setEthnicity}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua etnia" />
          </SelectTrigger>
          <SelectContent>
            {ethnicities.map((eth) => (
              <SelectItem key={eth} value={eth}>
                {eth}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Nacionalidade</Label>
        <Select value={nationality} onValueChange={setNationality}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione sua nacionalidade" />
          </SelectTrigger>
          <SelectContent>
            {nationalities.map((nat) => (
              <SelectItem key={nat.label} value={nat.label}>
                {nat.flag} {nat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Seios</Label>
        <Select value={breastType} onValueChange={setBreastType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            {breastTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Cabelo</Label>
        <Select value={hairColor} onValueChange={setHairColor}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cor do cabelo" />
          </SelectTrigger>
          <SelectContent>
            {hairColors.map((color) => (
              <SelectItem key={color} value={color}>
                {color}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Tipo de Corpo</Label>
        <Select value={bodyType} onValueChange={setBodyType}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de corpo" />
          </SelectTrigger>
          <SelectContent>
            {bodyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};