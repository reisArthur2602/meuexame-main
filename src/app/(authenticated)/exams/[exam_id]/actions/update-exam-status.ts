"use server";

import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/helpers/verify-auth";
import prisma from "@/lib/prisma";
import type { ExamStatus } from "@/types";

export const updateExamStatus = async (examId: string, status: ExamStatus) => {
  const { id: userId } = await verifyAuth();

  const now = new Date();

  try {
    await prisma.exam.update({
      where: { id: examId },
      data: {
        status,
        updatedById: userId,
        availableAt: status === "AVAILABLE" ? now : undefined,
        blockedAt: status === "BLOCKED" ? now : undefined,
      },
    });
  } catch {
    throw new Error("Erro ao atualizar o status do exame.");
  }

  revalidatePath("/exams");
  revalidatePath(`/exams/${examId}`);

  const messages: Record<ExamStatus, string> = {
    AVAILABLE: "Exame disponibilizado com sucesso.",
    BLOCKED: "Exame bloqueado com sucesso.",
    ARCHIVED: "Exame arquivado com sucesso.",
  };

  return { success: true, message: messages[status] };
};
