import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpForm, SignUpFormData } from "./premium/SignUpForm";
import { AnalyticsPreview } from "./premium/AnalyticsPreview";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumModal = ({ open, onOpenChange }: PremiumModalProps) => {
  const navigate = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === 'SIGNED_IN') {
        console.log("User signed in, closing modal and redirecting to registrado page");
        onOpenChange(false);
        navigate('/registrado');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, onOpenChange]);

  const handleSignUp = async (formData: SignUpFormData) => {
    console.log("Attempting to sign up with data:", formData);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          gender: formData.gender,
          occupation: formData.occupation,
          age: formData.age,
          city: formData.city,
          state: formData.state,
        }
      }
    });

    if (error) throw error;
    console.log("Sign up successful:", data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogTitle className="text-center text-lg font-semibold">
          Acesse todas as funcionalidades do inSumma
        </DialogTitle>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <SignUpForm onSignUp={handleSignUp} onCancel={() => onOpenChange(false)} />
          </div>
          <AnalyticsPreview />
        </div>
      </DialogContent>
    </Dialog>
  );
};