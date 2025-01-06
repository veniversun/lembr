import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignUpForm, SignUpFormData } from "./premium/SignUpForm";
import { AnalyticsPreview } from "./premium/AnalyticsPreview";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumModal = ({ open, onOpenChange }: PremiumModalProps) => {
  const navigate = useNavigate();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

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
          age: parseInt(formData.age),
          city: formData.city,
        }
      }
    });

    if (error) throw error;
    console.log("Sign up successful:", data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold">
            Acesse todas as funcionalidades do inSumma
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Auth Form Section */}
          <div className="flex-1">
            {showAdditionalFields ? (
              <SignUpForm onSignUp={handleSignUp} />
            ) : (
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="light"
                providers={[]}
                redirectTo={window.location.origin}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: "E-mail",
                      password_label: "Senha",
                      button_label: "Entrar",
                      loading_button_label: "Entrando...",
                      email_input_placeholder: "Seu e-mail",
                      password_input_placeholder: "Sua senha",
                      link_text: "Não tem uma conta? Cadastre-se",
                    },
                    sign_up: {
                      email_label: "E-mail",
                      password_label: "Senha",
                      button_label: "Cadastrar",
                      loading_button_label: "Cadastrando...",
                      email_input_placeholder: "Seu e-mail",
                      password_input_placeholder: "Sua senha",
                      link_text: "Já tem uma conta? Entre",
                    },
                  },
                }}
                view="sign_in"
              />
            )}
          </div>

          {/* Analytics Preview Section */}
          <AnalyticsPreview />
        </div>
      </DialogContent>
    </Dialog>
  );
};