'use server';

import { generateUsername } from '@/helpers/generate-username';
import { shouldBeAdmin } from '@/helpers/should-be-admin';
import prisma from '@/lib/prisma';
import { type UpdateUserInput } from '@/schemas/user';
import { revalidatePath } from 'next/cache';

export const updateUser = async ({ id, name, role, isActive }: UpdateUserInput) => {
    const user = await shouldBeAdmin();

    if (user.id === id) {
        const self = await prisma.user.findUnique({ where: { id }, select: { role: true } });
        if (self && self.role !== role) {
            return { success: false, message: 'Você não pode alterar a própria função.' };
        }
    }

    try {
        await prisma.user.update({
            where: { id },
            data: { name, role, isActive, username: generateUsername(name) },
        });
    } catch {
        throw new Error('Erro ao atualizar o usuário.');
    }

    revalidatePath('/', 'layout');
    return { success: true, message: 'Usuário atualizado com sucesso.' };
};
