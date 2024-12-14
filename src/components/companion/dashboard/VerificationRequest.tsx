import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const VerificationRequest = () => {
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selfieFile || !idFile) {
      toast({
        title: "Erro",
        description: "Por favor, envie todas as fotos necessárias.",
        variant: "destructive"
      });
      return;
    }

    // Here we would handle the verification request submission
    toast({
      title: "Solicitação Enviada",
      description: "Sua solicitação de verificação foi enviada com sucesso! Analisaremos em até 48 horas.",
    });
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
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Enviar Solicitação
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};