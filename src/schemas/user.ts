import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Informe o nome completo"),
  role: z.enum(["ADMIN", "STAFF"], { message: "Selecione um perfil" }),
  password: z.string().min(6, "A senha deve ter ao menos 6 caracteres"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(2, "Informe o nome completo"),
  role: z.enum(["ADMIN", "STAFF"], { message: "Selecione um perfil" }),
  isActive: z.boolean(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
