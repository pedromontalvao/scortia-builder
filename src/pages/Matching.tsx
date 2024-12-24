import { useState } from "react";
import { MatchingRound } from "@/components/matching/MatchingRound";

// Demo data - replace with real data from your backend
const demoProfiles = [
  {
    id: "1",
    name: "Ana Silva",
    imageUrl: "/demo/ana-1.jpg",
    description: "Olá! Sou uma pessoa divertida e adoro conhecer gente nova.",
    location: "Centro, São Paulo"
  },
  {
    id: "2",
    name: "Carla Santos",
    imageUrl: "/demo/carla-1.jpg",
    description: "Adoro viajar e conhecer novos lugares e pessoas.",
    location: "Jardins, São Paulo"
  },
  // Add more demo profiles as needed
];

export const Matching = () => {
  const [matches, setMatches] = useState<string[]>([]);

  const handleMatch = (profileId: string) => {
    setMatches([...matches, profileId]);
    console.log("New match:", profileId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Rodada de Seleção
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <MatchingRound
            profiles={demoProfiles}
            onMatch={handleMatch}
          />
        </div>
      </div>
    </div>
  );
};