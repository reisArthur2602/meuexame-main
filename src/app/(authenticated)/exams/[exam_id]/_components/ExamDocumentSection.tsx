"use client";

import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UploadCloud, Trash2 } from "lucide-react";
import { DocumentCard } from "@/components/exam/DocumentCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { uploadExamDocument, deleteExamDocument, getExamDocuments } from "../actions";

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

export function ExamDocumentSection({ examId }: { examId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: documents = [], isPending } = useQuery({
    queryKey: ["exam-documents", examId],
    queryFn: () => getExamDocuments(examId),
  });

  const uploadMutation = useMutation({
    mutationFn: (fd: FormData) => uploadExamDocument(examId, fd),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["exam-documents", examId] });
      } else {
        toast.error(data.message);
      }
    },
    onError() {
      toast.error("Erro inesperado. Tente novamente.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (docId: string) => deleteExamDocument(docId),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["exam-documents", examId] });
      } else {
        toast.error(data.message);
      }
    },
    onError() {
      toast.error("Erro inesperado. Tente novamente.");
    },
  });

  const isMutating = uploadMutation.isPending || deleteMutation.isPending;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Somente arquivos PDF são aceitos.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("O arquivo não pode ultrapassar 20 MB.");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    uploadMutation.mutate(fd);
  }

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {isMutating && (
        <div className="space-y-3">
          {Array.from({ length: 1 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!isMutating && documents.map((doc) => (
        <div key={doc.id} className="flex items-center gap-2">
          <div className="flex-1">
            <DocumentCard
              filename={doc.name}
              size={formatBytes(doc.size)}
              mimeType="PDF"
              onDownload={() =>
                window.open(
                  `/api/exams/${examId}/documents/${doc.id}/download`,
                  "_blank"
                )
              }
            />
          </div>
          <button
            onClick={() => deleteMutation.mutate(doc.id)}
            disabled={isMutating}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-ink-soft transition-colors hover:text-negative disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Remover documento"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isMutating}
        className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-border bg-surface-muted p-4 text-sm font-semibold text-ink-muted transition-colors hover:border-brand-300 hover:bg-brand-50/30 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <UploadCloud className="h-4 w-4 text-brand-700" />
        Adicionar documento
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
