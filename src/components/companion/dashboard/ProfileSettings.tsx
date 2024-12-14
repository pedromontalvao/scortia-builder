import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would handle the profile update
    console.log("Profile update submitted:", { 
      name, description, age, height, weight, location, whatsapp, isAvailable 
    });
    
    toast({
      title: "Perfil Atualizado",
      description: "Suas informações foram atualizadas com sucesso!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Artístico</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome artístico"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Fale um pouco sobre você..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Localização</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Cidade, Estado"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Disponibilidade</Label>
                    <div className="text-sm text-muted-foreground">
                      Mostrar que você está disponível para atendimento
                    </div>
                  </div>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={setIsAvailable}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Salvar Alterações
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="details">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Salvar Alterações
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="contact">
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h4 className="text-sm font-medium mb-2">Horário de Atendimento</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Segunda a Sexta</Label>
                    <Input placeholder="10:00 - 22:00" />
                  </div>
                  <div>
                    <Label>Sábado e Domingo</Label>
                    <Input placeholder="12:00 - 20:00" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h4 className="text-sm font-medium mb-2">Áreas de Atendimento</h4>
                <Textarea 
                  placeholder="Digite os bairros ou regiões onde você atende..."
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Separe as áreas por vírgula. Ex: Jardins, Itaim Bibi, Pinheiros
                </p>
              </div>

              <Button type="submit" className="w-full">
                Salvar Alterações
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};