import { ExamStatusBadge } from '@/components/exam-status-badge';
import Link from 'next/link';
import { getRecentExams } from '../actions/get-overview-data';

const STATUS_DISPLAY = {
    AVAILABLE: 'disponivel',
    BLOCKED: 'bloqueado',
    ARCHIVED: 'arquivado',
} as const;

export const RecentExams = async () => {
    const exams = await getRecentExams();

    return (
        <article className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-border/60 p-5">
                <div>
                    <h3 className="font-extrabold text-ink">Últimos exames enviados</h3>
                    <p className="mt-1 text-xs text-ink-soft">Atividade mais recente do painel</p>
                </div>
                <Link
                    href="/exams"
                    className="text-sm font-bold text-brand-700 transition-colors hover:text-brand-800"
                >
                    Ver todos
                </Link>
            </div>

            {exams.length === 0 ? (
                <p className="p-5 text-sm text-ink-soft">Nenhum exame cadastrado ainda.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-155 text-left">
                        <thead className="bg-surface-muted text-xs uppercase tracking-wide text-ink-soft">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Paciente</th>
                                <th className="px-5 py-3 font-semibold">Protocolo</th>
                                <th className="px-5 py-3 font-semibold">Data</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60 text-sm">
                            {exams.map((exam) => (
                                <tr key={exam.id}>
                                    <td className="px-5 py-4 font-bold text-ink">
                                        {exam.patientName}
                                    </td>
                                    <td className="px-5 py-4 text-ink-soft">{exam.protocol}</td>
                                    <td className="px-5 py-4 text-ink-soft">{exam.date}</td>
                                    <td className="px-5 py-4">
                                        <ExamStatusBadge status={STATUS_DISPLAY[exam.status]} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </article>
    );
};
