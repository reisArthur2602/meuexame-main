import { cn } from '@/lib/utils';
import type { UserRow } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';

const AVATAR_COLORS: Record<UserRow['avatarColor'], string> = {
    brand: 'bg-brand-100 text-brand-800',
    blue: 'bg-blue-100 text-blue-800',
    amber: 'bg-amber-100 text-amber-800',
    rose: 'bg-rose-100 text-rose-800',
    teal: 'bg-teal-100 text-teal-800',
};

const RoleBadge = ({ role }: { role: UserRow['role'] }) => {
    if (role === 'admin') {
        return (
            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
                Administrador
            </span>
        );
    }
    return (
        <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-bold text-ink-muted">
            Funcionário
        </span>
    );
};

const StatusIndicator = ({ status }: { status: UserRow['status'] }) => {
    if (status === 'active') {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-positive">
                <span className="h-2 w-2 rounded-full bg-positive" />
                Ativo
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft">
            <span className="h-2 w-2 rounded-full bg-border-strong" />
            Inativo
        </span>
    );
};

type UsersColumnsArgs = {
    currentUserId: string;
    onEdit: (user: UserRow) => void;
    onDelete: (user: UserRow) => void;
};

export const getUsersColumns = ({
    currentUserId,
    onEdit,
    onDelete,
}: UsersColumnsArgs): ColumnDef<UserRow>[] => [
    {
        accessorKey: 'name',
        header: 'Usuário',
        cell: ({ row }) => {
            const u = row.original;
            return (
                <div className="flex items-center gap-3">
                    <span
                        className={cn(
                            'grid h-10 w-10 place-items-center rounded-full text-sm font-bold',
                            AVATAR_COLORS[u.avatarColor]
                        )}
                    >
                        {u.initials}
                    </span>
                    <div>
                        <p className="font-bold text-ink">{u.name}</p>
                        <p className="text-xs text-ink-soft">{u.username}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'role',
        header: 'Perfil',
        filterFn: 'equals',
        cell: ({ row }) => <RoleBadge role={row.original.role} />,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusIndicator status={row.original.status} />,
    },
    {
        accessorKey: 'lastAccess',
        header: 'Último acesso',
        cell: ({ getValue }) => (
            <span className="text-ink-soft">{getValue<string>()}</span>
        ),
    },
    {
        id: 'actions',
        header: () => <span className="block text-right">Ações</span>,
        cell: ({ row }) => {
            const u = row.original;
            return (
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onEdit(u)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
                        title="Editar usuário"
                        aria-label={`Editar ${u.name}`}
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    {u.id !== currentUserId && (
                        <button
                            onClick={() => onDelete(u)}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-soft transition-colors hover:border-negative/40 hover:text-negative"
                            title="Excluir usuário"
                            aria-label={`Excluir ${u.name}`}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            );
        },
    },
];
