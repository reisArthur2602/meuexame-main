'use client';

import { OnboardingModal } from '@/app/(authenticated)/features/onboarding-modal';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';
import type { CurrentUser } from '@/types';
import { type ReactNode } from 'react';
import { Sidebar } from './sidebar';

type Props = { children: ReactNode; user?: CurrentUser };

const PLACEHOLDER_USER: CurrentUser = {
    id: '',
    name: 'Usuário',
    username: 'usuario',
    role: 'STAFF',
};

function AppLayoutInner({ children, user }: Props) {
    const { open, close } = useSidebar();

    return (
        <div className="min-h-screen">
            <OnboardingModal />
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
                    onClick={close}
                    aria-hidden="true"
                />
            )}
            <Sidebar user={user ?? PLACEHOLDER_USER} />
            <div className="lg:pl-72">{children}</div>
        </div>
    );
}

export function AppLayout({ children, user }: Props) {
    return (
        <SidebarProvider>
            <AppLayoutInner user={user}>{children}</AppLayoutInner>
        </SidebarProvider>
    );
}
