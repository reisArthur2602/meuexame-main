import { Reveal } from '@/components/ui/reveal';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const CtaSection = () => {
    return (
        <section className="px-5 pb-16 sm:pb-20 lg:px-8">
            <Reveal>
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-brand-700 to-brand-900 px-6 py-12 text-center shadow-brand sm:rounded-[2.5rem] sm:py-14 md:py-16">
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                        <div className="animate-blob absolute -left-10 -top-10 h-64 w-64 rounded-full bg-brand-300/30 blur-3xl" />
                        <div
                            className="animate-blob absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl"
                            style={{ animationDelay: '6s' }}
                        />
                    </div>
                    <div className="relative">
                        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                            Seu laudo está a um passo de você.
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl leading-7 text-brand-50/90">
                            Tenha o CPF e o protocolo em mãos e acesse seu resultado agora mesmo.
                        </p>
                        <Link
                            href="#consulta"
                            className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-brand-800 shadow-xl transition hover:-translate-y-0.5"
                        >
                            Acessar meu exame
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};
