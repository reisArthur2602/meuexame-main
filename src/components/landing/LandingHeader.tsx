"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartPulse, Menu, X } from "lucide-react";

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#como-funciona"
            className="text-sm font-semibold text-ink-muted transition-colors hover:text-brand-700"
          >
            Como funciona
          </Link>
          <Link
            href="/help"
            className="text-sm font-semibold text-ink-muted transition-colors hover:text-brand-700"
          >
            Ajuda
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-semibold text-ink-muted transition-colors hover:text-brand-700"
          >
            Privacidade
          </Link>
          <Link
            href="/#consulta"
            className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-700/20 transition-colors hover:bg-brand-800"
          >
            Acessar exame
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-border text-ink-muted md:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border/60 bg-surface px-5 py-4 md:hidden">
          <div className="grid gap-1">
            <Link
              href="/#como-funciona"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-muted hover:bg-surface-muted"
            >
              Como funciona
            </Link>
            <Link
              href="/help"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-muted hover:bg-surface-muted"
            >
              Ajuda
            </Link>
            <Link
              href="/privacy"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-muted hover:bg-surface-muted"
            >
              Privacidade
            </Link>
            <Link
              href="/#consulta"
              onClick={() => setMobileOpen(false)}
              className="mt-1 rounded-xl bg-brand-700 px-3 py-2.5 text-center text-sm font-bold text-white"
            >
              Acessar exame
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
