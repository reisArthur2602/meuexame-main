"use server";

import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/helpers/verify-auth";
import { notifyExamAvailable } from "@/lib/evolution";
import { buildRemotePath, uploadBuffer } from "@/lib/ftp";
import prisma from "@/lib/prisma";
import { createExamSchema } from "@/schemas/exam";

export const createExam = async (formData: FormData) => {
  const { id: userId } = await verifyAuth();

  const parsed = createExamSchema.safeParse({
    patientName: formData.get("patientName"),
    patientCpf: formData.get("patientCpf"),
    patientPhone: formData.get("patientPhone") || undefined,
    protocol: formData.get("protocol"),
    publishNow: formData.get("publishNow") === "true",
  });

  if (!parsed.success) {
    return { success: false, message: "Verifique os campos e tente novamente." };
  }

  const { patientName, patientCpf, patientPhone, protocol, publishNow } = parsed.data;

  let filePath: string | null = null;
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const remotePath = buildRemotePath();
      await uploadBuffer(buffer, remotePath);
      filePath = remotePath;
    } catch {
      return { success: false, message: "Erro ao enviar o arquivo. Verifique a conexão FTP." };
    }
  }

  let exam: { id: string };
  try {
    exam = await prisma.exam.create({
      data: {
        patientName,
        patientCpf: patientCpf.replace(/\D/g, ""),
        patientPhone: patientPhone ? patientPhone.replace(/\D/g, "") : null,
        protocol: protocol.toUpperCase(),
        status: publishNow ? "AVAILABLE" : "BLOCKED",
        availableAt: publishNow ? new Date() : null,
        createdById: userId,
      },
    });
  } catch (e: unknown) {
    if ((e as { code?: string })?.code === "P2002") {
      return { success: false, message: "Já existe um exame com este CPF e protocolo." };
    }
    throw new Error("Erro ao salvar o exame.");
  }

  if (filePath && file instanceof File) {
    await prisma.examDocument.create({
      data: {
        examId: exam.id,
        name: file.name || "resultado.pdf",
        path: filePath,
        size: (file as File).size,
      },
    });
  }

  let whatsappMessage = "";
  if (patientPhone && publishNow) {
    try {
      await notifyExamAvailable(patientPhone, patientName, protocol.toUpperCase());
      await prisma.exam.update({
        where: { id: exam.id },
        data: { whatsappSent: true, whatsappSentAt: new Date(), whatsappAttempts: { increment: 1 } },
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
      await prisma.exam.update({
        where: { id: exam.id },
        data: { whatsappError: errorMsg, whatsappAttempts: { increment: 1 } },
      });
      whatsappMessage = " O envio da mensagem pelo WhatsApp falhou.";
    }
  }

  revalidatePath("/exams");
  return { success: true, message: `Exame cadastrado com sucesso!${whatsappMessage}` };
};
