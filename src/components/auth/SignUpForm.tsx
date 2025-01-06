import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SignUpFormProps {
  onLoginClick: () => void;
  onSuccess?: () => void;
}

export const SignUpForm = ({ onLoginClick, onSuccess }: SignUpFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    occupation: "",
    age: "",
    city: "",
    state: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            gender: formData.gender,
            occupation: formData.occupation,
            age: formData.age,
            city: formData.city,
            state: formData.state,
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Cadastro realizado",
        description: "Por favor, verifique seu e-mail para confirmar o cadastro.",
      });

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="Sua senha"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="fullName">Nome Completo</Label>
        <Input
          id="fullName"
          placeholder="Seu nome completo"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Sexo</Label>
        <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })} required>
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
      <div className="space-y-2">
        <Label htmlFor="occupation">Ocupação</Label>
        <Select value={formData.occupation} onValueChange={(value) => setFormData({ ...formData, occupation: value })} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="empresario">Empresário</SelectItem>
            <SelectItem value="autonomo">Autônomo</SelectItem>
            <SelectItem value="servidor">Servidor</SelectItem>
            <SelectItem value="estudante">Estudante</SelectItem>
            <SelectItem value="clt">CLT</SelectItem>
            <SelectItem value="outros">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Idade</Label>
        <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })} required>
          <SelectTrigger>
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ate18">Até 18</SelectItem>
            <SelectItem value="19a25">19 a 25</SelectItem>
            <SelectItem value="26a30">26 a 30</SelectItem>
            <SelectItem value="31a35">31 a 35</SelectItem>
            <SelectItem value="36a40">36 a 40</SelectItem>
            <SelectItem value="acima40">Acima de 40</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">Cidade</Label>
        <Input
          id="city"
          placeholder="Sua cidade"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="state">Estado</Label>
        <Input
          id="state"
          placeholder="Seu estado"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </Button>
      <Button
        type="button"
        variant="link"
        className="w-full"
        onClick={onLoginClick}
      >
        Já tem uma conta? Entre
      </Button>
    </form>
  );
};