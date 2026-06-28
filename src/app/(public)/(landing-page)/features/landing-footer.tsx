import { AppLogo } from '@/components/ui/app-logo';
import Link from 'next/link';

export const LandingFooter = () => (
    <footer className="border-t border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3 lg:px-8">
            <div>
                <Link href="/">
                    <AppLogo />
                </Link>
                <p className="mt-4 max-w-sm text-sm leading-6 text-ink-soft">
                    Acesso simples e seguro aos seus resultados de exames, disponível a qualquer
                    hora.
                </p>
            </div>

            <div>
                <p className="text-sm font-bold text-ink">Atendimento</p>
                <div className="mt-4 space-y-2 text-sm text-ink-soft">
                    <p>Segunda a sexta, 7h às 18h</p>
                    <p>(21) 99999-9999</p>
                    <p>atendimento@clinica.com.br</p>
                </div>
            </div>

            <div>
                <p className="text-sm font-bold text-ink">Links úteis</p>
                <div className="mt-4 grid gap-2 text-sm">
                    <Link href="/#faq" className="text-ink-soft transition-colors hover:text-brand-700">
                        Central de ajuda
                    </Link>
                    <Link href="/" className="text-ink-soft transition-colors hover:text-brand-700">
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
            © 2026 MeuLaudo. Todos os direitos reservados.
        </div>
    </footer>
);
