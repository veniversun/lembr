import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { AnalyticsPreview } from "@/components/premium/AnalyticsPreview";
import { supabase } from "@/integrations/supabase/client";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session) {
        onOpenChange(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        onOpenChange(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [onOpenChange]);

  const handleSuccess = () => {
    onOpenChange(false);
    navigate('/registrado');
  };

  const handleBack = () => {
    setActiveTab("login");
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold mb-4">
                {activeTab === "login" ? "Bem-vindo de volta!" : "Criar Conta"}
              </DialogTitle>
            </DialogHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Criar Conta</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onSuccess={handleSuccess} />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm onSuccess={handleSuccess} onBack={handleBack} />
              </TabsContent>
            </Tabs>
          </div>
          <div className="hidden md:block bg-gradient-to-br from-purple-50 to-indigo-50 p-6 border-l">
            <h3 className="text-xl font-semibold text-center mb-6">
              Acompanhe seu progresso
            </h3>
            <AnalyticsPreview />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};