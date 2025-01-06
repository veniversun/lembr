import * as z from "zod";

export const formSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  firstName: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter no mínimo 2 caracteres"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres"),
  age: z.string().min(1, "Faixa etária é obrigatória"),
  occupation: z.string().min(1, "Ocupação é obrigatória"),
});

export const ageRanges = [
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+"
];

export const occupationOptions = [
  "Autônomo",
  "CLT",
  "Empresário",
  "Servidor Público",
  "Estudante",
  "Outros"
];

export type FormSchema = z.infer<typeof formSchema>;