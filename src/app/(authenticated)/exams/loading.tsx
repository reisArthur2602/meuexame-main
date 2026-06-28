import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';

const ExamsLoading = () => (
    <>
        <PageHeader
            title="Exames"
            subtitle="Gerencie os resultados dos pacientes."
            actions={<Skeleton className="h-9 w-28 rounded-xl" />}
        />
        <main className="p-5 lg:p-8">
            <div>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="mt-2 h-4 w-64" />
            </div>
            <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
                <div className="border-b border-border p-5">
                    <Skeleton className="h-10 w-full max-w-md rounded-xl" />
                </div>
                <div className="space-y-2 p-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </main>
    </>
);

export default ExamsLoading;
