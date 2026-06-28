import { PageHeader } from '@/components/page-header';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NewExamForm } from './features/new-exam-form';

export const metadata: Metadata = {
    title: 'Novo exame',
    description: 'Cadastre um resultado e disponibilize ao paciente.',
};

const NewExamPage = () => (
    <>
        <PageHeader
            title="Novo exame"
            subtitle="Cadastre um resultado e disponibilize ao paciente."
        />

        <main className="p-5 lg:p-8">
            <div>
                <Link
                    href="/exams"
                    className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft transition-colors hover:text-brand-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para exames
                </Link>

                <div className="mt-5">
                    <h2 className="text-2xl font-extrabold tracking-tight text-ink">
                        Cadastrar novo exame
                    </h2>
                    <p className="mt-1 text-sm text-ink-soft">
                        Informe os dados do paciente e adicione o resultado em PDF.
                    </p>
                </div>

                <NewExamForm />
            </div>
        </main>
    </>
);

export default NewExamPage;
