import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

// Dummy data for models
const dummyModels = [
  {
    id: 1,
    name: "Maria Silva",
    description: "Professional model with 5 years of experience",
    hourlyRate: 150,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    specialties: ["Fashion", "Commercial"],
  },
  {
    id: 2,
    name: "Ana Santos",
    description: "Experienced runway and photo shoot model",
    hourlyRate: 180,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    specialties: ["Runway", "Editorial"],
  },
  {
    id: 3,
    name: "Carolina Lima",
    description: "Specialized in commercial and editorial modeling",
    hourlyRate: 160,
    imageUrl: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    specialties: ["Commercial", "Editorial"],
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModels = dummyModels.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Find the Perfect Model for Your Project
          </h1>
          <p className="text-xl text-center mb-8">
            Professional models available for hourly bookings
          </p>
          <div className="max-w-xl mx-auto relative">
            <Input
              type="search"
              placeholder="Search by name, specialty, or description..."
              className="w-full pl-10 bg-white text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={model.imageUrl}
                alt={model.name}
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>{model.name}</CardTitle>
                <CardDescription>
                  {model.specialties.join(" • ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">
                    ${model.hourlyRate}/hr
                  </span>
                  <Button>
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;