import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("client");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically make an API call to register the user
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Você já pode fazer login."
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="register-password">Senha</Label>
        <Input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="confirm-password">Confirmar Senha</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <Label>Tipo de Conta</Label>
        <RadioGroup value={userType} onValueChange={setUserType} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="client" id="client" />
            <Label htmlFor="client">Cliente</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="companion" id="companion" />
            <Label htmlFor="companion">Acompanhante</Label>
          </div>
        </RadioGroup>
      </div>
      
      <Button type="submit" className="w-full">
        Cadastrar
      </Button>
    </form>
  );
};