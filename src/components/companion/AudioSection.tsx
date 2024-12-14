import { Card, CardContent } from "../ui/card";
import { Mic } from "lucide-react";

interface AudioSectionProps {
  presentationAudio: string;
  voiceMessageAudio: string;
}

export const AudioSection = ({ presentationAudio, voiceMessageAudio }: AudioSectionProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mic className="text-pink-500" />
          <h2 className="text-xl font-semibold">Áudios</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="text-gray-500 mb-2">Apresentação</p>
            <audio controls className="w-full">
              <source src={presentationAudio} type="audio/mpeg" />
            </audio>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">Mensagem de Voz</p>
            <audio controls className="w-full">
              <source src={voiceMessageAudio} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};