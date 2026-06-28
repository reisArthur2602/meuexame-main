import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { downloadToBuffer } from "@/lib/ftp";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ doc_id: string }> }
) {
  const { doc_id } = await params;
  const { searchParams } = req.nextUrl;

  const cpf = searchParams.get("cpf");
  const protocol = searchParams.get("protocol");
  const inline = searchParams.get("mode") === "view";

  if (!cpf || !protocol) {
    return NextResponse.json({ error: "Parâmetros inválidos." }, { status: 400 });
  }

  const doc = await prisma.examDocument.findUnique({
    where: { id: doc_id },
    select: {
      name: true,
      path: true,
      exam: {
        select: { patientCpf: true, protocol: true, status: true },
      },
    },
  });

  if (!doc) {
    return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
  }

  const exam = doc.exam;

  if (exam.patientCpf !== cpf || exam.protocol !== protocol.toUpperCase()) {
    return NextResponse.json({ error: "Acesso negado." }, { status: 403 });
  }

  if (exam.status !== "AVAILABLE") {
    return NextResponse.json({ error: "Exame indisponível." }, { status: 403 });
  }

  let buffer: Buffer;
  try {
    buffer = await downloadToBuffer(doc.path);
  } catch {
    return NextResponse.json({ error: "Erro ao recuperar o arquivo." }, { status: 500 });
  }

  const disposition = inline
    ? `inline; filename="${doc.name}"`
    : `attachment; filename="${doc.name}"`;

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": disposition,
      "Content-Length": String(buffer.length),
    },
  });
}
