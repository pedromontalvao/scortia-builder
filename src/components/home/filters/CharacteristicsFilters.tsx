import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ethnicities = [
  "Africana", "Indiana", "Asiática", "Árabe", "Latina", "Caucasiana", "Brasileiras"
];

const bodyTypes = ["Magra", "Curvas", "BBW"];

const hairColors = [
  "Cabelo Loiro", "Cabelo Castanho", "Cabelo Preto", "Cabelo Ruivo"
];

interface CharacteristicsFiltersProps {
  selectedEthnicity: string;
  selectedBodyType: string;
  selectedHairColor: string;
  onEthnicityChange: (value: string) => void;
  onBodyTypeChange: (value: string) => void;
  onHairColorChange: (value: string) => void;
}

export const CharacteristicsFilters = ({
  selectedEthnicity,
  selectedBodyType,
  selectedHairColor,
  onEthnicityChange,
  onBodyTypeChange,
  onHairColorChange,
}: CharacteristicsFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label>Etnia</Label>
        <Select value={selectedEthnicity} onValueChange={onEthnicityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a etnia" />
          </SelectTrigger>
          <SelectContent>
            {ethnicities.map((ethnicity) => (
              <SelectItem key={ethnicity} value={ethnicity}>
                {ethnicity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Tipo de Corpo</Label>
        <Select value={selectedBodyType} onValueChange={onBodyTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
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

      <div>
        <Label>Cor do Cabelo</Label>
        <Select value={selectedHairColor} onValueChange={onHairColorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a cor" />
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
    </div>
  );
};