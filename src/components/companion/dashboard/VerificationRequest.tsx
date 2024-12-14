import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const VerificationRequest = () => {
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const verificationMutation = useMutation({
    mutationFn: async () => {
      if (!selfieFile || !idFile) {
        throw new Error("Por favor, envie todas as fotos necessárias.");
      }

      setUploading(true);

      // Upload selfie
      const selfiePath = `verification/${Date.now()}-selfie.${selfieFile.name.split('.').pop()}`;
      const { error: selfieError } = await supabase.storage
        .from('verification')
        .upload(selfiePath, selfieFile);

      if (selfieError) throw selfieError;

      // Upload ID
      const idPath = `verification/${Date.now()}-id.${idFile.name.split('.').pop()}`;
      const { error: idError } = await supabase.storage
        .from('verification')
        .upload(idPath, idFile);

      if (idError) throw idError;

      // Create verification request
      const { error: requestError } = await supabase
        .from('verification_requests')
        .insert([
          {
            selfie_url: selfiePath,
            id_url: idPath,
            status: 'pending'
          }
        ]);

      if (requestError) throw requestError;

      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Solicitação Enviada",
        description: "Sua solicitação de verificação foi enviada com sucesso! Analisaremos em até 48 horas.",
      });
      setSelfieFile(null);
      setIdFile(null);
    },
    onError: (error) => {
      console.error('Verification error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar sua solicitação. Tente novamente.",
        variant: "destructive"
      });
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verificationMutation.mutate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitar Verificação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="selfie">Selfie com documento</Label>
              <div className="mt-2">
                <div className="flex items-center gap-4">
                  {selfieFile ? (
                    <div className="relative w-32 h-32">
                      <img
                        src={URL.createObjectURL(selfieFile)}
                        alt="Selfie preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setSelfieFile(null)}
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <label htmlFor="selfie-upload" className="cursor-pointer">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </label>
                      <input
                        id="selfie-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && setSelfieFile(e.target.files[0])}
                        disabled={uploading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="id">Documento de Identificação</Label>
              <div className="mt-2">
                <div className="flex items-center gap-4">
                  {idFile ? (
                    <div className="relative w-32 h-32">
                      <img
                        src={URL.createObjectURL(idFile)}
                        alt="ID preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setIdFile(null)}
                      >
                        X
                      </Button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <label htmlFor="id-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </label>
                      <input
                        id="id-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && setIdFile(e.target.files[0])}
                        disabled={uploading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!selfieFile || !idFile || uploading}
          >
            {uploading ? "Enviando..." : "Enviar Solicitação"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};