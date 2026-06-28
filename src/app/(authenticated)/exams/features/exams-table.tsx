'use client';

import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Select } from '@/components/ui/select';
import type { ExamDisplayStatus, ExamListItem } from '@/types';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { examsColumns } from './exams-columns';

type ExamsTableProps = {
    data: ExamListItem[];
};

export const ExamsTable = ({ data }: ExamsTableProps) => {
    const router = useRouter();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [activeStatus, setActiveStatus] = useState<ExamDisplayStatus | 'todos'>('todos');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const table = useReactTable({
        data,
        columns: examsColumns,
        state: { sorting, globalFilter, columnFilters, pagination },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleStatusFilter = (value: ExamDisplayStatus | 'todos') => {
        setActiveStatus(value);
        setPagination((p) => ({ ...p, pageIndex: 0 }));
        setColumnFilters(value === 'todos' ? [] : [{ id: 'status', value }]);
    };

    const handleSearch = (value: string) => {
        setGlobalFilter(value);
        setPagination((p) => ({ ...p, pageIndex: 0 }));
    };

    const { pageIndex, pageSize } = table.getState().pagination;

    return (
        <section className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            {/* Toolbar */}
            <div className="border-b border-border p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <Input
                        value={globalFilter}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar por paciente, CPF ou protocolo..."
                        className="max-w-md"
                    />
                    <div className="w-full max-w-[200px]">
                        <Select
                            value={activeStatus}
                            onChange={(e) =>
                                handleStatusFilter(e.target.value as ExamDisplayStatus | 'todos')
                            }
                            options={[
                                { value: 'todos', label: 'Todos os status' },
                                { value: 'disponivel', label: 'Disponíveis' },
                                { value: 'bloqueado', label: 'Bloqueados' },
                                { value: 'arquivado', label: 'Arquivados' },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-surface-muted text-xs font-bold uppercase tracking-wide text-ink-soft">
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id}>
                                {hg.headers.map((header) => (
                                    <th key={header.id} className="px-5 py-3">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-border text-sm">
                        {table.getRowModel().rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={examsColumns.length}
                                    className="py-12 text-center text-sm text-ink-soft"
                                >
                                    Nenhum exame encontrado.
                                </td>
                            </tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => router.push(`/exams/${row.original.id}`)}
                                    className="cursor-pointer transition-colors hover:bg-surface-muted"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-5 py-4">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-4">
                <Pagination
                    page={pageIndex + 1}
                    totalPages={table.getPageCount()}
                    onPageChange={(p) => table.setPageIndex(p - 1)}
                    totalItems={table.getFilteredRowModel().rows.length}
                    pageSize={pageSize}
                />
            </div>
        </section>
    );
};
