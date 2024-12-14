import { Card, CardContent } from "../ui/card";
import { ImageIcon } from "lucide-react";

interface PhotoGalleryProps {
  photos: string[];
}

export const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon className="text-pink-500" />
          <h2 className="text-xl font-semibold">Galeria de Fotos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={photo}
                alt={`Foto ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};