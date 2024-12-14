import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Heart, Share2, MapPin, Star, Crown, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const CompanionProfile = () => {
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);

  // Mock data - in a real app this would come from an API
  const companion = {
    id,
    name: "Isabella Santos",
    description: "Olá! Sou a Isabella, uma acompanhante de luxo em São Paulo. Ofereço momentos únicos e inesquecíveis com muito carinho e discrição.",
    location: "São Paulo, SP",
    rating: 4.8,
    reviews: 124,
    experience: "2 anos de experiência",
    views: 1234,
    likes: 89,
    messages: 45,
    price: 300,
    isPremium: true,
    isVerified: true,
    personalInfo: {
      age: "24 anos",
      height: "175cm",
      weight: "58kg",
      hair: "Castanho",
      eyes: "Verde",
      physique: "Atlético"
    },
    measurements: {
      bust: "86cm",
      waist: "60cm",
      hips: "90cm"
    },
    serviceAreas: ["Jardins", "Itaim Bibi", "Pinheiros", "Vila Olímpia", "Moema"],
    schedule: {
      weekdays: "10:00 - 20:00",
      saturday: "12:00 - 18:00"
    },
    contact: {
      whatsapp: "(11) 99999-9999",
      email: "contato@isabellasantos.com"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto px-4 h-full">
            <div className="flex items-start justify-between pt-6">
              <Button variant="ghost" className="text-white" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2" />
                Voltar
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" className="text-white">
                  <Heart className="mr-2" />
                  Favoritar
                </Button>
                <Button variant="ghost" className="text-white">
                  <Share2 className="mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
            
            <div className="absolute bottom-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold">{companion.name}</h1>
                {companion.isPremium && (
                  <Badge className="bg-yellow-500">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Badge>
                )}
                {companion.isVerified && (
                  <Badge className="bg-green-500">
                    Verificada
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-gray-200">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {companion.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {companion.rating} ({companion.reviews} avaliações)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Informações Pessoais</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(companion.personalInfo).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-500 capitalize">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Medidas</h2>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(companion.measurements).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-500 capitalize">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <p className="text-gray-500">A partir de</p>
                  <p className="text-3xl font-bold text-pink-500">R$ {companion.price}</p>
                </div>
                
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600 mb-4"
                  onClick={() => setShowContact(true)}
                >
                  Contatar Agora
                </Button>

                {showContact && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Phone className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">WhatsApp</p>
                        <p className="font-medium">{companion.contact.whatsapp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{companion.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Horário de Atendimento</p>
                        <p className="font-medium">Segunda a Sexta: {companion.schedule.weekdays}</p>
                        <p className="font-medium">Sábado: {companion.schedule.saturday}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Áreas de Atendimento</h3>
                <div className="flex flex-wrap gap-2">
                  {companion.serviceAreas.map((area) => (
                    <Badge key={area} variant="secondary">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};