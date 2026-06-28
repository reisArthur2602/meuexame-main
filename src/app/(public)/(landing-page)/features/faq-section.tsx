import { Reveal } from '@/components/ui/reveal';
import { ChevronDown } from 'lucide-react';

const FAQS = [
    {
        q: 'Onde encontro o protocolo do meu exame?',
        a: 'O protocolo é entregue no momento do atendimento, no comprovante ou recibo da clínica. Ele costuma vir com letras e números (ex.: EXM-2026-001234).',
    },
    {
        q: 'Meu resultado ainda não apareceu. O que fazer?',
        a: 'O laudo fica disponível assim que liberado pela equipe responsável. Se ainda não aparece, aguarde o prazo informado no atendimento ou entre em contato com a clínica.',
    },
    {
        q: 'Preciso pagar ou fazer cadastro para acessar?',
        a: 'Não. A consulta é gratuita e não exige cadastro. Basta informar o CPF do paciente e o protocolo do exame.',
    },
    {
        q: 'É seguro informar meu CPF aqui?',
        a: 'Sim. Seus dados são usados apenas para localizar o documento, não ficam visíveis publicamente e o acesso depende da combinação correta de CPF e protocolo.',
    },
    {
        q: 'Posso baixar e compartilhar o laudo com meu médico?',
        a: 'Pode. Você visualiza o PDF no navegador ou salva uma cópia no seu dispositivo para enviar a quem precisar.',
    },
];

export const FaqSection = () => {
    return (
        <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 lg:px-8">
            <Reveal className="text-center">
                <p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">
                    Dúvidas frequentes
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                    Tudo o que você precisa saber
                </h2>
                <p className="mt-4 text-ink-soft">
                    Não encontrou sua resposta? Fale com a clínica pelos canais de atendimento.
                </p>
            </Reveal>

            <div className="mt-10 space-y-3">
                {FAQS.map(({ q, a }, i) => (
                    <Reveal key={q} delay={i * 80}>
                        <details className="group rounded-2xl border border-border bg-surface p-5 shadow-card transition hover:border-border-strong open:border-brand-200 open:shadow-soft">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
                                {q}
                                <ChevronDown className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-300 group-open:rotate-180 group-open:text-brand-700" />
                            </summary>
                            <p className="mt-3 text-sm leading-6 text-ink-soft">{a}</p>
                        </details>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};
