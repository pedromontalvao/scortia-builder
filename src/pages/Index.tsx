import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CompanionCard } from "@/components/CompanionCard";
import { Footer } from "@/components/Footer";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock data - in a real app this would come from an API
  const companions = [
    {
      id: "1",
      name: "Isabella Santos",
      location: "São Paulo, SP",
      rating: 4.9,
      reviews: 127,
      price: 300,
      services: ["Eventos", "Viagens", "Jantar"],
      imageUrl: "/placeholder.svg",
      isPremium: true,
      isVerified: true
    },
    {
      id: "2",
      name: "Julia Oliveira",
      location: "Rio de Janeiro, RJ",
      rating: 4.7,
      reviews: 89,
      price: 250,
      services: ["Eventos", "Viagens"],
      imageUrl: "/placeholder.svg",
      isVerified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Acompanhantes em Destaque</h2>
            <p className="text-gray-600">Conheça nossas acompanhantes mais bem avaliadas</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className={`grid ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        } gap-6`}>
          {companions.map((companion) => (
            <CompanionCard key={companion.id} {...companion} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;