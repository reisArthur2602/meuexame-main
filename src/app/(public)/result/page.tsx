import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Ban, FileCheck2, TriangleAlert, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { maskPatientName } from "@/helpers/mask-patient-name";
import { formatDateLong, formatDateShort } from "@/helpers/format-date";
import { formatFileSize } from "@/helpers/format-file-size";
import { PdfActions } from "./features/pdf-actions";

export const metadata: Metadata = {
  title: "Resultado do exame",
  description: "Visualize ou baixe o seu resultado de exame.",
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ cpf?: string; protocol?: string }>;
}) {
  const { cpf, protocol } = await searchParams;

  if (!cpf || !protocol) notFound();

  const exam = await prisma.exam.findFirst({
    where: { patientCpf: cpf, protocol: protocol.toUpperCase() },
    select: {
      patientName: true,
      protocol: true,
      status: true,
      availableAt: true,
      createdAt: true,
      documents: {
        select: { id: true, name: true, size: true },
        orderBy: { createdAt: "asc" },
        take: 1,
      },
    },
  });

  if (!exam) notFound();

  if (exam.status !== "AVAILABLE") {
    return (
      <main className="relative mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-rose-200/30 blur-3xl animate-blob" />
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Nova consulta
        </Link>

        <section className="mt-6 animate-fade-up overflow-hidden rounded-4xl border border-border bg-surface shadow-soft">
          <div className="relative overflow-hidden border-b border-border/60 bg-linear-to-r from-rose-50 to-surface p-7 md:p-9">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-rose-200/40 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/20">
                <Ban className="h-7 w-7" />
              </span>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Exame indisponível
                </span>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
                  Resultado não disponível
                </h1>
              </div>
            </div>
          </div>

          <div className="p-7 md:p-9">
            <p className="text-sm leading-6 text-ink-soft">
              Este exame está temporariamente indisponível. Entre em contato com
              a clínica para mais informações.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const doc = exam.documents[0];
  const availableAt = exam.availableAt ?? exam.createdAt;

  return (
    <main className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl animate-blob" />
        <div
          className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl animate-blob"
          style={{ animationDelay: "6s" }}
        />
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Nova consulta
      </Link>

      <section className="mt-6 animate-fade-up overflow-hidden rounded-4xl border border-border bg-surface shadow-soft">
        <div className="relative overflow-hidden border-b border-border/60 bg-linear-to-r from-emerald-50 via-brand-50/40 to-surface p-7 md:p-9">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl animate-float" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-600/30">
                <FileCheck2 className="h-7 w-7" />
              </span>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Exame disponível
                </span>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
                  Resultado localizado
                </h1>
              </div>
            </div>

            <span className="rounded-xl border border-emerald-200 bg-surface/80 px-3 py-2 text-xs font-bold text-emerald-700 backdrop-blur-sm">
              Disponível desde {formatDateShort(availableAt)}
            </span>
          </div>
        </div>

        <div className="grid gap-8 p-7 md:grid-cols-[1fr_280px] md:p-9">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[.14em] text-ink-soft">
              Informações do exame
            </h2>

            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              {[
                { label: "Paciente", value: maskPatientName(exam.patientName) },
                { label: "Protocolo", value: exam.protocol },
                { label: "Data do exame", value: formatDateLong(exam.createdAt) },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-transparent bg-surface-muted p-4 transition hover:border-border"
                >
                  <dt className="text-xs font-semibold text-ink-soft">{label}</dt>
                  <dd className="mt-1 font-bold text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 rounded-2xl border border-warning/30 bg-warning-soft p-4">
              <div className="flex gap-3">
                <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                <p className="text-sm leading-6 text-amber-900">
                  Este documento deve ser interpretado por um profissional de
                  saúde. Em caso de dúvida, entre em contato com a clínica.
                </p>
              </div>
            </div>
          </div>

          {doc ? (
            <PdfActions
              filename={doc.name}
              fileSize={formatFileSize(doc.size)}
              downloadUrl={`/api/public/exams/documents/${doc.id}/download?cpf=${cpf}&protocol=${protocol}`}
            />
          ) : (
            <aside className="flex items-center justify-center rounded-3xl border border-border bg-surface-muted p-5 text-sm text-ink-soft">
              Nenhum arquivo disponível.
            </aside>
          )}
        </div>
      </section>

      <div className="mt-6 flex animate-fade-up flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center" style={{ animationDelay: "120ms" }}>
        <div>
          <p className="font-bold text-ink">Problemas para abrir o documento?</p>
          <p className="mt-1 text-sm text-ink-soft">Nossa equipe pode ajudar você.</p>
        </div>
        <Link
          href="/#faq"
          className="group inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition-colors hover:text-brand-800"
        >
          Central de ajuda
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
