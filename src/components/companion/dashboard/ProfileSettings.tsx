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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const ProfileSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic");
  const [isPublishing, setIsPublishing] = useState(false);

  const { data: profile, isLoading, refetch } = useQuery({
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

  const isProfileComplete = (profile: any) => {
    const requiredFields = [
      'name',
      'description',
      'cep',
      'street',
      'state',
      'city',
      'neighborhood',
      'whatsapp',
      'services',
      'ethnicity',
      'body_type',
      'hair_color',
      'breast_type',
      'height',
      'weight',
      'measurements',
      'availability'
    ];

    return requiredFields.every(field => profile && profile[field]);
  };

  const handleSave = async (formData: any) => {
    try {
      console.log('Saving form data:', formData);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('companions')
        .update(formData)
        .eq('user_id', user.id);

      if (error) throw error;

      await refetch();

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

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from('companions')
        .update({ is_published: true })
        .eq('user_id', user.id);

      if (error) throw error;

      await refetch();

      toast({
        title: "Perfil publicado",
        description: "Seu perfil está agora visível para todos!"
      });
    } catch (error) {
      console.error('Error publishing profile:', error);
      toast({
        title: "Erro ao publicar",
        description: "Não foi possível publicar seu perfil.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Configurações do Perfil</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="default" 
              disabled={!profile || !isProfileComplete(profile) || profile.is_published}
            >
              {profile?.is_published ? "Perfil Publicado" : "Publicar Perfil"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Publicar seu perfil?</AlertDialogTitle>
              <AlertDialogDescription>
                Ao publicar seu perfil, ele ficará visível para todos os visitantes do site.
                Certifique-se de que todas as informações estão corretas.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handlePublish} disabled={isPublishing}>
                {isPublishing ? "Publicando..." : "Publicar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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