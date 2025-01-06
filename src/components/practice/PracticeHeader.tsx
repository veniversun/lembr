import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthModal } from "@/components/AuthModal";
import { PremiumModal } from "@/components/PremiumModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PracticeHeaderProps {
  title: string;
}

export const PracticeHeader = ({ title }: PracticeHeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao sistema.",
        });
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [toast, navigate]);

  const updatedTitle = title.replace("Pratique", "Treine");

  return (
    <>
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-3xl font-bold">{updatedTitle}</h1>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => setShowPremiumModal(true)}
          >
            <Trophy className="mr-2" /> Conquistas
          </Button>
          <Link to="/">
            <Button variant="outline">
              <Home className="mr-2" /> Início
            </Button>
          </Link>
        </div>
      </div>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
      />

      <PremiumModal 
        open={showPremiumModal} 
        onOpenChange={setShowPremiumModal}
      />
    </>
  );
};