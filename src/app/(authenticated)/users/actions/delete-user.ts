'use server';

import { shouldBeAdmin } from '@/helpers/should-be-admin';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const toggleUserStatus = async (userId: string, isActive: boolean) => {
    const user = await shouldBeAdmin();

    if (user.id === userId) {
        return { success: false, message: 'Você não pode alterar o status da sua própria conta.' };
    }

    try {
        await prisma.user.update({ where: { id: userId }, data: { isActive } });
    } catch {
        throw new Error('Erro ao atualizar o status do usuário.');
    }

    revalidatePath('/users');
    return {
        success: true,
        message: isActive ? 'Usuário ativado com sucesso.' : 'Usuário desativado com sucesso.',
    };
};
