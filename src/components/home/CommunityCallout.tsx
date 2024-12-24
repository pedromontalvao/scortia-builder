import { Megaphone, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const CommunityCallout = () => {
  const navigate = useNavigate();
  const [hasSeenCallout, setHasSeenCallout] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenCommunityCallout");
    setHasSeenCallout(!!seen);
    
    if (inView && !seen) {
      localStorage.setItem("hasSeenCommunityCallout", "true");
    }
  }, [inView]);

  if (hasSeenCallout) return null;

  return (
    <Card 
      ref={ref}
      className={`bg-gradient-to-r from-purple-50 to-pink-50 border-none shadow-lg overflow-hidden transition-all duration-1000 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <Megaphone className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Você sabia que temos uma comunidade?
            </h3>
            <p className="text-gray-600 mt-1">
              Junte-se a milhares de pessoas compartilhando experiências e dicas!
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center"
              >
                <Users className="w-5 h-5 text-white" />
              </div>
            ))}
          </div>
          
          <Button 
            onClick={() => navigate('/comunidade')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group"
          >
            Participar
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </Card>
  );
};