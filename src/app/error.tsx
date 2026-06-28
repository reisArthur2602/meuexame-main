'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
    error: Error & { digest?: string };
    reset: () => void;
};

const ErrorPage = ({ error, reset }: Props) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-red-50 text-red-500">
                <AlertTriangle className="h-8 w-8" />
            </span>
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-ink">
                    Algo deu errado
                </h1>
                <p className="mt-2 text-ink-soft">
                    Ocorreu um erro inesperado. Tente novamente ou contate o suporte.
                </p>
            </div>
            <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-800"
            >
                Tentar novamente
            </button>
        </div>
    );
};

export default ErrorPage;
