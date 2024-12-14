import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const MediaManager = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch existing photos
  const { data: photos, isLoading } = useQuery({
    queryKey: ['companion-photos'],
    queryFn: async () => {
      const { data: photos, error } = await supabase
        .from('companion_photos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return photos;
    }
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      setUploading(true);
      const uploadedPhotos = [];

      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `companion-photos/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('photos')
          .getPublicUrl(filePath);

        // Save to database
        const { error: dbError } = await supabase
          .from('companion_photos')
          .insert([{ url: publicUrl }]);

        if (dbError) throw dbError;

        uploadedPhotos.push(publicUrl);
      }

      return uploadedPhotos;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companion-photos'] });
      toast({
        title: "Fotos enviadas com sucesso!",
        description: "Suas fotos foram adicionadas à galeria.",
      });
    },
    onError: (error) => {
      console.error('Upload error:', error);
      toast({
        title: "Erro ao enviar fotos",
        description: "Ocorreu um erro ao enviar suas fotos. Tente novamente.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (photoId: string) => {
      const { error } = await supabase
        .from('companion_photos')
        .delete()
        .eq('id', photoId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companion-photos'] });
      toast({
        title: "Foto removida",
        description: "A foto foi removida com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast({
        title: "Erro ao remover foto",
        description: "Ocorreu um erro ao remover a foto. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadMutation.mutate(e.target.files);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciador de Mídia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  {uploading ? "Enviando..." : "Clique para fazer upload de fotos"}
                </p>
              </div>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {isLoading ? (
            <div className="text-center">Carregando fotos...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos?.map((photo) => (
                <div key={photo.id} className="relative">
                  <img
                    src={photo.url}
                    alt="Foto do perfil"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => deleteMutation.mutate(photo.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};