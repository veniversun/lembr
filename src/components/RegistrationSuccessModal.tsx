import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PartyPopper, Trophy } from "lucide-react";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center gap-2 mb-4">
            <PartyPopper className="h-8 w-8 text-yellow-500" />
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center space-y-2">
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
      </DialogContent>
    </Dialog>
  );
};