import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, LineChart, PieChart, Target } from "lucide-react";

interface PremiumModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumModal = ({ open, onOpenChange }: PremiumModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2">
              Quer ter acesso a todas as funcionalidades do inSumma?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Inscreva-se para receber nosso convite de acesso antes de todos!
            </p>
          </div>

          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="light"
            providers={[]}
            redirectTo={`${window.location.origin}/profile`}
          />

          <div className="mt-8 space-y-4">
            <h3 className="text-center text-sm font-medium text-gray-600">
              Assine e tenha análise detalhada!
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <BarChart className="w-12 h-12 text-purple-500" />
                <span className="text-xs mt-2">Progresso por livro</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <PieChart className="w-12 h-12 text-orange-500" />
                <span className="text-xs mt-2">Taxa de acertos</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <LineChart className="w-12 h-12 text-green-500" />
                <span className="text-xs mt-2">Evolução diária</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                <Target className="w-12 h-12 text-blue-500" />
                <span className="text-xs mt-2">Domínio de temas</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};