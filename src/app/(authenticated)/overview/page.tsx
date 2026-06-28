import { PageHeader } from '@/components/page-header';
import { requireRole } from '@/helpers/require-role';
import type { Metadata } from 'next';
import { KpiCards } from './features/kpi-cards';
import { RecentExams } from './features/recent-exams';

export const metadata: Metadata = {
    title: 'Visão geral',
    description: 'Acompanhe os principais indicadores do portal.',
};

const OverviewPage = async () => {
    await requireRole(['ADMIN']);
    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Acompanhe os principais indicadores do portal."
            />
            <main className="p-5 lg:p-8">
                <div>
                    <p className="text-sm text-ink-soft">Bem-vindo de volta.</p>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
                        Resumo da operação
                    </h2>
                </div>
                <KpiCards />
                <RecentExams />
            </main>
        </>
    );
};

export default OverviewPage;
