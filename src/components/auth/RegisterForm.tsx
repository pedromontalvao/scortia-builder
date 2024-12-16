import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/lib/supabase";

export const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "client",
    name: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Starting registration process...');

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Erro no cadastro",
          description: "As senhas não coincidem",
          variant: "destructive"
        });
        return;
      }

      console.log('Attempting to register user with Supabase Auth...');
      
      // Register user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
            user_type: formData.userType
          }
        }
      });

      if (authError) {
        console.error('Supabase Auth error:', authError);
        throw authError;
      }

      if (!authData.user) {
        console.error('No user data returned from Supabase Auth');
        throw new Error('Registration failed - no user data');
      }

      console.log('User registered successfully with Supabase Auth');

      // Create profile in the appropriate table based on user type
      if (formData.userType === "companion") {
        console.log('Creating companion profile...');
        
        const { error: profileError } = await supabase
          .from('companions')
          .insert([
            {
              user_id: authData.user.id,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              is_verified: false,
              is_premium: false
            }
          ]);

        if (profileError) {
          console.error('Error creating companion profile:', profileError);
          throw profileError;
        }

        console.log('Companion profile created successfully');
      }

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu email para confirmar o cadastro."
      });

      // Store user type in localStorage
      localStorage.setItem("userType", formData.userType);
      localStorage.setItem("isLoggedIn", "true");
      
      onClose();
      
      // Redirect based on user type
      if (formData.userType === "companion") {
        navigate("/painel");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao realizar o cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="register-password">Senha</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="confirm-password">Confirmar Senha</Label>
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label>Tipo de Conta</Label>
        <RadioGroup 
          value={formData.userType} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
          className="mt-2"
        >
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
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
};