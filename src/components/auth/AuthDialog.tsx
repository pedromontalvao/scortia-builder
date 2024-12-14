import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export const AuthDialog = ({ isOpen, onClose, defaultTab = "login" }: AuthDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Entrar ou Cadastrar</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm onClose={onClose} />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm onClose={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};