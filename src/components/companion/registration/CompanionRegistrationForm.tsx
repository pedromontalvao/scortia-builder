import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoForm } from "./BasicInfoForm";
import { ServicesForm } from "./ServicesForm";
import { CharacteristicsForm } from "./CharacteristicsForm";
import { MediaUploadForm } from "./MediaUploadForm";
import { supabase } from "@/lib/supabase";

export const CompanionRegistrationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    basic: {},
    services: {},
    characteristics: {},
    media: { photos: [], presentation_audio: null }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Submitting companion registration:", formData);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Create companion profile
      const { data: companion, error: profileError } = await supabase
        .from('companions')
        .insert([{
          user_id: user.id,
          ...formData.basic,
          ...formData.services,
          ...formData.characteristics,
          is_verified: false,
          is_premium: false
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      // Upload photos
      if (formData.media.photos.length > 0) {
        for (const photo of formData.media.photos) {
          const fileExt = photo.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `companion-photos/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('photos')
            .upload(filePath, photo);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('photos')
            .getPublicUrl(filePath);

          await supabase
            .from('companion_photos')
            .insert([{
              companion_id: companion.id,
              url: publicUrl,
              is_primary: formData.media.photos.indexOf(photo) === 0
            }]);
        }
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Seu perfil foi criado e está aguardando verificação."
      });

      navigate("/painel");

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao realizar o cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="characteristics">Características</TabsTrigger>
          <TabsTrigger value="media">Fotos e Mídia</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoForm
            data={formData.basic}
            onUpdate={(data) => updateFormData('basic', data)}
          />
        </TabsContent>

        <TabsContent value="services">
          <ServicesForm
            data={formData.services}
            onUpdate={(data) => updateFormData('services', data)}
          />
        </TabsContent>

        <TabsContent value="characteristics">
          <CharacteristicsForm
            data={formData.characteristics}
            onUpdate={(data) => updateFormData('characteristics', data)}
          />
        </TabsContent>

        <TabsContent value="media">
          <MediaUploadForm
            data={formData.media}
            onUpdate={(data) => updateFormData('media', data)}
          />
        </TabsContent>
      </Tabs>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Finalizar Cadastro"}
      </Button>
    </form>
  );
};