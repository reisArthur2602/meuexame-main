import { z } from "zod";

export const createExamSchema = z.object({
  patientName: z.string().min(2, "Informe o nome do paciente"),
  patientCpf: z.string().min(11, "CPF inválido"),
  patientPhone: z.string().optional(),
  protocol: z.string().min(1, "Informe o protocolo"),
  publishNow: z.boolean(),
});

export type CreateExamInput = z.infer<typeof createExamSchema>;

export const lookupExamSchema = z.object({
  cpf: z.string().min(11, "CPF inválido"),
  protocol: z.string().min(1, "Informe o protocolo"),
});

export type LookupExamInput = z.infer<typeof lookupExamSchema>;
