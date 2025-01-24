import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GoProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoProModal = ({ isOpen, onClose }: GoProModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Esta é uma funcionalidade PRO
          </DialogTitle>
        </DialogHeader>
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Se torne profissional, aprenda e aplique os melhores livros:
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => {
              onClose();
              navigate('/practice');
            }}
            variant="outline"
            className="w-full"
          >
            Testar Grátis
          </Button>
          <Button 
            onClick={() => {
              onClose();
              navigate('/vendas');
            }}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Quero PRO!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};