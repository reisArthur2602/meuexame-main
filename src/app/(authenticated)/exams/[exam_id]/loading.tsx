import { PageHeader } from '@/components/page-header';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExamDetailLoading() {
    return (
        <>
            <PageHeader title="Carregando..." actions={<Skeleton className="h-6 w-20 rounded-full" />} />

            <main className="p-5 lg:p-8">
                <Skeleton className="h-5 w-40" />

                <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
                    {/* Left */}
                    <div className="space-y-6">
                        <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                            <Skeleton className="h-5 w-40" />
                            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                        <div className="flex-1 space-y-1.5">
                                            <Skeleton className="h-3 w-16" />
                                            <Skeleton className="h-4 w-28" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex justify-between border-t border-border pt-5">
                                <Skeleton className="h-3 w-40" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </article>

                        <article className="rounded-2xl border border-border bg-surface p-6 shadow-card">
                            <div className="flex items-center gap-3 border-b border-border pb-5">
                                <Skeleton className="h-10 w-10 rounded-xl" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </div>
                            <Skeleton className="mt-5 h-16 w-full rounded-2xl" />
                        </article>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="mt-1 h-3 w-48" />
                            <div className="mt-4 space-y-2">
                                <Skeleton className="h-10 w-full rounded-xl" />
                                <Skeleton className="h-10 w-full rounded-xl" />
                            </div>
                        </article>

                        <article className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                            <Skeleton className="h-5 w-24" />
                            <div className="mt-5 space-y-5 border-l border-border pl-5">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-3 w-40" />
                                        <Skeleton className="h-3 w-20" />
                                    </div>
                                ))}
                            </div>
                        </article>
                    </div>
                </div>
            </main>
        </>
    );
}
