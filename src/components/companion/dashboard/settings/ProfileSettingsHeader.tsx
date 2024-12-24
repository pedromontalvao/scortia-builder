import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ProfileSettingsHeaderProps {
  isProfileComplete: boolean;
  isPublished: boolean;
  isPublishing: boolean;
  onPublish: () => Promise<void>;
}

export const ProfileSettingsHeader = ({ 
  isProfileComplete, 
  isPublished, 
  isPublishing, 
  onPublish 
}: ProfileSettingsHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Configurações do Perfil</CardTitle>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant={isPublished ? "outline" : "default"}
            disabled={!isProfileComplete || isPublished}
            className={isPublished ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200" : ""}
          >
            {isPublished ? "✓ Perfil Publicado" : "Publicar Perfil"}
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
            <AlertDialogAction onClick={onPublish} disabled={isPublishing}>
              {isPublishing ? "Publicando..." : "Publicar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardHeader>
  );
};