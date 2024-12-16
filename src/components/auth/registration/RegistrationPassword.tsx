import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordProps {
  formData: {
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegistrationPassword = ({ formData, onChange }: PasswordProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="register-password">Senha</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={onChange}
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
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};