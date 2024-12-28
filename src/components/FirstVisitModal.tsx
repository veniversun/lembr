import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FirstVisitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

export const FirstVisitModal = ({
  open,
  onOpenChange,
  onLogin,
}: FirstVisitModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registre sua evolução</DialogTitle>
          <DialogDescription>
            Quer logar para registrar sua evolução?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Depois
          </Button>
          <Button onClick={onLogin}>Logar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};