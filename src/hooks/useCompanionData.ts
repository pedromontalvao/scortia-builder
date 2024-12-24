import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const demoCompanion = {
  id: "demo-1",
  name: "Ana Silva",
  description: "Olá! Sou a Ana, uma acompanhante profissional com experiência em proporcionar momentos únicos e especiais. Atendo com muito carinho e discrição.",
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
  service_areas: ["Várzea Grande", "Cuiabá", "Santo Antônio do Leverger"],
  companion_photos: [
    { url: "/demo/ana-1.jpg", is_primary: true },
    { url: "/demo/ana-2.jpg", is_primary: false },
    { url: "/demo/ana-3.jpg", is_primary: false },
    { url: "/demo/ana-4.jpg", is_primary: false }
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
    },
    {
      title: "Jantar ou Eventos",
      duration: "4 horas",
      price: 800,
      description: "Acompanhamento em jantares, festas ou eventos sociais"
    }
  ],
  presentation_audio: "/demo/presentation.mp3",
  voice_message: "/demo/voice-message.mp3",
  reviews_data: [
    {
      id: 1,
      user: "Cliente Anônimo",
      rating: 5,
      comment: "Excelente companhia, muito atenciosa e carinhosa.",
      date: "2024-03-15"
    },
    {
      id: 2,
      user: "Cliente Verificado",
      rating: 4,
      comment: "Ótima experiência, recomendo!",
      date: "2024-03-10"
    }
  ],
  stats: {
    total_meetings: 156,
    repeat_clients: 45,
    satisfaction_rate: 98
  },
  user_id: "demo-user-1",
  community_posts: [
    {
      id: "post-1",
      content: "Acabei de adicionar novas fotos ao meu perfil! 📸 Confiram!",
      likes: 24,
      comments: 8,
      created_at: "2024-03-20T10:30:00Z",
      is_premium: true
    },
    {
      id: "post-2",
      content: "Agradeço todo o carinho que venho recebendo! ❤️ Vocês são incríveis!",
      likes: 45,
      comments: 12,
      created_at: "2024-03-19T15:45:00Z"
    },
    {
      id: "post-3",
      content: "Novo ensaio fotográfico disponível para assinantes! 🔥",
      likes: 67,
      comments: 15,
      created_at: "2024-03-18T20:15:00Z",
      is_premium: true
    }
  ],
  subscription_price: 49.90,
  has_active_subscription: false
};

export const useCompanionData = (id?: string) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['companion', id],
    queryFn: async () => {
      console.log('Fetching companion data for ID:', id);

      if (!id) {
        console.error('No companion ID provided');
        throw new Error('No companion ID provided');
      }

      // Return demo data for development
      if (id === 'demo-1') {
        console.log('Returning demo data for demo-1');
        return demoCompanion;
      }

      try {
        const { data, error } = await supabase
          .from('companions')
          .select(`
            *,
            companion_photos(url, is_primary),
            companion_services(title, duration, price, description),
            reviews_data:reviews(id, user, rating, comment, date),
            stats(total_meetings, repeat_clients, satisfaction_rate)
          `)
          .eq('id', id)
          .single();

        if (error) {
          console.error('Supabase error fetching companion:', error);
          toast({
            title: "Erro ao carregar dados",
            description: "Não foi possível carregar as informações da acompanhante.",
            variant: "destructive"
          });
          throw error;
        }

        if (!data) {
          console.error('No companion found with ID:', id);
          toast({
            title: "Perfil não encontrado",
            description: "O perfil solicitado não foi encontrado.",
            variant: "destructive"
          });
          throw new Error('Companion not found');
        }
        
        console.log('Successfully fetched companion data:', data);
        return data;
      } catch (error) {
        console.error('Error in useCompanionData:', error);
        throw error;
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
