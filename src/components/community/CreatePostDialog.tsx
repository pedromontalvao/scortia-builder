import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePostDialog = ({ open, onOpenChange }: CreatePostDialogProps) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length > 4) {
        toast({
          title: "Limite de imagens",
          description: "Você pode adicionar no máximo 4 imagens.",
          variant: "destructive"
        });
        return;
      }
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast({
        title: "Conteúdo necessário",
        description: "Por favor, escreva algo para publicar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload images if any
      const imageUrls = [];
      for (const image of images) {
        const fileName = `${Math.random()}.${image.name.split('.').pop()}`;
        const { error: uploadError, data } = await supabase.storage
          .from('community-images')
          .upload(fileName, image);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('community-images')
          .getPublicUrl(fileName);
          
        imageUrls.push(publicUrl);
      }

      // Create post
      const { error } = await supabase
        .from('community_posts')
        .insert([
          {
            content,
            images: imageUrls,
            author_id: (await supabase.auth.getUser()).data.user?.id
          }
        ]);

      if (error) throw error;

      toast({
        title: "Publicação criada",
        description: "Sua publicação foi criada com sucesso!"
      });

      // Reset form and close dialog
      setContent("");
      setImages([]);
      onOpenChange(false);
      
      // Invalidate queries to refresh the feed
      queryClient.invalidateQueries({ queryKey: ['community-topics'] });
      
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Erro ao criar publicação",
        description: "Ocorreu um erro ao criar sua publicação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Publicação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O que você quer compartilhar?"
              className="min-h-[100px]"
            />
          </div>

          <div>
            <Label className="mb-2 block">Imagens (máximo 4)</Label>
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-video bg-gray-100 rounded-lg">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                  >
                    ×
                  </Button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm text-gray-600">
                      Adicionar imagem
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    multiple
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};