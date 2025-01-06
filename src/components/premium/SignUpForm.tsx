import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SignUpFormProps {
  onSignUp: (formData: SignUpFormData) => Promise<void>;
  onCancel: () => void;
}

export interface SignUpFormData {
  email: string;
  password: string;
  fullName: string;
  gender: string;
  occupation: string;
  age: string;
  city: string;
  state: string;
}

export const SignUpForm = ({ onSignUp, onCancel }: SignUpFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    occupation: "",
    age: "",
    city: "",
    state: "",
  });

  const handleSubmit = async () => {
    if (cooldownSeconds > 0) {
      toast({
        title: "Aguarde",
        description: `Por favor, aguarde ${cooldownSeconds} segundos antes de tentar novamente.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await onSignUp(formData);
    } catch (error: any) {
      console.error("Error signing up:", error);
      
      if (error.message?.includes("over_email_send_rate_limit")) {
        setCooldownSeconds(55);
        const timer = setInterval(() => {
          setCooldownSeconds((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        toast({
          title: "Limite de tentativas excedido",
          description: "Por favor, aguarde 55 segundos antes de tentar novamente.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro",
          description: "Erro ao criar conta. Por favor, tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <Select value={formData.occupation} onValueChange={(value) => setFormData({ ...formData, occupation: value })}>
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
      <div>
        <Label htmlFor="age">Idade</Label>
        <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
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
      <div>
        <Label htmlFor="city">Cidade</Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="state">Estado</Label>
        <Input
          id="state"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={handleSubmit} 
          className="flex-1"
          disabled={isLoading || cooldownSeconds > 0}
        >
          {isLoading ? "Cadastrando..." : cooldownSeconds > 0 ? `Aguarde ${cooldownSeconds}s` : "Cadastrar"}
        </Button>
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isLoading}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};