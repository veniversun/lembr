import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, LineChart, PieChart, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumModal = ({ open, onOpenChange }: PremiumModalProps) => {
  const navigate = useNavigate();
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    occupation: "",
    age: "",
    city: "",
    email: "",
    password: "",
  });

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

  const handleSignUp = async () => {
    try {
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
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const CustomSignUpForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="fullName">Nome Completo</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="gender">Sexo</Label>
        <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="feminino">Feminino</SelectItem>
            <SelectItem value="outro">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="occupation">Ocupação</Label>
        <Input
          id="occupation"
          value={formData.occupation}
          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="age">Idade</Label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="city">Cidade</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </div>
      <Button onClick={handleSignUp} className="w-full">
        Cadastrar
      </Button>
    </div>
  );

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
              <CustomSignUpForm />
            ) : (
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="light"
                providers={[]}
                redirectTo={window.location.origin}
                view="sign_in"
                localization={{
                  variables: {
                    sign_in: {
                      email_label: "E-mail",
                      password_label: "Senha",
                      button_label: "Entrar",
                      loading_button_label: "Entrando...",
                      email_input_placeholder: "Seu e-mail",
                      password_input_placeholder: "Sua senha",
                      link_text: "Já tem uma conta? Entre",
                    },
                    sign_up: {
                      email_label: "E-mail",
                      password_label: "Senha",
                      button_label: "Cadastrar",
                      loading_button_label: "Cadastrando...",
                      email_input_placeholder: "Seu e-mail",
                      password_input_placeholder: "Sua senha",
                      link_text: "Não tem uma conta? Cadastre-se",
                    },
                  },
                }}
              />
            )}
            {!showAdditionalFields && (
              <Button 
                variant="link" 
                onClick={() => setShowAdditionalFields(true)}
                className="w-full mt-4"
              >
                Não tem uma conta? Cadastre-se
              </Button>
            )}
          </div>

          {/* Analytics Section */}
          <div className="flex-1">
            <h3 className="text-center text-base font-medium text-gray-700 mb-4">
              Tenha análise detalhada!
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <BarChart className="w-16 h-16 text-purple-500" />
                <span className="text-sm mt-2 font-medium">Progresso por livro</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <PieChart className="w-16 h-16 text-orange-500" />
                <span className="text-sm mt-2 font-medium">Taxa de acertos</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <LineChart className="w-16 h-16 text-green-500" />
                <span className="text-sm mt-2 font-medium">Evolução diária</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Target className="w-16 h-16 text-blue-500" />
                <span className="text-sm mt-2 font-medium">Domínio de temas</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};