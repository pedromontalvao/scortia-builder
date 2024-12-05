import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart } from "lucide-react";
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
  },
  {
    id: 2,
    name: "Ana Santos",
    description: "Experienced model who loves creative projects and artistic expression",
    hourlyRate: 180,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    interests: ["Art", "Dance", "Fashion"],
    age: 26,
    location: "Rio de Janeiro",
  },
  {
    id: 3,
    name: "Carolina Lima",
    description: "Passionate about creating memorable moments in front of the camera",
    hourlyRate: 160,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    interests: ["Photography", "Travel", "Fashion"],
    age: 23,
    location: "Belo Horizonte",
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
            Find Your Perfect Match
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
                  className="w-full h-64 object-cover"
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
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl text-purple-800">{model.name}</CardTitle>
                    <p className="text-sm text-gray-500">{model.age} • {model.location}</p>
                  </div>
                </div>
                <CardDescription className="text-gray-600">
                  {model.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                    Connect Now
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