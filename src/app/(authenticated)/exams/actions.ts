"use server";

import { requirePermissions } from "@/helpers/permissions";
import { notifyExamAvailable } from "@/lib/evolution";
import prisma from "@/lib/prisma";

export type ExamDisplayStatus = "disponivel" | "bloqueado" | "arquivado";

export type ExamListItem = {
  id: string;
  protocol: string;
  patientName: string;
  patientCpf: string;
  patientPhone: string | null;
  status: ExamDisplayStatus;
  whatsappSent: boolean;
  createdAt: string;
};

function mapStatus(s: string): ExamDisplayStatus {
  if (s === "AVAILABLE") return "disponivel";
  if (s === "BLOCKED") return "bloqueado";
  return "arquivado";
}

function maskCpf(cpf: string): string {
  const d = cpf.replace(/\D/g, "");
  if (d.length !== 11) return cpf;
  return `***.${d.slice(3, 6)}.***-${d.slice(9)}`;
}

export async function getExams(): Promise<ExamListItem[]> {
  const { userId } = await requirePermissions(["exam.view"]);

  const exams = await prisma.exam.findMany({
    where: { createdById: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      protocol: true,
      patientName: true,
      patientCpf: true,
      patientPhone: true,
      status: true,
      whatsappSent: true,
      createdAt: true,
    },
  });

  return exams.map((e) => ({
    id: e.id,
    protocol: e.protocol,
    patientName: e.patientName,
    patientCpf: maskCpf(e.patientCpf),
    patientPhone: e.patientPhone,
    status: mapStatus(e.status),
    whatsappSent: e.whatsappSent,
    createdAt: e.createdAt.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
}

export async function resendWhatsapp(
  examId: string
): Promise<{ success: boolean; message: string }> {
  await requirePermissions(["exam.whatsapp.resend"]);

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    select: {
      patientName: true,
      patientPhone: true,
      protocol: true,
    },
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
      data: {
        whatsappError: errorMsg,
        whatsappAttempts: { increment: 1 },
      },
    });

    return { success: false, message: "Falha ao enviar a mensagem pelo WhatsApp." };
  }
}
