import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoForm } from "./settings/BasicInfoForm";
import { ServicesForm } from "./settings/ServicesForm";
import { CharacteristicsForm } from "./settings/CharacteristicsForm";
import { AvailabilityForm } from "./settings/AvailabilityForm";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const ProfileSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");

  const { data: profile, isLoading } = useQuery({
    queryKey: ['companion-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('companions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const handleSave = async (formData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('companions')
        .update(formData)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Alterações salvas com sucesso!"
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="characteristics">Características</TabsTrigger>
            <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoForm initialData={profile} onSave={handleSave} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesForm initialData={profile} onSave={handleSave} />
          </TabsContent>

          <TabsContent value="characteristics">
            <CharacteristicsForm initialData={profile} onSave={handleSave} />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityForm initialData={profile} onSave={handleSave} />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button onClick={() => {
            const form = document.querySelector(`form[data-tab="${activeTab}"]`);
            if (form) {
              form.dispatchEvent(new Event('submit'));
            }
          }} className="w-full">
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};