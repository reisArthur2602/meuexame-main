import type { CurrentUser } from '@/types';
import { verifyAuth } from './verify-auth';

export const shouldBeAdmin = async (): Promise<CurrentUser> => {
    const user = await verifyAuth();
    if (user.role !== 'ADMIN')
        throw new Error('Você não possui permissão para acessar esse recurso');
    return user;
};
