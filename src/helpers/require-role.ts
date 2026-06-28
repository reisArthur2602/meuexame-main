import type { AppRole } from '@/types';
import { redirect } from 'next/navigation';
import { verifyAuth } from './verify-auth';

export const requireRole = async (roles: AppRole[]) => {
    const user = await verifyAuth();
    if (!roles.includes(user.role)) redirect('/exams');
};
