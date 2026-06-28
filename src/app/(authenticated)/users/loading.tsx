import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';

const UsersLoading = () => (
    <>
        <PageHeader title="Usuários" subtitle="Controle os acessos da equipe." />
        <main className="p-5 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="mt-2 h-4 w-72" />
                </div>
                <Skeleton className="h-11 w-36 rounded-xl" />
            </div>
            <div className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
                <div className="border-b border-border/60 p-5">
                    <Skeleton className="h-10 w-full max-w-md rounded-xl" />
                </div>
                <div className="space-y-px p-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </main>
    </>
);

export default UsersLoading;
