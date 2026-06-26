"use server";

import { requirePermissions } from "@/helpers/permissions";
import { notifyExamAvailable } from "@/lib/evolution";
import { buildRemotePath, deleteFile, uploadBuffer } from "@/lib/ftp";
import prisma from "@/lib/prisma";

export type ExamStatus = "AVAILABLE" | "BLOCKED" | "ARCHIVED";

export type ExamDetail = {
  id: string;
  protocol: string;
  patientName: string;
  patientCpf: string;
  patientPhone: string | null;
  status: ExamStatus;
  whatsappSent: boolean;
  whatsappSentAt: string | null;
  internalNotes: string | null;
  createdAt: string;
  availableAt: string | null;
  blockedAt: string | null;
  createdBy: { name: string };
  updatedBy: { name: string } | null;
};

export type ExamDocumentItem = {
  id: string;
  name: string;
  size: number;
  createdAt: string;
};

function fmt(date: Date): string {
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getExam(id: string): Promise<ExamDetail | null> {
  await requirePermissions(["exam.view"]);

  const exam = await prisma.exam.findUnique({
    where: { id },
    select: {
      id: true,
      protocol: true,
      patientName: true,
      patientCpf: true,
      patientPhone: true,
      status: true,
      whatsappSent: true,
      whatsappSentAt: true,
      internalNotes: true,
      createdAt: true,
      availableAt: true,
      blockedAt: true,
      createdBy: { select: { name: true } },
      updatedBy: { select: { name: true } },
    },
  });

  if (!exam) return null;

  return {
    id: exam.id,
    protocol: exam.protocol,
    patientName: exam.patientName,
    patientCpf: exam.patientCpf,
    patientPhone: exam.patientPhone,
    status: exam.status as ExamStatus,
    whatsappSent: exam.whatsappSent,
    whatsappSentAt: exam.whatsappSentAt ? fmt(exam.whatsappSentAt) : null,
    internalNotes: exam.internalNotes,
    createdAt: fmt(exam.createdAt),
    availableAt: exam.availableAt ? fmt(exam.availableAt) : null,
    blockedAt: exam.blockedAt ? fmt(exam.blockedAt) : null,
    createdBy: exam.createdBy,
    updatedBy: exam.updatedBy,
  };
}

export async function getExamDocuments(examId: string): Promise<ExamDocumentItem[]> {
  await requirePermissions(["exam.document.view"]);

  const docs = await prisma.examDocument.findMany({
    where: { examId },
    select: { id: true, name: true, size: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return docs.map((d) => ({
    id: d.id,
    name: d.name,
    size: d.size,
    createdAt: fmt(d.createdAt),
  }));
}

export async function updateExamStatus(
  examId: string,
  status: ExamStatus
): Promise<{ success: boolean; message: string }> {
  const { userId } = await requirePermissions(["exam.update"]);

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

  const messages: Record<ExamStatus, string> = {
    AVAILABLE: "Exame disponibilizado com sucesso.",
    BLOCKED: "Exame bloqueado com sucesso.",
    ARCHIVED: "Exame arquivado com sucesso.",
  };

  return { success: true, message: messages[status] };
}

export async function uploadExamDocument(
  examId: string,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const { userId } = await requirePermissions(["exam.document.upload"]);

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Arquivo inválido." };
  }

  let filePath: string;
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const remotePath = buildRemotePath();
    await uploadBuffer(buffer, remotePath);
    filePath = remotePath;
  } catch {
    return { success: false, message: "Erro ao enviar o arquivo. Verifique a conexão FTP." };
  }

  await prisma.examDocument.create({
    data: {
      examId,
      name: file.name || "resultado.pdf",
      path: filePath,
      size: file.size,
    },
  });

  await prisma.exam.update({
    where: { id: examId },
    data: { updatedById: userId },
  });

  return { success: true, message: "Documento enviado com sucesso." };
}

export async function deleteExamDocument(
  docId: string
): Promise<{ success: boolean; message: string }> {
  await requirePermissions(["exam.document.delete"]);

  const doc = await prisma.examDocument.findUnique({
    where: { id: docId },
    select: { path: true },
  });

  if (!doc) return { success: false, message: "Documento não encontrado." };

  try {
    await deleteFile(doc.path);
  } catch {
    // arquivo pode não existir no FTP
  }

  await prisma.examDocument.delete({ where: { id: docId } });

  return { success: true, message: "Documento removido." };
}

export async function resendExamWhatsapp(
  examId: string
): Promise<{ success: boolean; message: string }> {
  await requirePermissions(["exam.whatsapp.resend"]);

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
      data: {
        whatsappError: errorMsg,
        whatsappAttempts: { increment: 1 },
      },
    });

    return { success: false, message: "Falha ao enviar a mensagem pelo WhatsApp." };
  }
}
