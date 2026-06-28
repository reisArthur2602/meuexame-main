'use client';

import { Button, type ButtonVariant } from '@/components/ui/button';
import type { UserRow } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { ShieldOff, ShieldCheck, X } from 'lucide-react';
import { toast } from 'sonner';
import { toggleUserStatus } from '../actions/delete-user';

type Props = {
    open: boolean;
    onClose: () => void;
    user: UserRow | null;
};

export const DeleteUserDialog = ({ open, onClose, user }: Props) => {
    const isActive = user?.status === 'active';

    const mutation = useMutation({
        mutationFn: () => toggleUserStatus(user!.id, !isActive),
        onSuccess(data) {
            if (data.success) {
                toast.success(data.message);
                onClose();
            } else {
                toast.error(data.message);
            }
        },
        onError() {
            toast.error('Erro inesperado. Tente novamente.');
        },
    });

    if (!open || !user) return null;

    const Icon = isActive ? ShieldOff : ShieldCheck;
    const iconClass = isActive
        ? 'bg-amber-50 text-amber-600'
        : 'bg-positive/10 text-positive';
    const title = isActive ? 'Desativar usuário' : 'Ativar usuário';
    const description = isActive
        ? 'O usuário perderá o acesso ao sistema imediatamente.'
        : 'O usuário voltará a ter acesso ao sistema.';
    const confirmLabel = isActive ? 'Desativar' : 'Ativar';
    const confirmVariant: ButtonVariant = isActive ? 'destructive' : 'primary';

    return (
        <div className="fixed inset-0 z-80 overflow-y-auto bg-ink/50 backdrop-blur-sm">
            <div
                className="flex min-h-full items-center justify-center p-5"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-soft">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl ${iconClass}`}>
                                <Icon className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="font-extrabold text-ink">{title}</h3>
                                <p className="mt-1 text-sm text-ink-soft">
                                    Tem certeza que deseja {isActive ? 'desativar' : 'ativar'}{' '}
                                    <span className="font-semibold text-ink">{user.name}</span>?{' '}
                                    {description}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-subtle text-ink-soft transition-colors hover:text-ink"
                            aria-label="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button variant="secondary" className="flex-1" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            variant={confirmVariant}
                            className="flex-1"
                            loading={mutation.isPending}
                            onClick={() => mutation.mutate()}
                        >
                            {confirmLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
