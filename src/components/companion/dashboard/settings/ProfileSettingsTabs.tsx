import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoForm } from "./BasicInfoForm";
import { ServicesForm } from "./ServicesForm";
import { CharacteristicsForm } from "./CharacteristicsForm";
import { AvailabilityForm } from "./AvailabilityForm";

interface ProfileSettingsTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: any;
  onSave: (data: any) => Promise<void>;
  isSaving: boolean;
}

export const ProfileSettingsTabs = ({
  activeTab,
  setActiveTab,
  profile,
  onSave,
  isSaving
}: ProfileSettingsTabsProps) => {
  return (
    <CardContent>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="characteristics">Características</TabsTrigger>
          <TabsTrigger value="availability">Disponibilidade</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoForm initialData={profile} onSave={onSave} />
        </TabsContent>

        <TabsContent value="services">
          <ServicesForm initialData={profile} onSave={onSave} />
        </TabsContent>

        <TabsContent value="characteristics">
          <CharacteristicsForm initialData={profile} onSave={onSave} />
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityForm initialData={profile} onSave={onSave} />
        </TabsContent>

        <div className="mt-8">
          <Button 
            onClick={() => {
              const form = document.querySelector(`form[data-tab="${activeTab}"]`);
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true }));
              }
            }} 
            className="w-full bg-pink-500 hover:bg-pink-600"
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </Tabs>
    </CardContent>
  );
};