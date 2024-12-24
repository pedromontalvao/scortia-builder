import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-pink-400 opacity-20"></div>
            <Loader2 className="h-12 w-12 animate-spin text-pink-500 relative z-10" />
          </div>
          <p className="text-gray-500 animate-pulse">Carregando acompanhantes...</p>
        </div>
      </div>
    </div>
  );
};