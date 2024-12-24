import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const AdvertisementForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // In development mode, simulate successful submission
      if (process.env.NODE_ENV === 'development') {
        console.log('Demo mode - simulating advertisement submission');
        toast({
          title: "Anúncio enviado!",
          description: "Seu anúncio foi enviado com sucesso e está em análise."
        });
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Create advertisement record
      const { error: adError } = await supabase
        .from('advertisements')
        .insert({
          user_id: user.id,
          title,
          description,
          status: 'pending'
        });

      if (adError) throw adError;

      // Handle image uploads if present
      if (images && images.length > 0) {
        const imagePromises = Array.from(images).map(async (image) => {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `advertisements/${user.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('advertisements')
            .upload(filePath, image);

          if (uploadError) throw uploadError;
          return filePath;
        });

        await Promise.all(imagePromises);
      }

      toast({
        title: "Anúncio enviado!",
        description: "Seu anúncio foi enviado com sucesso e está em análise."
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImages(null);

    } catch (error: any) {
      console.error('Error submitting advertisement:', error);
      toast({
        title: "Erro ao enviar anúncio",
        description: error.message || "Ocorreu um erro ao enviar seu anúncio. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enviar Anúncio</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Título do Anúncio
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título do seu anúncio"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Descrição
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva seu anúncio em detalhes"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium mb-2">
              Imagens
            </label>
            <Input
              id="images"
              type="file"
              onChange={(e) => setImages(e.target.files)}
              accept="image/*"
              multiple
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Você pode selecionar múltiplas imagens
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar Anúncio"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};