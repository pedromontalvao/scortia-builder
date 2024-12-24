import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Timer, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AuctionPreview {
  id: string;
  companionId: string;
  companionName: string;
  imageUrl: string;
  currentPrice: number;
  endTime: Date;
  totalBids: number;
}

export const SexyMatchWidget = () => {
  const navigate = useNavigate();
  
  // In development mode, use demo data
  const activeAuctions: AuctionPreview[] = [
    {
      id: "auction-1",
      companionId: "demo-1",
      companionName: "Ana Silva",
      imageUrl: "/demo/ana-1.jpg",
      currentPrice: 500,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      totalBids: 12
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-lg overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              SexyMatch - Leilões VIP
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-700 group"
            onClick={() => navigate('/leiloes')}
          >
            Ver todos
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAuctions.map((auction) => (
            <Card 
              key={auction.id}
              className="bg-white/80 hover:bg-white transition-colors cursor-pointer group"
              onClick={() => navigate(`/acompanhante/${auction.companionId}`)}
            >
              <CardContent className="p-4">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                  <img
                    src={auction.imageUrl}
                    alt={auction.companionName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-semibold">{auction.companionName}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Timer className="w-4 h-4" />
                        {formatDistanceToNow(auction.endTime, { locale: ptBR, addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lance atual</span>
                    <span className="font-semibold text-green-600">
                      R$ {auction.currentPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total de lances</span>
                    <span className="font-medium">{auction.totalBids}</span>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 mt-2"
                  >
                    Participar do Leilão
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};