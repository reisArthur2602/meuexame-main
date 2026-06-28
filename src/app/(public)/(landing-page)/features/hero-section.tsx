import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { ExamLookupForm } from './exam-lookup-form';

export const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-surface">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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

            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:px-8 lg:py-24">
                <div>
                    <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-6xl text-center lg:text-start">
                        O resultado do seu exame{' '}
                        <span className="bg-linear-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent">
                            em segundos.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-ink-muted sm:mt-6 sm:text-lg sm:leading-8">
                        Sem cadastro e sem filas. Use o CPF e o protocolo do atendimento para
                        visualizar e baixar seu laudo com segurança, a qualquer hora.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
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

                    <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ink-soft sm:mt-10 sm:gap-x-8">
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

                <ExamLookupForm />
            </div>
        </section>
    );
};
