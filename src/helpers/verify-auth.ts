import type { CurrentUser } from '@/types';
import { getCurrentUser } from './get-current-user';

export const verifyAuth = async (): Promise<CurrentUser> => {
    const user = await getCurrentUser();
    if (!user) throw new Error('Unauthenticated');
    return user;
};
