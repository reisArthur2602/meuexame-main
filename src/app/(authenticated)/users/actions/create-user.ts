'use server';

import { shouldBeAdmin } from '@/helpers/should-be-admin';
import { generateUsername } from '@/helpers/generate-username';
import prisma from '@/lib/prisma';
import { type CreateUserInput } from '@/schemas/user';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

export const createUser = async ({ name, role, password }: CreateUserInput) => {
    await shouldBeAdmin();

    const username = generateUsername(name);

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
        return { success: false, message: 'Já existe um usuário com este nome. Tente um nome diferente.' };
    }

    let passwordHash: string;
    try {
        passwordHash = await bcrypt.hash(password, 10);
    } catch {
        throw new Error('Erro ao processar a senha.');
    }

    try {
        await prisma.user.create({ data: { name, username, role, passwordHash } });
    } catch {
        throw new Error('Erro ao criar o usuário.');
    }

    revalidatePath('/users');
    return { success: true, message: 'Usuário criado com sucesso.' };
};
