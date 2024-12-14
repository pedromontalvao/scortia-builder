import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, X } from "lucide-react";

interface MediaUploadFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const MediaUploadForm = ({ data, onUpdate }: MediaUploadFormProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...urls]);
      onUpdate({
        ...data,
        photos: [...(data.photos || []), ...files]
      });
    }
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    onUpdate({
      ...data,
      photos: data.photos.filter((_: File, i: number) => i !== index)
    });
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <Label className="block mb-4">Fotos (máximo 10)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={url} className="relative aspect-[3/4]">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removePhoto(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          {previewUrls.length < 10 && (
            <label className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Adicionar foto</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoUpload}
                disabled={previewUrls.length >= 10}
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <Label className="block mb-4">Áudio de Apresentação (opcional)</Label>
        <label className="block border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Clique para fazer upload do áudio
            </span>
          </div>
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                onUpdate({
                  ...data,
                  presentation_audio: e.target.files[0]
                });
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};