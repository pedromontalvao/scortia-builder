import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Trophy, DollarSign, Users, Timer, Coins } from "lucide-react";
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
  const [timeLeft, setTimeLeft] = useState("");
  const [userCredits, setUserCredits] = useState(100); // Demo: Start with 100 credits
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
    if (userCredits < 1) {
      toast({
        title: "Créditos insuficientes",
        description: "Você precisa comprar mais créditos para continuar participando.",
        variant: "destructive"
      });
      return;
    }

    // In development mode, simulate successful bid
    if (process.env.NODE_ENV === 'development') {
      setUserCredits(prev => prev - 1); // Deduct 1 credit (1 centavo)
      toast({
        title: "Lance registrado!",
        description: "Seu lance de R$ 0,01 foi registrado com sucesso.",
      });
      return;
    }

    console.log("Submitting bid:", { companionId, amount: 0.01 });
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
                R$ {currentPrice.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Valor Atual</div>
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

          <div className="p-4 bg-white/50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Seus créditos:</span>
              </div>
              <span className="font-bold text-lg">{userCredits}</span>
            </div>
            <div className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  >
                    Dar Lance (1 crédito)
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Lance</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você está prestes a dar um lance de R$ 0,01. Esta ação não pode ser desfeita.
                      Será descontado 1 crédito da sua conta.
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

              <Button 
                variant="outline"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Comprar créditos",
                    description: "Funcionalidade em desenvolvimento.",
                  });
                }}
              >
                Comprar mais créditos
              </Button>
            </div>
            
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <p>* Cada lance custa 1 crédito (R$ 0,01)</p>
              <p>* O último lance antes do fim do temporizador vence o leilão</p>
              <p>* Os créditos não são reembolsáveis</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};