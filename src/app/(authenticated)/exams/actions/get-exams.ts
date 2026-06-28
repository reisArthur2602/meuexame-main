"use server";

import { cache } from "react";
import { verifyAuth } from "@/helpers/verify-auth";
import { maskCpfPrivacy } from "@/helpers/mask-cpf";
import { mapExamStatus } from "@/helpers/map-exam-status";
import { formatDateTime } from "@/helpers/format-date";
import prisma from "@/lib/prisma";

export const getExams = cache(async () => {
  await verifyAuth();

  const exams = await prisma.exam.findMany({
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
    patientCpf: maskCpfPrivacy(e.patientCpf),
    patientPhone: e.patientPhone,
    status: mapExamStatus(e.status),
    whatsappSent: e.whatsappSent,
    createdAt: formatDateTime(e.createdAt),
  }));
});
