import { AppLayout } from '@/app/(authenticated)/features/app-layout';
import { requireAuth } from '@/helpers/require-auth';
import { type PropsWithChildren } from 'react';

export default async function AuthenticatedLayout({ children }: PropsWithChildren) {
    const user = await requireAuth();
    return <AppLayout user={user}>{children}</AppLayout>;
}
