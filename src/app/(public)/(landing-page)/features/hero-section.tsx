import { ArrowRight, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ExamLookupForm } from './exam-lookup-form';

export const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-surface">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                <div className="animate-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
                <div
                    className="animate-blob absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl"
                    style={{ animationDelay: '5s' }}
                />
                <div
                    className="animate-blob absolute -bottom-10 left-1/3 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"
                    style={{ animationDelay: '10s' }}
                />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface/80 px-3 py-1.5 text-xs font-bold text-brand-800 shadow-sm backdrop-blur-sm">
                        <ShieldCheck className="h-4 w-4" />
                        Acesso seguro aos seus resultados
                    </span>

                    <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950 md:text-6xl">
                        O resultado do seu exame{' '}
                        <span className="bg-linear-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                            em segundos.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
                        Sem cadastro e sem filas. Use o CPF e o protocolo do atendimento para
                        visualizar e baixar seu laudo com segurança, a qualquer hora.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <Link
                            href="#consulta"
                            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-brand"
                        >
                            Acessar meu exame
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="#como-funciona"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface/80 px-6 py-3.5 text-sm font-bold text-ink-muted backdrop-blur-sm transition hover:border-border-strong hover:bg-surface"
                        >
                            Como funciona
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

                <div id="consulta" className="scroll-mt-28">
                    <ExamLookupForm />
                    <p className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-ink-soft">
                        <Lock className="h-3.5 w-3.5 text-brand-600" />
                        Conexão protegida · Seus dados não são compartilhados
                    </p>
                </div>
            </div>

            <div className="relative border-t border-border/70 bg-surface-muted/60 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl justify-center px-5 py-4 lg:px-8">
                    <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-200">
                        Beta
                    </span>
                </div>
            </div>
        </section>
    );
};
