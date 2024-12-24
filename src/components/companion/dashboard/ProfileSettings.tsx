import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileSettingsHeader } from "./settings/ProfileSettingsHeader";
import { ProfileSettingsTabs } from "./settings/ProfileSettingsTabs";

export const ProfileSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("basic");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['companion-profile'],
    queryFn: async () => {
      console.log('Fetching companion profile...');
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from('companions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      console.log('Profile data:', data);
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

    return requiredFields.every(field => {
      const hasField = profile && profile[field];
      if (!hasField) {
        console.log(`Missing required field: ${field}`);
      }
      return hasField;
    });
  };

  const handleSave = async (formData: any) => {
    console.log('Saving form data:', formData);
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Merge existing profile data with new form data
      const updatedData = {
        ...profile,
        ...formData,
        updated_at: new Date().toISOString()
      };

      console.log('Saving updated data:', updatedData);

      const { error } = await supabase
        .from('companions')
        .upsert({
          user_id: user.id,
          ...updatedData
        });

      if (error) {
        console.error('Error saving profile:', error);
        throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ['companion-profile'] });

      toast({
        title: "Sucesso",
        description: "Alterações salvas com sucesso!",
        className: "bg-green-50 border-green-200",
      });
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      if (!profile || !isProfileComplete(profile)) {
        toast({
          title: "Perfil incompleto",
          description: "Por favor, preencha todos os campos obrigatórios antes de publicar.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('companions')
        .update({ 
          is_published: true,
          published_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['companion-profile'] });

      toast({
        title: "Perfil publicado",
        description: "Seu perfil está agora visível para todos!",
        className: "bg-green-50 border-green-200",
      });
    } catch (error: any) {
      console.error('Error publishing profile:', error);
      toast({
        title: "Erro ao publicar",
        description: error.message || "Não foi possível publicar seu perfil.",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Carregando...</div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <ProfileSettingsHeader
        isProfileComplete={isProfileComplete(profile)}
        isPublished={profile?.is_published}
        isPublishing={isPublishing}
        onPublish={handlePublish}
      />
      <ProfileSettingsTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </Card>
  );
};