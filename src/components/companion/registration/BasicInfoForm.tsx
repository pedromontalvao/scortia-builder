import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface BasicInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const BasicInfoForm = ({ data, onUpdate }: BasicInfoFormProps) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      whatsapp: data.whatsapp || "",
      description: data.description || "",
      state: data.state || "",
      city: data.city || "",
      neighborhood: data.neighborhood || "",
      price: data.price || ""
    }
  });

  const formValues = watch();

  useEffect(() => {
    onUpdate(formValues);
  }, [formValues, onUpdate]);

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">Nome Artístico</Label>
        <Input
          id="name"
          {...register("name")}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          required
        />
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          {...register("whatsapp")}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          {...register("description")}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="state">Estado</Label>
          <Select
            value={formValues.state}
            onValueChange={(value) => setValue("state", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MT">Mato Grosso</SelectItem>
              {/* Add more states as needed */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Select
            value={formValues.city}
            onValueChange={(value) => setValue("city", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cuiabá">Cuiabá</SelectItem>
              <SelectItem value="Várzea Grande">Várzea Grande</SelectItem>
              {/* Add more cities as needed */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            {...register("neighborhood")}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="price">Valor (R$)</Label>
        <Input
          id="price"
          type="number"
          {...register("price")}
          required
        />
      </div>
    </div>
  );
};