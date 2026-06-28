import { Reveal } from '@/components/ui/reveal';
import { ArrowRight, ClipboardPenLine, FileDown, SearchCheck } from 'lucide-react';
import Link from 'next/link';

const STEPS = [
    {
        Icon: ClipboardPenLine,
        step: '01',
        title: 'Informe seus dados',
        description: 'Digite o CPF do paciente e o protocolo entregue pela clínica no atendimento.',
    },
    {
        Icon: SearchCheck,
        step: '02',
        title: 'Localize o exame',
        description: 'O sistema verifica com segurança se o resultado já está disponível.',
    },
    {
        Icon: FileDown,
        step: '03',
        title: 'Visualize ou baixe',
        description: 'Abra o PDF no navegador ou salve uma cópia para enviar ao seu médico.',
    },
];

export const HowItWorks = () => {
    return (
        <section
            id="como-funciona"
            className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 lg:px-8"
        >
            <Reveal className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">
                    Como funciona
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                    Seu resultado em três passos
                </h2>
                <p className="mt-4 text-ink-soft">
                    Um processo rápido, direto e pensado para funcionar bem no celular.
                </p>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
                {STEPS.map(({ Icon, step, title, description }, i) => (
                    <Reveal key={step} delay={i * 120}>
                        <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-soft">
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                            <span className="absolute right-6 top-6 text-5xl font-extrabold text-brand-50">
                                {step}
                            </span>
                            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-brand-50 to-brand-100 text-brand-700 transition-transform duration-300 group-hover:scale-110">
                                <Icon className="h-6 w-6" />
                            </span>
                            <span className="mt-6 block text-xs font-bold text-brand-700">
                                PASSO {step}
                            </span>
                            <h3 className="mt-2 text-lg font-extrabold text-ink">{title}</h3>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">{description}</p>
                        </article>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={120} className="mt-12 flex justify-center">
                <Link
                    href="#consulta"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-brand"
                >
                    Consultar meu exame agora
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </Reveal>
        </section>
    );
};
