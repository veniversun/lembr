import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormFields } from "./FormFields";
import { formSchema, FormSchema } from "./formTypes";

interface SignUpFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const SignUpForm = ({ onSuccess, onBack }: SignUpFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      city: "",
      age: "",
      occupation: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      setLoading(true);
      const { error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            full_name: `${values.firstName} ${values.lastName}`,
            city: values.city,
            age: values.age,
            occupation: values.occupation,
          },
        },
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Conta criada com sucesso!",
        description: "Verifique seu email para confirmar o cadastro.",
      });
      onSuccess();
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFields form={form} />
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="w-full" onClick={onBack}>
            Voltar
          </Button>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Criando conta..." : "Concluir"}
          </Button>
        </div>
      </form>
    </Form>
  );
};