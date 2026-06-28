'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, FileText, HeartPulse, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const STEPS = [
    {
        icon: HeartPulse,
        iconBg: 'bg-brand-700',
        iconColor: 'text-white',
        title: 'Bem-vindo ao MeuLaudo!',
        description:
            'Sua plataforma centralizada para gestão e entrega de laudos clínicos. Veja o que você pode fazer aqui.',
    },
    {
        icon: FileText,
        iconBg: 'bg-rose-50',
        iconColor: 'text-rose-600',
        title: 'Gerencie exames facilmente',
        description:
            'Cadastre exames, faça upload dos arquivos PDF e disponibilize os resultados para os pacientes com apenas alguns cliques.',
    },
    {
        icon: Users,
        iconBg: 'bg-violet-50',
        iconColor: 'text-violet-600',
        title: 'Controle sua equipe',
        description:
            'Adicione membros da equipe, defina perfis de acesso e mantenha o controle de quem pode visualizar e gerenciar os exames.',
    },
    {
        icon: CheckCircle2,
        iconBg: 'bg-positive-soft',
        iconColor: 'text-positive',
        title: 'Tudo pronto!',
        description:
            'Você já pode começar a usar o MeuLaudo. Qualquer dúvida, fale com o administrador do sistema.',
    },
] as const;

const clearFirstLoginCookie = () => {
    document.cookie = 'first_login=; path=/; max-age=0';
};

export const OnboardingModal = () => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(0);

    useEffect(() => {
        const hasFirstLogin = document.cookie
            .split(';')
            .some((c) => c.trim().startsWith('first_login=1'));
        if (hasFirstLogin) {
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        clearFirstLoginCookie();
        setOpen(false);
    };

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setStep((s) => s + 1);
        } else {
            handleClose();
        }
    };

    if (!open) return null;

    const current = STEPS[step];
    const Icon = current.icon;
    const isLast = step === STEPS.length - 1;

    return (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-ink/50 p-5 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-soft">
                {/* Close */}
                <div className="flex justify-end">
                    <button
                        onClick={handleClose}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-surface-subtle text-ink-soft transition-colors hover:text-ink"
                        aria-label="Fechar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Icon */}
                <div className="mt-2 flex justify-center">
                    <span
                        className={`grid h-16 w-16 place-items-center rounded-2xl ${current.iconBg} ${current.iconColor}`}
                    >
                        <Icon className="h-8 w-8" />
                    </span>
                </div>

                {/* Content */}
                <div className="mt-5 text-center">
                    <h2 className="text-xl font-extrabold text-ink">{current.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{current.description}</p>
                </div>

                {/* Progress dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {STEPS.map((_, i) => (
                        <span
                            key={i}
                            className={`h-2 rounded-full transition-all ${
                                i === step ? 'w-6 bg-brand-700' : 'w-2 bg-border-strong'
                            }`}
                        />
                    ))}
                </div>

                {/* Actions */}
                <div className="mt-6">
                    <Button className="w-full" onClick={handleNext}>
                        {isLast ? 'Começar' : 'Próximo'}
                        {!isLast && <ArrowRight className="h-4 w-4" />}
                    </Button>
                    {!isLast && (
                        <button
                            onClick={handleClose}
                            className="mt-3 w-full py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
                        >
                            Pular introdução
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
