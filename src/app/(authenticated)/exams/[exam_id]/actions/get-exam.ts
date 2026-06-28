"use server";

import { cache } from "react";
import { verifyAuth } from "@/helpers/verify-auth";
import { formatDateTime } from "@/helpers/format-date";
import prisma from "@/lib/prisma";
import type { ExamStatus } from "@/types";

export const getExam = cache(async (id: string) => {
  await verifyAuth();

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
      availableAt: true,
      blockedAt: true,
      createdAt: true,
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
    whatsappSentAt: exam.whatsappSentAt ? formatDateTime(exam.whatsappSentAt) : null,
    availableAt: exam.availableAt ? formatDateTime(exam.availableAt) : null,
    blockedAt: exam.blockedAt ? formatDateTime(exam.blockedAt) : null,
    createdAt: formatDateTime(exam.createdAt),
    createdBy: exam.createdBy,
    updatedBy: exam.updatedBy,
  };
});
