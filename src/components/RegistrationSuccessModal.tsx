import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PartyPopper, BarChart2, PieChart, LineChart, Target } from "lucide-react";

interface RegistrationSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegistrationSuccessModal = ({
  open,
  onOpenChange,
}: RegistrationSuccessModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <div className="flex justify-center gap-4 mb-8">
            <PartyPopper className="h-8 w-8 text-yellow-500" />
            <PartyPopper className="h-8 w-8 text-yellow-500" />
            <PartyPopper className="h-8 w-8 text-yellow-500" />
          </div>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-base">
                Você está entre os primeiros que terão acesso completo ao nosso novo DashBoard com gráficos de evolução e outras funcionalidades!
              </p>
              <p className="text-base">
                Te avisamos logo que estiver disponível!
              </p>
              <p className="text-base">
                Enquanto isso escolha outro livro para praticar.
              </p>
              <p className="text-base font-medium">
                Bons estudos!
              </p>
            </div>
            <Button
              onClick={() => {
                onOpenChange(false);
                navigate("/");
              }}
              className="w-full"
            >
              Ir para o início
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <BarChart2 className="w-16 h-16 text-purple-500" />
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
      </DialogContent>
    </Dialog>
  );
};