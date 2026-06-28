'use client';

import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Select } from '@/components/ui/select';
import type { UserRow } from '@/types';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { DeleteUserDialog } from './delete-user-dialog';
import { UpsertUserDialog } from './upsert-user-dialog';
import { getUsersColumns } from './users-columns';


type UsersTableProps = {
    rows: UserRow[];
    currentUserId: string;
};

type RoleFilter = 'todos' | 'admin' | 'employee';

export const UsersTable = ({ rows, currentUserId }: UsersTableProps) => {
    const [upsertOpen, setUpsertOpen] = useState(false);
    const [editUser, setEditUser] = useState<UserRow | null>(null);
    const [deleteUser, setDeleteUser] = useState<UserRow | null>(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [activeRole, setActiveRole] = useState<RoleFilter>('todos');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const openEdit = (user: UserRow) => {
        setEditUser(user);
        setUpsertOpen(true);
    };

    const columns = getUsersColumns({ currentUserId, onEdit: openEdit, onDelete: setDeleteUser });

    const handleRoleFilter = (value: RoleFilter) => {
        setActiveRole(value);
        setPagination((p) => ({ ...p, pageIndex: 0 }));
        setColumnFilters(value === 'todos' ? [] : [{ id: 'role', value }]);
    };

    const handleSearch = (value: string) => {
        setGlobalFilter(value);
        setPagination((p) => ({ ...p, pageIndex: 0 }));
    };

    const table = useReactTable({
        data: rows,
        columns,
        state: { globalFilter, columnFilters, pagination },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const { pageIndex, pageSize } = table.getState().pagination;

    return (
        <>
            <UpsertUserDialog
                open={upsertOpen}
                onClose={() => setUpsertOpen(false)}
                user={editUser}
                isCurrentUser={editUser?.id === currentUserId}
            />
            <DeleteUserDialog
                open={!!deleteUser}
                onClose={() => setDeleteUser(null)}
                user={deleteUser}
            />

            <section className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
                {/* Toolbar */}
                <div className="border-b border-border/60 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <Input
                            value={globalFilter}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Buscar por nome ou usuário..."
                            className="max-w-md"
                        />
                        <div className="w-full max-w-50">
                            <Select
                                value={activeRole}
                                onChange={(e) => handleRoleFilter(e.target.value as RoleFilter)}
                                options={[
                                    { value: 'todos', label: 'Todos os perfis' },
                                    { value: 'admin', label: 'Administrador' },
                                    { value: 'employee', label: 'Funcionário' },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-175 text-left">
                        <thead className="bg-surface-muted text-xs uppercase tracking-wide text-ink-soft">
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id}>
                                    {hg.headers.map((header) => (
                                        <th key={header.id} className="px-5 py-3 font-semibold">
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
                        <tbody className="divide-y divide-border/60 text-sm">
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-5 py-12 text-center text-ink-soft"
                                    >
                                        Nenhum usuário encontrado.
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="transition-colors hover:bg-surface-muted/50"
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
                <div className="border-t border-border/60 px-5 py-4">
                    <Pagination
                        page={pageIndex + 1}
                        totalPages={table.getPageCount()}
                        onPageChange={(p) => table.setPageIndex(p - 1)}
                        totalItems={table.getFilteredRowModel().rows.length}
                        pageSize={pageSize}
                    />
                </div>
            </section>
        </>
    );
};
