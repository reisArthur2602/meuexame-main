import { z } from "zod";

export const createExamSchema = z.object({
  patientName: z.string().min(2, "Informe o nome do paciente"),
  patientCpf: z.string().min(11, "CPF inválido"),
  patientPhone: z.string().optional(),
  protocol: z.string().min(1, "Informe o protocolo"),
  internalNotes: z.string().optional(),
  publishNow: z.boolean(),
});

export type CreateExamInput = z.infer<typeof createExamSchema>;
