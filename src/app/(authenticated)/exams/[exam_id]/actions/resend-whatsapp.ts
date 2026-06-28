"use server";

import { verifyAuth } from "@/helpers/verify-auth";
import { notifyExamAvailable } from "@/lib/evolution";
import prisma from "@/lib/prisma";

export const resendExamWhatsapp = async (examId: string) => {
  await verifyAuth();

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: { patientName: true, patientPhone: true, protocol: true },
  });

  if (!exam) return { success: false, message: "Exame não encontrado." };
  if (!exam.patientPhone)
    return { success: false, message: "Este exame não possui telefone cadastrado." };

  try {
    await notifyExamAvailable(exam.patientPhone, exam.patientName, exam.protocol);

    await prisma.exam.update({
      where: { id: examId },
      data: {
        whatsappSent: true,
        whatsappSentAt: new Date(),
        whatsappError: null,
        whatsappAttempts: { increment: 1 },
      },
    });

    return { success: true, message: "Mensagem enviada com sucesso." };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";

    await prisma.exam.update({
      where: { id: examId },
      data: { whatsappError: errorMsg, whatsappAttempts: { increment: 1 } },
    });

    return { success: false, message: "Falha ao enviar a mensagem pelo WhatsApp." };
  }
};
