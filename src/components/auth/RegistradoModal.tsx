import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RegistradoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegistradoModal = ({ open, onOpenChange }: RegistradoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogClose className="absolute right-4 top-4">
          <X className="h-4 w-4" />
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold mb-4">
            Obrigado pelo seu cadastro!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <div className="text-6xl mb-6">
            👏👏👏
          </div>
          <p className="text-gray-700 leading-relaxed">
            Você está entre os primeiros que terão acesso completo ao nosso novo DashBoard 
            com gráficos de evolução e outras funcionalidades!
          </p>
          <p className="text-gray-700 leading-relaxed">
            Te avisamos logo que estiver disponível!
          </p>
          <p className="text-gray-700 leading-relaxed">
            Enquanto isso escolha outro livro para praticar.
            <br />
            Bons estudos!
          </p>
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-2 mt-4"
          >
            Começar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};