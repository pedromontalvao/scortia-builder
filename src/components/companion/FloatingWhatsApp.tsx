import { WhatsappLogo } from "lucide-react";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  name: string;
}

export const FloatingWhatsApp = ({ phoneNumber, name }: FloatingWhatsAppProps) => {
  const handleClick = () => {
    const message = `Olá ${name}, vi seu perfil no site e gostaria de mais informações.`;
    const whatsappUrl = `https://wa.me/55${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50 flex items-center gap-2 group"
    >
      <WhatsappLogo className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
        Chamar no WhatsApp
      </span>
    </button>
  );
};