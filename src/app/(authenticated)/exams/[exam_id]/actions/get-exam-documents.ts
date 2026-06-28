"use server";

import { cache } from "react";
import { verifyAuth } from "@/helpers/verify-auth";
import { formatDateTime } from "@/helpers/format-date";
import prisma from "@/lib/prisma";

export const getExamDocuments = cache(async (examId: string) => {
  await verifyAuth();

  const docs = await prisma.examDocument.findMany({
    where: { examId },
    select: { id: true, name: true, size: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return docs.map((d) => ({
    id: d.id,
    name: d.name,
    size: d.size,
    createdAt: formatDateTime(d.createdAt),
  }));
});
