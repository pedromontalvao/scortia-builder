import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputMask from "react-input-mask";
import { useToast } from "@/hooks/use-toast";
import { fetchAddressByCep } from "@/lib/cep";
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
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsLoadingCep(true);
      try {
        const address = await fetchAddressByCep(cleanCep);
        setState(address.uf);
        setCity(address.localidade);
        setNeighborhood(address.bairro);
        setStreet(address.logradouro);
        
        toast({
          title: "Endereço encontrado",
          description: "Os dados foram preenchidos automaticamente.",
          className: "bg-green-50 border-green-200",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      cep: cep.replace(/\D/g, ''),
      street,
      state,
      city,
      neighborhood,
      whatsapp: whatsapp.replace(/\D/g, '')
    });
  };

  return (
    <form onSubmit={handleSubmit} data-tab="basic" className="space-y-6">
      <div>
        <Label htmlFor="name">Nome Artístico</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="cep">CEP</Label>
        <div className="flex gap-2 mt-1">
          <InputMask
            mask="99999-999"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={handleCepBlur}
          >
            {(inputProps: any) => (
              <Input
                {...inputProps}
                id="cep"
                placeholder="00000-000"
              />
            )}
          </InputMask>
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
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <InputMask
          mask="(99) 99999-9999"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        >
          {(inputProps: any) => (
            <Input
              {...inputProps}
              id="whatsapp"
              placeholder="(00) 00000-0000"
              className="mt-1"
            />
          )}
        </InputMask>
      </div>
    </form>
  );
};