import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ClipboardPenLine,
  SearchCheck,
  FileDown,
  Lock,
  EyeOff,
} from "lucide-react";
import { ExamLookupForm } from "./_components/ExamLookupForm";

export const metadata: Metadata = {
  title: "Acesse seus exames — MeuExame",
  description:
    "Consulte, visualize e baixe seus resultados online usando apenas o CPF e o protocolo recebido no atendimento.",
};

export default function LandingPage() {
  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface">
        {/* Glow blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(20,184,166,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          {/* Left copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface px-3 py-1.5 text-xs font-bold text-brand-800 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Acesso seguro aos seus resultados
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950 md:text-6xl">
              Seus exames, disponíveis de forma{" "}
              <span className="text-brand-700">simples e segura.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
              Consulte, visualize e baixe seus resultados online usando apenas o
              CPF e o protocolo recebido no atendimento.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#consulta"
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-800"
              >
                Acessar meu exame
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface px-6 py-3.5 text-sm font-bold text-ink-muted transition hover:border-border-strong"
              >
                Preciso de ajuda
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-ink-soft">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                Sem cadastro
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                Disponível 24 horas
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                Documento protegido
              </span>
            </div>
          </div>

          {/* Right — lookup card */}
          <div id="consulta" className="relative scroll-mt-28">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-200/30 blur-3xl" />
            <ExamLookupForm />
          </div>
        </div>
      </section>

      {/* ── Como funciona ─────────────────────────────────────── */}
      <section
        id="como-funciona"
        className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">
            Como funciona
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Seu resultado em três passos
          </h2>
          <p className="mt-4 text-ink-soft">
            Um processo rápido, direto e pensado para funcionar bem no celular.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              Icon: ClipboardPenLine,
              step: "PASSO 01",
              title: "Informe seus dados",
              description:
                "Digite o CPF do paciente e o protocolo entregue pela clínica.",
            },
            {
              Icon: SearchCheck,
              step: "PASSO 02",
              title: "Localize o exame",
              description:
                "O sistema verifica com segurança se o resultado já está disponível.",
            },
            {
              Icon: FileDown,
              step: "PASSO 03",
              title: "Visualize ou baixe",
              description:
                "Abra o PDF no navegador ou salve uma cópia no seu dispositivo.",
            },
          ].map(({ Icon, step, title, description }) => (
            <article
              key={step}
              className="rounded-3xl border border-border bg-surface p-7 shadow-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon className="h-6 w-6" />
              </span>
              <span className="mt-6 block text-xs font-bold text-brand-700">
                {step}
              </span>
              <h3 className="mt-2 text-lg font-extrabold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Segurança ─────────────────────────────────────────── */}
      <section className="bg-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-300">
              PRIVACIDADE EM PRIMEIRO LUGAR
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
              Seus dados e documentos protegidos.
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">
              O acesso depende da combinação correta de CPF e protocolo. Os
              arquivos não são publicados em links abertos e todas as consultas
              são protegidas.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Lock className="h-6 w-6 text-brand-300" />
              <p className="mt-4 font-bold text-white">Conexão segura</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Proteção durante a consulta e o download.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <EyeOff className="h-6 w-6 text-brand-300" />
              <p className="mt-4 font-bold text-white">Acesso restrito</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Somente quem possui os dados corretos acessa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
