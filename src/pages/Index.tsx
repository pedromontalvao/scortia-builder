import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

// Dummy data for models
const dummyModels = [
  {
    id: 1,
    name: "Maria Silva",
    description: "Professional model with a passion for fashion and photography",
    hourlyRate: 150,
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    interests: ["Fashion", "Photography", "Travel"],
    age: 24,
    location: "São Paulo",
    rating: 4.8,
    height: "1.75m",
    measurements: "90-60-90",
  },
  {
    id: 2,
    name: "Ana Santos",
    description: "Experienced model specializing in runway and editorial work",
    hourlyRate: 180,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    interests: ["Runway", "Editorial", "Fashion"],
    age: 26,
    location: "Rio de Janeiro",
    rating: 4.9,
    height: "1.78m",
    measurements: "86-61-89",
  },
  {
    id: 3,
    name: "Carolina Lima",
    description: "Commercial and fashion model available for photoshoots",
    hourlyRate: 160,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    interests: ["Commercial", "Fashion", "Print"],
    age: 23,
    location: "Belo Horizonte",
    rating: 4.7,
    height: "1.76m",
    measurements: "88-62-91",
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredModels = dummyModels.filter((model) =>
    model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    model.interests.some(interest => 
      interest.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 animate-fade-in">
            Exclusive Models
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 text-purple-100">
            Connect with professional models for your next project
          </p>
          <div className="max-w-xl mx-auto relative">
            <Input
              type="search"
              placeholder="Search by name, interests, or location..."
              className="w-full pl-10 bg-white/90 text-gray-900 backdrop-blur-sm border-purple-200 focus:border-purple-300"
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
            <Card key={model.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="relative">
                <img
                  src={model.imageUrl}
                  alt={model.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white/90 hover:bg-white hover:text-pink-500"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-2xl font-semibold text-white mb-1">{model.name}</h3>
                  <div className="flex items-center text-white/90 gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{model.location}</span>
                    <span className="text-white/60">•</span>
                    <span>{model.age} years</span>
                    <span className="text-white/60">•</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{model.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Height:</span> {model.height} | 
                    <span className="font-semibold ml-2">Measurements:</span> {model.measurements}
                  </div>
                  <p className="text-gray-700">{model.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {model.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-600">
                    R${model.hourlyRate}/hr
                  </span>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
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