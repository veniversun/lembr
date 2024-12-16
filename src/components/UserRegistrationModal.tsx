import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userNickname: string;
  setUserName: (name: string) => void;
  setUserNickname: (nickname: string) => void;
}

export const UserRegistrationModal = ({
  open,
  onOpenChange,
  userName,
  userNickname,
  setUserName,
  setUserNickname,
}: UserRegistrationModalProps) => {
  const { toast } = useToast();

  const handleUserSubmit = async () => {
    if (!userName || !userNickname) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .insert([{ name: userName, nickname: userNickname }])
        .select()
        .single();

      if (error) throw error;

      localStorage.setItem("userId", data.id.toString());
      onOpenChange(false);

      await supabase.from("user_progress").insert([
        { user_id: data.id, book_type: "psifin" }
      ]);

      toast({
        title: "Sucesso",
        description: "Usuário registrado com sucesso!",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar usuário",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bem-vindo! Por favor, se identifique</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome
            </label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium mb-1">
              Apelido
            </label>
            <Input
              id="nickname"
              value={userNickname}
              onChange={(e) => setUserNickname(e.target.value)}
              placeholder="Seu apelido"
            />
          </div>
          <Button onClick={handleUserSubmit} className="w-full">
            Começar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};