import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

// Demo data for development
const demoCompanion = {
  id: "comp-001",
  name: "Ana Silva",
  description: "Olá! Sou a Ana, uma acompanhante profissional com experiência em proporcionar momentos únicos e especiais.",
  neighborhood: "Centro",
  city: "Várzea Grande",
  state: "MT",
  rating: 4.8,
  reviews: 24,
  experience: "3 anos",
  views: 1500,
  likes: 120,
  messages: 45,
  price: 300,
  is_premium: true,
  is_verified: true,
  age: "25",
  height: "1.70m",
  weight: "55kg",
  hair_color: "Loiro",
  eye_color: "Castanhos",
  body_type: "Atlético",
  bust: "95cm",
  waist: "60cm",
  hips: "90cm",
  whatsapp: "(65) 99999-9999",
  email: "ana.silva@example.com",
  weekday_hours: "9h às 22h",
  weekend_hours: "10h às 20h",
  service_areas: ["Várzea Grande", "Cuiabá"],
  companion_photos: [
    { url: "/demo/ana-1.jpg", is_primary: true },
    { url: "/demo/ana-2.jpg", is_primary: false },
    { url: "/demo/ana-3.jpg", is_primary: false }
  ],
  companion_services: [
    {
      title: "Encontro Casual",
      duration: "1 hora",
      price: 300,
      description: "Encontro casual com muito carinho e atenção"
    },
    {
      title: "Pernoite",
      duration: "12 horas",
      price: 1500,
      description: "Acompanhamento completo durante toda a noite"
    }
  ],
  presentation_audio: "/demo/presentation.mp3",
  voice_message: "/demo/voice-message.mp3"
};

export const useCompanionData = (id?: string) => {
  return useQuery({
    queryKey: ['companion', id],
    queryFn: async () => {
      console.log('Fetching companion data for ID:', id);

      if (id === 'comp-001') {
        console.log('Returning demo data for comp-001');
        return demoCompanion;
      }

      const { data, error } = await supabase
        .from('companions')
        .select(`
          *,
          companion_photos(url, is_primary),
          companion_services(title, duration, price, description)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching companion:', error);
        throw error;
      }
      
      console.log('Fetched companion data:', data);
      return data;
    }
  });
};