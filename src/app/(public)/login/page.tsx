import { redirect } from "next/navigation";
import Link from "next/link";
import { HeartPulse, ArrowLeft, Sparkles } from "lucide-react";
import { LoginForm } from "./_components/LoginForm";
import { getSession } from "@/helpers/get-session";

export const metadata = {
  title: "Acesso da equipe — MeuExame",
  description: "Área restrita ao time clínico.",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/overview");
  return (
    <main className="grid min-h-screen lg:grid-cols-2">

      {/* ── Painel esquerdo (dark) ──────────────────────────────── */}
      <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 10% 0%, rgba(45,212,191,.22), transparent 34%), radial-gradient(circle at 90% 100%, rgba(59,130,246,.16), transparent 36%)",
          }}
        />

        <div className="relative">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-extrabold tracking-tight">
                MeuExame
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-slate-300">
                Centro Clínico
              </span>
            </span>
          </Link>
        </div>

        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-brand-300">
            <Sparkles className="h-4 w-4" />
            Gestão simples de resultados
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-[-.04em]">
            Organize e disponibilize exames em poucos minutos.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Painel centralizado para uploads, consultas, usuários e rastreabilidade das operações.
          </p>
        </div>

        <p className="relative text-xs text-slate-500">© 2026 MeuExame</p>
      </section>

      {/* ── Painel direito (formulário) ─────────────────────────── */}
      <section className="flex items-center justify-center bg-surface px-5 py-12">
        <div className="w-full max-w-md">

          {/* Logo mobile */}
          <div className="mb-10 lg:hidden">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
                <HeartPulse className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-base font-extrabold tracking-tight text-ink">
                  MeuExame
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-ink-soft">
                  Centro Clínico
                </span>
              </span>
            </Link>
          </div>

          <p className="text-sm font-bold uppercase tracking-[.16em] text-brand-700">
            Área restrita
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">
            Acesse o painel
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Informe suas credenciais para continuar.
          </p>

          <LoginForm />

          <Link
            href="/"
            className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-ink-soft transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o portal do paciente
          </Link>
        </div>
      </section>

    </main>
  );
}
