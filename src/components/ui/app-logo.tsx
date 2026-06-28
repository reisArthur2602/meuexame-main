import { HeartPulse } from 'lucide-react';

type AppLogoProps = {
    showSubtitle?: boolean;
    inverted?: boolean;
};

export const AppLogo = ({ showSubtitle = false, inverted = false }: AppLogoProps) => (
    <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
            <HeartPulse className="size-5" />
        </span>
        <span>
            <span
                className={`block text-base font-extrabold tracking-tight ${
                    inverted ? 'text-white' : 'text-ink'
                }`}
            >
                MeuLaudo
            </span>
            {showSubtitle && (
                <span
                    className={`block text-[10px] font-semibold uppercase tracking-[.18em] ${
                        inverted ? 'text-slate-300' : 'text-ink-soft'
                    }`}
                >
                    Centro Clínico
                </span>
            )}
        </span>
    </div>
);
