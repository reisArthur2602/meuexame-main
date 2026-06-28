'use client';

import { AppLogo } from '@/components/ui/app-logo';
import { useSidebar } from '@/contexts/SidebarContext';
import { signOut } from '@/helpers/sign-out';
import { cn } from '@/lib/utils';
import type { AppRole, CurrentUser } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { Files, LayoutDashboard, LogOut, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; icon: LucideIcon; label: string; roles?: AppRole[] };
type NavSection = { title: string; items: NavItem[] };

const navSections: NavSection[] = [
    {
        title: 'Menu',
        items: [
            { href: '/overview', icon: LayoutDashboard, label: 'Visão geral', roles: ['ADMIN'] },
            { href: '/exams', icon: Files, label: 'Exames' },
        ],
    },
    {
        title: 'Configurações',
        items: [{ href: '/users', icon: Users, label: 'Usuários', roles: ['ADMIN'] }],
    },
];

const roleLabel: Record<CurrentUser['role'], string> = {
    ADMIN: 'Administrador',
    STAFF: 'Staff',
};

const getInitials = (name: string) =>
    name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

export const Sidebar = ({ user }: { user: CurrentUser }) => {
    const pathname = usePathname();
    const { open, close } = useSidebar();

    const sections = navSections
        .map((section) => ({
            ...section,
            items: section.items.filter(({ roles }) => !roles || roles.includes(user.role)),
        }))
        .filter((section) => section.items.length > 0);

    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-surface transition-transform duration-200',
                open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            )}
        >
            <div className="flex h-20 items-center border-b border-border px-6">
                <Link href="/overview" onClick={close}>
                    <AppLogo />
                </Link>
            </div>

            <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
                {sections.map((section) => (
                    <div key={section.title}>
                        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                            {section.title}
                        </p>
                        <div className="space-y-1">
                            {section.items.map(({ href, icon: Icon, label }) => {
                                const isActive =
                                    pathname === href || pathname.startsWith(`${href}/`);
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={close}
                                        className={cn(
                                            'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all',
                                            isActive
                                                ? 'bg-brand-50 text-brand-700'
                                                : 'text-ink-muted hover:bg-surface-subtle hover:text-ink'
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors',
                                                isActive
                                                    ? 'bg-brand-700 text-white shadow-sm shadow-brand-700/30'
                                                    : 'bg-surface-subtle text-ink-soft group-hover:text-ink-muted'
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <span>{label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="border-t border-border p-4">
                <div className="flex items-center gap-3 rounded-xl bg-surface-muted p-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                        {getInitials(user.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-ink">{user.name}</p>
                        <p className="text-xs text-ink-soft">{roleLabel[user.role]}</p>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-negative-soft hover:text-negative"
                        title="Sair"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
};
