import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const RegistrationModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    idade: "",
    sexo: "",
    ocupacao: "",
    cidade: "",
    estado: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setOpen(true);
    // Increment numero_acessos
    const updateAcessos = async () => {
      try {
        const { data, error: updateError } = await supabase
          .from("acessos")
          .update({ numero_acessos: 1 })
          .eq('id', 1)
          .select();
          
        if (updateError) throw updateError;
      } catch (error) {
        console.error("Error updating acessos:", error);
      }
    };
    
    updateAcessos();
  }, []);

  const handleSubmit = async () => {
    if (!formData.nome || !formData.email || !formData.idade || !formData.sexo || 
        !formData.ocupacao || !formData.cidade || !formData.estado) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      // Insert new registration
      const { error: registroError } = await supabase
        .from("interessados")
        .insert([formData]);

      if (registroError) throw registroError;

      // Increment numero_registros
      const { error: acessosError } = await supabase
        .from("acessos")
        .update({ numero_registros: 1 })
        .eq('id', 1)
        .select();

      if (acessosError) throw acessosError;

      setOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Registro realizado com sucesso!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro",
        description: "Erro ao salvar registro",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bem-vindo! Por favor, se identifique</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Input
              placeholder="Nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Idade"
              value={formData.idade}
              onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
            />
          </div>
          <Select onValueChange={(value) => setFormData({ ...formData, sexo: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sexo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="masculino">Masculino</SelectItem>
              <SelectItem value="feminino">Feminino</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setFormData({ ...formData, ocupacao: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Ocupação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Autônomo">Autônomo</SelectItem>
              <SelectItem value="CLT">CLT</SelectItem>
              <SelectItem value="Empresário">Empresário</SelectItem>
              <SelectItem value="Servidor Público">Servidor Público</SelectItem>
              <SelectItem value="Estudante">Estudante</SelectItem>
              <SelectItem value="Outros">Outros</SelectItem>
            </SelectContent>
          </Select>
          <div>
            <Input
              placeholder="Cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
            />
          </div>
          <div>
            <Input
              placeholder="Estado"
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Começar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};