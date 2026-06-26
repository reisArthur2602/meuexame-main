"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, Hash, ArrowRight, LockKeyhole } from "lucide-react";

export function ExamLookupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: validar CPF + protocolo via API e redirecionar para o resultado
    await new Promise((r) => setTimeout(r, 900));
    router.push("/result");
  }

  return (
    <div className="rounded-[2rem] border border-white bg-surface p-6 shadow-soft md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-700">
            Consulta online
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
            Localize seu exame
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Preencha os dados exatamente como informados no atendimento.
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <Hash className="h-6 w-6" />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        {/* CPF */}
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-ink">
            CPF do paciente
          </span>
          <div className="relative">
            <UserRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
            <input
              name="cpf"
              required
              placeholder="000.000.000-00"
              className="h-13 w-full rounded-2xl border border-border bg-surface-muted py-3.5 pl-12 pr-4 text-sm font-medium text-ink outline-none transition placeholder:text-ink-soft focus:border-brand-500 focus:bg-surface focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </label>

        {/* Protocolo */}
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-ink">
            Protocolo do exame
          </span>
          <div className="relative">
            <Hash className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
            <input
              name="protocol"
              required
              placeholder="Ex.: EXM-2026-001234"
              className="h-13 w-full rounded-2xl border border-border bg-surface-muted py-3.5 pl-12 pr-4 text-sm font-medium uppercase text-ink outline-none transition placeholder:text-ink-soft placeholder:normal-case focus:border-brand-500 focus:bg-surface focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white transition hover:bg-brand-800 disabled:cursor-wait disabled:opacity-70"
        >
          {loading ? "Consultando..." : "Consultar exame"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-surface-muted p-3 text-xs leading-5 text-ink-soft">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
        Seus dados são usados somente para localizar o documento e não ficam
        visíveis publicamente.
      </p>
    </div>
  );
}
