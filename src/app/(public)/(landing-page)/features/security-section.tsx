import { Reveal } from '@/components/ui/reveal';
import { EyeOff, Lock } from 'lucide-react';

export const SecuritySection = () => {
    return (
        <section className="relative overflow-hidden bg-slate-950">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="animate-blob absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
                <div
                    className="animate-blob absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-info/20 blur-3xl"
                    style={{ animationDelay: '7s' }}
                />
            </div>

            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-16 lg:grid-cols-2 lg:px-8">
                <Reveal>
                    <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-300 ring-1 ring-white/10">
                        PRIVACIDADE EM PRIMEIRO LUGAR
                    </span>
                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
                        Seus dados e documentos protegidos.
                    </h2>
                    <p className="mt-4 max-w-xl leading-7 text-slate-300">
                        O acesso depende da combinação correta de CPF e protocolo. Os arquivos não
                        são publicados em links abertos e todas as consultas são protegidas.
                    </p>
                </Reveal>

                <div className="grid gap-4 sm:grid-cols-2">
                    <Reveal delay={120}>
                        <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-brand-300/40 hover:bg-white/10">
                            <Lock className="h-6 w-6 text-brand-300" />
                            <p className="mt-4 font-bold text-white">Conexão segura</p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Proteção durante a consulta e o download.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={220}>
                        <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-brand-300/40 hover:bg-white/10">
                            <EyeOff className="h-6 w-6 text-brand-300" />
                            <p className="mt-4 font-bold text-white">Acesso restrito</p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Somente quem possui os dados corretos acessa.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};
