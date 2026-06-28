"use server";

import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/helpers/verify-auth";
import { deleteFile } from "@/lib/ftp";
import prisma from "@/lib/prisma";

export const deleteExamDocument = async (docId: string, examId: string) => {
  await verifyAuth();

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

  revalidatePath(`/exams/${examId}`);
  return { success: true, message: "Documento removido." };
};
