import type { Metadata } from "next";
import Link from "next/link";
import {
  FilePlus2,
  Files,
  UploadCloud,
  Download,
  Users,
  BarChart3,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getCurrentUser } from "@/helpers/get-current-user";

export const metadata: Metadata = {
  title: "Visão geral — MeuExame",
  description: "Acompanhe os principais indicadores do portal.",
};

// ── Dados mock ────────────────────────────────────────────────────────────────

const KPI_CARDS = [
  {
    icon: Files,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    value: "1.284",
    label: "Exames cadastrados",
    badge: "+12%",
    badgeVariant: "positive" as const,
  },
  {
    icon: UploadCloud,
    iconBg: "bg-positive-soft",
    iconColor: "text-positive",
    value: "38",
    label: "Uploads realizados",
    badge: "Hoje",
    badgeVariant: "neutral" as const,
  },
  {
    icon: Download,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-700",
    value: "842",
    label: "Downloads no mês",
    badge: "+8%",
    badgeVariant: "positive" as const,
  },
  {
    icon: Users,
    iconBg: "bg-warning-soft",
    iconColor: "text-warning",
    value: "12",
    label: "Usuários ativos",
    badge: "Equipe",
    badgeVariant: "neutral" as const,
  },
];

const RECENT_EXAMS = [
  {
    patient: "Mariana Oliveira",
    protocol: "EXM-2026-001284",
    date: "Hoje, 20:42",
    status: "disponivel",
  },
  {
    patient: "Carlos Henrique",
    protocol: "EXM-2026-001283",
    date: "Hoje, 20:31",
    status: "disponivel",
  },
  {
    patient: "Luciana Martins",
    protocol: "EXM-2026-001282",
    date: "Hoje, 19:58",
    status: "bloqueado",
  },
  {
    patient: "Rafael Souza",
    protocol: "EXM-2026-001281",
    date: "Hoje, 19:15",
    status: "disponivel",
  },
];

const WEEK_BARS = [
  { day: "SEG", height: "42%", shade: "bg-brand-100", active: false },
  { day: "TER", height: "66%", shade: "bg-brand-200", active: false },
  { day: "QUA", height: "52%", shade: "bg-brand-100", active: false },
  { day: "QUI", height: "78%", shade: "bg-brand-300", active: false },
  { day: "SEX", height: "100%", shade: "bg-brand-700", active: true },
  { day: "SÁB", height: "35%", shade: "bg-brand-100", active: false },
  { day: "DOM", height: "20%", shade: "bg-brand-50", active: false },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "disponivel") {
    return (
      <span className="rounded-full bg-positive-soft px-2.5 py-1 text-xs font-bold text-positive">
        Disponível
      </span>
    );
  }
  if (status === "bloqueado") {
    return (
      <span className="rounded-full bg-warning-soft px-2.5 py-1 text-xs font-bold text-warning">
        Bloqueado
      </span>
    );
  }
  return (
    <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-bold text-ink-soft">
      Pendente
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function OverviewPage() {
  const user = await getCurrentUser();
  const firstName = user?.name.split(" ")[0] ?? "Usuário";

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Acompanhe os principais indicadores do portal."
      />

      <main className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl">

          {/* Boas-vindas + CTA */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-ink-soft">Bem-vindo de volta, {firstName}.</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
                Resumo da operação
              </h2>
            </div>
            <Link
              href="/exams/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-700/20 transition-colors hover:bg-brand-800"
            >
              <FilePlus2 className="h-4 w-4" />
              Novo exame
            </Link>
          </div>

          {/* KPI cards */}
          <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {KPI_CARDS.map(
              ({ icon: Icon, iconBg, iconColor, value, label, badge, badgeVariant }) => (
                <article
                  key={label}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl ${iconBg} ${iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {badgeVariant === "positive" ? (
                      <span className="rounded-full bg-positive-soft px-2 py-1 text-xs font-bold text-positive">
                        {badge}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-ink-soft">
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-3xl font-extrabold text-ink">{value}</p>
                  <p className="mt-1 text-sm text-ink-soft">{label}</p>
                </article>
              )
            )}
          </section>

          {/* Bottom row */}
          <section className="mt-7 grid gap-6 xl:grid-cols-[1.4fr_.6fr]">

            {/* Últimos exames */}
            <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
              <div className="flex items-center justify-between border-b border-border/60 p-5">
                <div>
                  <h3 className="font-extrabold text-ink">
                    Últimos exames enviados
                  </h3>
                  <p className="mt-1 text-xs text-ink-soft">
                    Atividade mais recente do painel
                  </p>
                </div>
                <Link
                  href="/exams"
                  className="text-sm font-bold text-brand-700 transition-colors hover:text-brand-800"
                >
                  Ver todos
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-155 text-left">
                  <thead className="bg-surface-muted text-xs uppercase tracking-wide text-ink-soft">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Paciente</th>
                      <th className="px-5 py-3 font-semibold">Protocolo</th>
                      <th className="px-5 py-3 font-semibold">Data</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-sm">
                    {RECENT_EXAMS.map((exam) => (
                      <tr key={exam.protocol}>
                        <td className="px-5 py-4 font-bold text-ink">
                          {exam.patient}
                        </td>
                        <td className="px-5 py-4 text-ink-soft">
                          {exam.protocol}
                        </td>
                        <td className="px-5 py-4 text-ink-soft">{exam.date}</td>
                        <td className="px-5 py-4">
                          <StatusBadge status={exam.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* Gráfico semanal */}
            <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-ink">Atividade semanal</h3>
                  <p className="mt-1 text-xs text-ink-soft">
                    Uploads dos últimos 7 dias
                  </p>
                </div>
                <BarChart3 className="h-5 w-5 text-ink-soft" />
              </div>

              <div className="mt-8 flex h-48 items-end justify-between gap-2">
                {WEEK_BARS.map(({ day, height, shade, active }) => (
                  <div
                    key={day}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className={`w-full rounded-t-lg ${shade}`}
                      style={{ height }}
                    />
                    <span
                      className={`text-[10px] font-bold ${
                        active ? "text-ink-muted" : "text-ink-soft"
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </article>

          </section>
        </div>
      </main>
    </>
  );
}
