import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  location: string;
}

interface MatchingRoundProps {
  profiles: Profile[];
  onMatch: (profileId: string) => void;
}

export const MatchingRound = ({ profiles, onMatch }: MatchingRoundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<string[]>([]);
  const { toast } = useToast();
  const [remainingTime, setRemainingTime] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    if (currentIndex < profiles.length) {
      const profile = profiles[currentIndex];
      setMatches([...matches, profile.id]);
      onMatch(profile.id);
      toast({
        title: "Interesse enviado!",
        description: `Você demonstrou interesse em ${profile.name}`,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    if (currentIndex < profiles.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (currentIndex >= profiles.length) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-xl font-semibold mb-4">Rodada finalizada!</h3>
        <p className="text-gray-600 mb-4">
          Você visualizou todos os perfis desta rodada.
          {matches.length > 0 && ` Você demonstrou interesse em ${matches.length} perfis.`}
        </p>
        <Button className="mt-4">Iniciar nova rodada</Button>
      </Card>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <Card className="max-w-md mx-auto overflow-hidden">
      <div className="relative">
        <img
          src={currentProfile.imageUrl}
          alt={currentProfile.name}
          className="w-full aspect-[3/4] object-cover"
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm">
          {formatTime(remainingTime)}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-semibold">{currentProfile.name}</h3>
          <p className="text-gray-600">{currentProfile.location}</p>
        </div>

        <p className="text-gray-700">{currentProfile.description}</p>

        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16"
            onClick={handleSkip}
          >
            <X className="w-8 h-8 text-gray-500" />
          </Button>
          
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-pink-500 hover:bg-pink-600"
            onClick={handleLike}
          >
            <Heart className="w-8 h-8" />
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500">
          {currentIndex + 1} de {profiles.length} perfis nesta rodada
        </div>
      </div>
    </Card>
  );
};