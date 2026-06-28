"use server";

import prisma from "@/lib/prisma";
import { lookupExamSchema } from "@/schemas/exam";

export const lookupExam = async (input: unknown) => {
  const parsed = lookupExamSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "Preencha todos os campos corretamente." };
  }

  const { cpf, protocol } = parsed.data;

  let exam;
  try {
    exam = await prisma.exam.findUnique({
      where: { patientCpf_protocol: { patientCpf: cpf, protocol: protocol.toUpperCase() } },
      select: { status: true },
    });
  } catch {
    throw new Error("Erro ao consultar o banco de dados.");
  }

  if (!exam) {
    return { success: false, message: "Exame não encontrado. Verifique os dados e tente novamente." };
  }

  if (exam.status !== "AVAILABLE") {
    return { success: false, message: "Este exame não está disponível no momento." };
  }

  return { success: true, message: "Exame localizado com sucesso." };
};
