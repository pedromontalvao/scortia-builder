import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Trophy, DollarSign, Users, Timer } from "lucide-react";
import { format, differenceInSeconds } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Bid {
  amount: number;
  userId: string;
  createdAt: Date;
}

interface AuctionSectionProps {
  companionId: string;
  currentPrice: number;
  endTime: Date;
  highestBid?: Bid;
  totalBids: number;
}

export const AuctionSection = ({
  companionId,
  currentPrice = 1, // Starting at R$1
  endTime,
  highestBid,
  totalBids
}: AuctionSectionProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      const secondsLeft = differenceInSeconds(endTime, new Date());
      
      if (secondsLeft <= 0) {
        setTimeLeft("Leilão encerrado");
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const handleBid = () => {
    const amount = Number(bidAmount);
    if (amount <= currentPrice) {
      toast({
        title: "Lance inválido",
        description: "Seu lance deve ser maior que o valor atual",
        variant: "destructive"
      });
      return;
    }

    // In development mode, simulate successful bid
    if (process.env.NODE_ENV === 'development') {
      toast({
        title: "Lance enviado!",
        description: "Seu lance foi registrado com sucesso.",
      });
      setBidAmount("");
      return;
    }

    console.log("Submitting bid:", { companionId, amount });
  };

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-none shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            SexyMatch - Leilão VIP
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">
                R$ {currentPrice}
              </div>
              <div className="text-sm text-gray-600">Lance Atual</div>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-lg col-span-2">
              <Timer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-orange-600 font-mono">
                {timeLeft}
              </div>
              <div className="text-sm text-gray-600">Tempo Restante</div>
            </div>
            
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {totalBids}
              </div>
              <div className="text-sm text-gray-600">Total de Lances</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Digite seu lance"
                className="flex-1"
                min={currentPrice + 1}
                step="1"
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  >
                    Dar Lance
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Lance</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você está prestes a dar um lance de R$ {bidAmount}. Esta ação não pode ser desfeita.
                      Ao confirmar, você concorda com os termos do leilão.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleBid}>
                      Confirmar Lance
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="text-sm text-gray-500">
              * Lance mínimo: R$ {currentPrice + 1}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};