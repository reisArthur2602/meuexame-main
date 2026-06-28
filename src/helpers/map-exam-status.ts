import type { ExamListItem } from "@/types";

export const mapExamStatus = (s: string): ExamListItem["status"] => {
  if (s === "AVAILABLE") return "disponivel";
  if (s === "BLOCKED") return "bloqueado";
  return "arquivado";
};
