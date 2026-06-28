import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ExamsData } from './features/exams-data';

export const metadata: Metadata = {
    title: 'Exames',
};

const ExamsPage = () => (
    <>
        <PageHeader
            title="Exames"
            subtitle="Gerencie os resultados dos pacientes."
            actions={
                <Link href="/exams/new">
                    <Button>
                        <Plus className="h-4 w-4" />
                        Novo exame
                    </Button>
                </Link>
            }
        />
        <main className="px-5 lg:px-8 ">
            <ExamsData />
        </main>
    </>
);

export default ExamsPage;
