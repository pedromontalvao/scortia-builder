import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { fetchAddressByCep } from "@/lib/cep";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface BasicInfoFormProps {
  initialData?: any;
  onSave: (data: any) => void;
}

export const BasicInfoForm = ({ initialData, onSave }: BasicInfoFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [cep, setCep] = useState(initialData?.cep || "");
  const [street, setStreet] = useState(initialData?.street || "");
  const [state, setState] = useState(initialData?.state || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [neighborhood, setNeighborhood] = useState(initialData?.neighborhood || "");
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp || "");
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const { toast } = useToast();

  const handleCepBlur = async () => {
    if (cep.length === 8) {
      setIsLoadingCep(true);
      try {
        const address = await fetchAddressByCep(cep);
        setState(address.uf);
        setCity(address.localidade);
        setNeighborhood(address.bairro);
        setStreet(address.logradouro);
        
        toast({
          title: "Endereço encontrado",
          description: "Os dados foram preenchidos automaticamente.",
        });
      } catch (error) {
        console.error('Error fetching CEP:', error);
        toast({
          title: "Erro ao buscar CEP",
          description: "Verifique se o CEP está correto e tente novamente.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const handleSubmit = () => {
    onSave({
      name,
      description,
      cep,
      street,
      state,
      city,
      neighborhood,
      whatsapp
    });
  };

  return (
    <form className="space-y-6">
      <div>
        <Label htmlFor="name">Nome Artístico</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="cep">CEP</Label>
        <div className="flex gap-2">
          <Input
            id="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
            onBlur={handleCepBlur}
            maxLength={8}
            placeholder="00000000"
          />
          {isLoadingCep && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="street">Endereço</Label>
        <Input
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            readOnly
          />
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            readOnly
          />
        </div>

        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            readOnly
          />
        </div>
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
      </div>
    </form>
  );
};