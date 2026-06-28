import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';

const OverviewLoading = () => (
    <>
        <PageHeader
            title="Dashboard"
            subtitle="Acompanhe os principais indicadores do portal."
        />
        <main className="p-5 lg:p-8">
            <div>
                <Skeleton className="h-4 w-40" />
                <Skeleton className="mt-2 h-7 w-56" />
            </div>
            <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-36 w-full rounded-2xl" />
                ))}
            </section>
            <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
                <div className="border-b border-border/60 p-5">
                    <Skeleton className="h-5 w-48" />
                </div>
                <div className="space-y-px p-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-14 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </main>
    </>
);

export default OverviewLoading;
