import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileCheck2, TriangleAlert, ArrowRight } from "lucide-react";
import { PdfActions } from "./_components/PdfActions";

export const metadata: Metadata = {
  title: "Resultado do exame — MeuExame",
  description: "Visualize ou baixe o seu resultado de exame.",
};

// TODO: receber cpf + protocolo via searchParams e buscar via API
const MOCK_RESULT = {
  patientName: "Anderson C*****",
  protocol: "EXM-2026-001234",
  examType: "Resultado laboratorial",
  examDate: "23 de junho de 2026",
  availableSince: "24/06/2026",
  filename: "resultado-exame.pdf",
  fileSize: "2,4 MB",
};

export default function ResultPage() {
  const r = MOCK_RESULT;

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
      {/* Voltar */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Nova consulta
      </Link>

      {/* Card principal */}
      <section className="mt-6 overflow-hidden rounded-4xl border border-border bg-surface shadow-soft">

        {/* Header do card — faixa verde */}
        <div className="border-b border-border/60 bg-gradient-to-r from-emerald-50 to-surface p-7 md:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                <FileCheck2 className="h-7 w-7" />
              </span>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Exame disponível
                </span>
                <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
                  Resultado localizado
                </h1>
              </div>
            </div>

            <span className="rounded-xl border border-emerald-200 bg-surface px-3 py-2 text-xs font-bold text-emerald-700">
              Disponível desde {r.availableSince}
            </span>
          </div>
        </div>

        {/* Corpo — 2 colunas */}
        <div className="grid gap-8 p-7 md:grid-cols-[1fr_280px] md:p-9">

          {/* Esquerda: dados + aviso */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[.14em] text-ink-soft">
              Informações do exame
            </h2>

            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              {[
                { label: "Paciente", value: r.patientName },
                { label: "Protocolo", value: r.protocol },
                { label: "Tipo de exame", value: r.examType },
                { label: "Data do exame", value: r.examDate },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl bg-surface-muted p-4"
                >
                  <dt className="text-xs font-semibold text-ink-soft">
                    {label}
                  </dt>
                  <dd className="mt-1 font-bold text-ink">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Aviso médico */}
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

          {/* Direita: ações do PDF */}
          <PdfActions filename={r.filename} fileSize={r.fileSize} />
        </div>
      </section>

      {/* Banner de ajuda */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-bold text-ink">
            Problemas para abrir o documento?
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Nossa equipe pode ajudar você.
          </p>
        </div>
        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition-colors hover:text-brand-800"
        >
          Central de ajuda
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
