'use server';

import { formatRelativeDate } from '@/helpers/format-date';
import { shouldBeAdmin } from '@/helpers/should-be-admin';
import { verifyAuth } from '@/helpers/verify-auth';
import prisma from '@/lib/prisma';
import { cache } from 'react';

export const getKpis = cache(async () => {
    await verifyAuth();
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const [totalExams, todayExams, availableExams, activeUsers] = await Promise.all([
        prisma.exam.count(),
        prisma.exam.count({ where: { createdAt: { gte: startOfDay } } }),
        prisma.exam.count({ where: { status: 'AVAILABLE' } }),
        prisma.user.count({ where: { isActive: true } }),
    ]);

    return { totalExams, todayExams, availableExams, activeUsers };
});

export const getRecentExams = cache(async () => {
    await shouldBeAdmin();
    
    const now = new Date();

    const exams = await prisma.exam.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: { id: true, patientName: true, protocol: true, createdAt: true, status: true },
    });

    return exams.map((e) => ({
        id: e.id,
        patientName: e.patientName,
        protocol: e.protocol,
        status: e.status as 'AVAILABLE' | 'BLOCKED' | 'ARCHIVED',
        date: formatRelativeDate(e.createdAt, now),
    }));
});
