"use server";

import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/helpers/verify-auth";
import { buildRemotePath, uploadBuffer } from "@/lib/ftp";
import prisma from "@/lib/prisma";

export const uploadExamDocument = async (examId: string, formData: FormData) => {
  const { id: userId } = await verifyAuth();

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

  revalidatePath(`/exams/${examId}`);
  return { success: true, message: "Documento enviado com sucesso." };
};
