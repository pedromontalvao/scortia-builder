import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoProps {
  formData: {
    name: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RegistrationBasicInfo = ({ formData, onChange }: BasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};