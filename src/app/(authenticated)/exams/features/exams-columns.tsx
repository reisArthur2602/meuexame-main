'use client';

import { ExamStatusBadge } from '@/components/exam-status-badge';
import type { ExamDisplayStatus, ExamListItem } from '@/types';
import { useMutation } from '@tanstack/react-query';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, ChevronUp, Eye, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { resendWhatsapp } from '../actions/resend-whatsapp';

export const SortHeader = ({ column, label }: { column: Column<ExamListItem>; label: string }) => {
    const sorted = column.getIsSorted();
    return (
        <button
            className="flex items-center gap-1 text-left font-bold uppercase tracking-wide"
            onClick={column.getToggleSortingHandler()}
        >
            {label}
            {sorted === 'asc' ? (
                <ChevronUp className="h-3 w-3" />
            ) : sorted === 'desc' ? (
                <ChevronDown className="h-3 w-3" />
            ) : (
                <ArrowUpDown className="h-3 w-3 opacity-40" />
            )}
        </button>
    );
};

const ResendButton = ({ examId }: { examId: string }) => {
    const mutation = useMutation({
        mutationFn: () => resendWhatsapp(examId),
        onSuccess(data) {
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        },
        onError() {
            toast.error('Erro ao reenviar. Tente novamente.');
        },
    });

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                mutation.mutate();
            }}
            disabled={mutation.isPending}
            title="Reenviar WhatsApp"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-300 bg-amber-50 text-amber-600 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Reenviar mensagem WhatsApp"
        >
            <RefreshCw className={`h-4 w-4 ${mutation.isPending ? 'animate-spin' : ''}`} />
        </button>
    );
};

export const examsColumns: ColumnDef<ExamListItem>[] = [
    {
        accessorKey: 'patientName',
        header: ({ column }) => <SortHeader column={column} label="Paciente" />,
        cell: ({ row }) => (
            <div>
                <p className="font-bold text-ink">{row.original.patientName}</p>
                <p className="text-xs text-ink-soft">{row.original.patientCpf}</p>
            </div>
        ),
    },
    {
        accessorKey: 'protocol',
        header: 'Protocolo',
        cell: ({ getValue }) => (
            <span className="font-semibold text-ink">{getValue<string>()}</span>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => <SortHeader column={column} label="Cadastrado em" />,
        cell: ({ getValue }) => <span className="text-ink-soft">{getValue<string>()}</span>,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        filterFn: 'equals',
        cell: ({ getValue }) => <ExamStatusBadge status={getValue<ExamDisplayStatus>()} />,
    },
    {
        id: 'actions',
        header: () => <span className="block text-right">Ações</span>,
        cell: ({ row }) => (
            <div className="flex items-center justify-end gap-2">
                {!row.original.whatsappSent && row.original.patientPhone && (
                    <ResendButton examId={row.original.id} />
                )}
                <Link
                    href={`/exams/${row.original.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-soft transition-colors hover:text-brand-700"
                    aria-label="Ver detalhes"
                >
                    <Eye className="h-4 w-4" />
                </Link>
            </div>
        ),
    },
];
