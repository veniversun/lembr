import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { AuthLayout } from "./auth/AuthLayout";
import { LoginForm } from "./auth/LoginForm";
import { SignUpForm } from "./auth/SignUpForm";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <AuthLayout
          title={showLogin ? "Entrar" : "Criar conta"}
          description={showLogin ? "Entre com seu e-mail e senha" : "Preencha os dados para criar sua conta"}
        >
          {showLogin ? (
            <LoginForm onSignUpClick={() => setShowLogin(false)} />
          ) : (
            <SignUpForm
              onLoginClick={() => setShowLogin(true)}
              onSuccess={() => onOpenChange(false)}
            />
          )}
        </AuthLayout>
      </DialogContent>
    </Dialog>
  );
};