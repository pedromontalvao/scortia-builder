import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, hardcoded test user
    if (email === "test@test.com" && password === "pedrorodrigues") {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo(a) de volta!"
      });
      
      // Store user type in localStorage for demo
      localStorage.setItem("userType", "companion");
      localStorage.setItem("isLoggedIn", "true");
      
      onClose();
      navigate("/painel");
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
};