import { useState } from "react";
import { Header } from "@/components/home/Header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { GradientButton } from "@/components/ui/gradient-button";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RegistrationSuccessModal } from "@/components/RegistrationSuccessModal";

const formSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  gender: z.string().min(1, "Selecione o sexo"),
  occupation: z.string().min(1, "Selecione a ocupação"),
  age: z.string().min(1, "Selecione a faixa etária"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
  state: z.string().min(2, "Estado deve ter no mínimo 2 caracteres"),
});

const occupationOptions = [
  "Empreendedor",
  "Autônomo",
  "CLT",
  "Estudante",
  "Outros",
];

const ageRanges = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

const genderOptions = ["Masculino", "Feminino", "Outro", "Prefiro não informar"];

export default function Cadastro() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      occupation: "",
      age: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from("registros").insert({
        nome: `${values.firstName} ${values.lastName}`,
        email: values.email,
        idade: parseInt(values.age),
        sexo: values.gender,
        ocupacao: values.occupation,
        cidade: values.city,
        leu_livro: false,
      });

      if (error) throw error;

      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao registrar",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <Header />
      
      <div className="max-w-2xl mx-auto mt-8 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-lg md:text-xl text-gray-700">
            Quer ter acesso antecipado a todas as funcionalidades do inSumma?
          </p>
          <p className="text-lg md:text-xl text-gray-700 font-semibold">
            Basta registrar seu interesse!
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="João" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input placeholder="Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="joao@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genderOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ocupação</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {occupationOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faixa Etária</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ageRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range} anos
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="São Paulo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="SP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <GradientButton type="submit" className="w-full max-w-md mx-auto block">
                  Quero mais!
                </GradientButton>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => navigate("/")}
                  className="w-full text-muted-foreground hover:text-primary"
                >
                  Voltar ao início
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <RegistrationSuccessModal 
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
      />
    </div>
  );
}
