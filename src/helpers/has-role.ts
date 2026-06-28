import type { AppRole } from '@/types';

export const hasRole = (userRole: string | null | undefined, roles: AppRole[]): boolean => {
    if (!userRole) return false;
    return roles.includes(userRole as AppRole);
};
