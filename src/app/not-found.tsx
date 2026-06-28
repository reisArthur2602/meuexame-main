import Link from 'next/link';
import { Home } from 'lucide-react';

const NotFound = () => (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
        <p className="text-8xl font-extrabold tracking-tighter text-brand-700">404</p>
        <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-ink">
                Página não encontrada
            </h1>
            <p className="mt-2 text-ink-soft">
                O endereço que você acessou não existe ou foi removido.
            </p>
        </div>
        <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-700 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-800"
        >
            <Home className="h-4 w-4" />
            Voltar ao início
        </Link>
    </div>
);

export default NotFound;
