import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, FileText, Hash, Phone, User } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExamStatusBadge } from "@/components/exam/ExamStatusBadge";
import { InternalNoteCard } from "@/components/exam/InternalNoteCard";
import { ExamStatusActions } from "./_components/ExamStatusActions";
import { ExamDocumentSection } from "./_components/ExamDocumentSection";
import { getExam } from "./actions";

export const metadata: Metadata = {
  title: "Detalhes do exame — MeuExame",
};

const statusDisplayMap = {
  AVAILABLE: "disponivel",
  BLOCKED: "bloqueado",
  ARCHIVED: "arquivado",
} as const;


export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ exam_id: string }>;
}) {
  const { exam_id } = await params;
  const exam = await getExam(exam_id);
  if (!exam) notFound();

  const displayStatus = statusDisplayMap[exam.status];

  return (
    <>
      <PageHeader
        title={exam.patientName}
        subtitle={exam.protocol}
        actions={<ExamStatusBadge status={displayStatus} />}
      />

      <main className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">

          {/* Back link */}
          <Link
            href="/exams"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para exames
          </Link>

          {/* Main grid: patient info | status actions */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">

            {/* ── Left column ──────────────────────────────────── */}
            <div className="space-y-6">

              {/* Patient info card */}
              <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                <h2 className="font-extrabold text-ink">Dados do paciente</h2>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-subtle text-ink-soft">
                      <Hash className="h-4 w-4" />
                    </span>
                    <div>
                      <dt className="text-xs text-ink-soft">Protocolo</dt>
                      <dd className="mt-0.5 font-bold text-ink">{exam.protocol}</dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-subtle text-ink-soft">
                      <User className="h-4 w-4" />
                    </span>
                    <div>
                      <dt className="text-xs text-ink-soft">CPF</dt>
                      <dd className="mt-0.5 font-bold text-ink">{exam.patientCpf}</dd>
                    </div>
                  </div>

                  {exam.patientPhone && (
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-subtle text-ink-soft">
                        <Phone className="h-4 w-4" />
                      </span>
                      <div>
                        <dt className="text-xs text-ink-soft">Telefone</dt>
                        <dd className="mt-0.5 font-bold text-ink">{exam.patientPhone}</dd>
                      </div>
                    </div>
                  )}
                </dl>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-5 text-xs text-ink-soft">
                  <span>Cadastrado por <span className="font-semibold text-ink-muted">{exam.createdBy.name}</span></span>
                  <span>{exam.createdAt}</span>
                </div>
              </article>
            </div>

            {/* ── Right column ─────────────────────────────────── */}
            <div className="space-y-6">

              {/* Status actions */}
              <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                <h2 className="font-extrabold text-ink">Gerenciar status</h2>
                <p className="mt-1 text-xs text-ink-soft">Altere a visibilidade deste exame.</p>
                <div className="mt-4">
                  <ExamStatusActions examId={exam.id} currentStatus={exam.status} />
                </div>
              </article>
            </div>
          </div>

          {/* Full-width: documents */}
          <article className="mt-6 rounded-2xl border border-border bg-surface p-6 shadow-card">
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-extrabold text-ink">Arquivos do exame</h2>
                <p className="text-xs text-ink-soft">Resultados em PDF</p>
              </div>
            </div>
            <div className="mt-5">
              <ExamDocumentSection examId={exam.id} />
            </div>
          </article>

          {/* Full-width: internal notes */}
          {exam.internalNotes && (
            <div className="mt-6">
              <InternalNoteCard
                note={exam.internalNotes}
                author={exam.createdBy.name}
                timestamp={exam.createdAt}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
