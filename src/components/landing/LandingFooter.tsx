import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
        {/* Brand */}
        <div>
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
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-soft">
            Acesso simples e seguro aos seus resultados de exames, disponível a
            qualquer hora.
          </p>
        </div>

        {/* Atendimento */}
        <div>
          <p className="text-sm font-bold text-ink">Atendimento</p>
          <div className="mt-4 space-y-2 text-sm text-ink-soft">
            <p>Segunda a sexta, 7h às 18h</p>
            <p>(21) 99999-9999</p>
            <p>atendimento@clinica.com.br</p>
          </div>
        </div>

        {/* Links */}
        <div>
          <p className="text-sm font-bold text-ink">Links úteis</p>
          <div className="mt-4 grid gap-2 text-sm">
            <Link
              href="/help"
              className="text-ink-soft transition-colors hover:text-brand-700"
            >
              Central de ajuda
            </Link>
            <Link
              href="/privacy"
              className="text-ink-soft transition-colors hover:text-brand-700"
            >
              Política de privacidade
            </Link>
            <Link
              href="/login"
              className="text-ink-soft/60 transition-colors hover:text-brand-700"
            >
              Acesso da equipe
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 px-5 py-5 text-center text-xs text-ink-soft/60">
        © 2026 MeuExame. Todos os direitos reservados.
      </div>
    </footer>
  );
}
