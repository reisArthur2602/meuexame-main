import { verifyAuth } from "@/helpers/verify-auth";
import { downloadToBuffer } from "@/lib/ftp";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ exam_id: string; doc_id: string }> }
) {
  try {
    await verifyAuth();
  } catch {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { exam_id, doc_id } = await params;

  const doc = await prisma.examDocument.findUnique({
    where: { id: doc_id, examId: exam_id },
    select: { name: true, path: true },
  });

  if (!doc) {
    return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
  }

  let buffer: Buffer;
  try {
    buffer = await downloadToBuffer(doc.path);
  } catch {
    return NextResponse.json({ error: "Erro ao recuperar o arquivo." }, { status: 500 });
  }

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.name}"`,
      "Content-Length": String(buffer.length),
    },
  });
}
