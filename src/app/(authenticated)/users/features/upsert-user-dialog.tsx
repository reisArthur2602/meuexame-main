'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { UserRow } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { createUser } from '../actions/create-user';
import { updateUser } from '../actions/update-user';

const schema = z.object({
    name: z.string().min(2, 'Informe o nome completo'),
    role: z.enum(['ADMIN', 'STAFF'] as const, { message: 'Selecione um perfil' }),
    password: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

type UpsertUserDialogProps = {
    open: boolean;
    onClose: () => void;
    user?: UserRow | null;
    isCurrentUser?: boolean;
};

const ROLE_OPTIONS = [
    { value: 'STAFF', label: 'Funcionário' },
    { value: 'ADMIN', label: 'Administrador' },
];

export const UpsertUserDialog = ({ open, onClose, user, isCurrentUser }: UpsertUserDialogProps) => {
    const isEdit = !!user;

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { role: 'STAFF', password: '' },
    });

    useEffect(() => {
        if (!open) return;
        if (user) {
            reset({ name: user.name, role: user.role === 'admin' ? 'ADMIN' : 'STAFF', password: '' });
        } else {
            reset({ name: '', role: 'STAFF', password: '' });
        }
    }, [open, user, reset]);

    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess(data) {
            if (data.success) { toast.success(data.message); onClose(); }
            else toast.error(data.message);
        },
        onError() { toast.error('Erro inesperado. Tente novamente.'); },
    });

    const updateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess(data) {
            if (data.success) { toast.success(data.message); onClose(); }
            else toast.error(data.message);
        },
        onError() { toast.error('Erro inesperado. Tente novamente.'); },
    });

    const isPending = createMutation.isPending || updateMutation.isPending;

    const onSubmit = (values: FormValues) => {
        if (isEdit) {
            updateMutation.mutate({
                id: user!.id,
                name: values.name,
                role: values.role,
                isActive: user!.status === 'active',
            });
        } else {
            if (!values.password || values.password.length < 6) {
                setError('password', { message: 'A senha deve ter ao menos 6 caracteres' });
                return;
            }
            createMutation.mutate({ name: values.name, role: values.role, password: values.password });
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-80 overflow-y-auto bg-ink/50 backdrop-blur-sm">
            <div
                className="flex min-h-full items-center justify-center p-5"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <div className="w-full max-w-lg rounded-2xl bg-surface p-6 shadow-soft">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-extrabold text-ink">
                                {isEdit ? 'Editar usuário' : 'Novo usuário'}
                            </h3>
                            <p className="mt-1 text-xs text-ink-soft">
                                {isEdit ? 'Altere os dados do usuário.' : 'Crie um acesso para um integrante da equipe.'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="grid h-9 w-9 place-items-center rounded-lg bg-surface-subtle text-ink-soft transition-colors hover:text-ink"
                            aria-label="Fechar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <Input
                            label="Nome completo"
                            placeholder="Nome do usuário"
                            error={errors.name?.message}
                            {...register('name')}
                        />
                        <Select
                            label="Perfil"
                            options={ROLE_OPTIONS}
                            error={errors.role?.message}
                            disabled={isCurrentUser}
                            {...register('role')}
                        />
                        {!isEdit && (
                            <Input
                                label="Senha inicial"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                error={errors.password?.message}
                                {...register('password')}
                            />
                        )}
                        <Button type="submit" loading={isPending} className="w-full">
                            {isEdit ? 'Salvar alterações' : 'Criar usuário'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
