"use client";

import { useMutation } from "@tanstack/react-query";
import { Archive, Ban, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { ExamStatus } from "@/types";
import { updateExamStatus } from "../actions/update-exam-status";

type ExamStatusActionsProps = {
  examId: string;
  currentStatus: ExamStatus;
};

export const ExamStatusActions = ({ examId, currentStatus }: ExamStatusActionsProps) => {
  const mutation = useMutation({
    mutationFn: (status: ExamStatus) => updateExamStatus(examId, status),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError() {
      toast.error("Erro inesperado. Tente novamente.");
    },
  });

  if (mutation.isPending) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-10 w-full animate-pulse rounded-xl bg-surface-muted" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {currentStatus !== "AVAILABLE" && (
        <Button
          variant="secondary"
          className="w-full justify-start gap-2"
          onClick={() => mutation.mutate("AVAILABLE")}
        >
          <CheckCircle className="h-4 w-4 text-positive" />
          Disponibilizar
        </Button>
      )}
      {currentStatus !== "BLOCKED" && (
        <Button
          variant="secondary"
          className="w-full justify-start gap-2"
          onClick={() => mutation.mutate("BLOCKED")}
        >
          <Ban className="h-4 w-4 text-warning" />
          Bloquear
        </Button>
      )}
      {currentStatus !== "ARCHIVED" && (
        <Button
          variant="secondary"
          className="w-full justify-start gap-2"
          onClick={() => mutation.mutate("ARCHIVED")}
        >
          <Archive className="h-4 w-4 text-ink-soft" />
          Arquivar
        </Button>
      )}
    </div>
  );
};
