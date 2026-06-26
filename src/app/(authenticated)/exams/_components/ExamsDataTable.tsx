"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type Column,
} from "@tanstack/react-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowUpDown, ChevronDown, ChevronUp, Eye, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { Pagination } from "@/components/ui/Pagination";
import { ExamStatusBadge } from "@/components/exam/ExamStatusBadge";
import type { ExamDisplayStatus, ExamListItem } from "../actions";
import { getExams, resendWhatsapp } from "../actions";

function SortHeader({ column, label }: { column: Column<ExamListItem>; label: string }) {
  const sorted = column.getIsSorted();
  return (
    <button
      className="flex items-center gap-1 text-left font-bold uppercase tracking-wide"
      onClick={column.getToggleSortingHandler()}
    >
      {label}
      {sorted === "asc" ? (
        <ChevronUp className="h-3 w-3" />
      ) : sorted === "desc" ? (
        <ChevronDown className="h-3 w-3" />
      ) : (
        <ArrowUpDown className="h-3 w-3 opacity-40" />
      )}
    </button>
  );
}

function ResendButton({ examId, onSuccess }: { examId: string; onSuccess: () => void }) {
  const mutation = useMutation({
    mutationFn: () => resendWhatsapp(examId),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        onSuccess();
      } else {
        toast.error(data.message);
      }
    },
    onError() {
      toast.error("Erro ao reenviar. Tente novamente.");
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
      <RefreshCw className={`h-4 w-4 ${mutation.isPending ? "animate-spin" : ""}`} />
    </button>
  );
}

export function ExamsDataTable() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [activeStatus, setActiveStatus] = useState<ExamDisplayStatus | "todos">("todos");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const { data = [], isPending } = useQuery({
    queryKey: ["exams"],
    queryFn: getExams,
  });

  function handleResendSuccess() {
    queryClient.invalidateQueries({ queryKey: ["exams"] });
  }

  const columns: ColumnDef<ExamListItem>[] = [
    {
      accessorKey: "patientName",
      header: ({ column }) => <SortHeader column={column} label="Paciente" />,
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-ink">{row.original.patientName}</p>
          <p className="text-xs text-ink-soft">{row.original.patientCpf}</p>
        </div>
      ),
    },
    {
      accessorKey: "protocol",
      header: "Protocolo",
      cell: ({ getValue }) => (
        <span className="font-semibold text-ink">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <SortHeader column={column} label="Cadastrado em" />,
      cell: ({ getValue }) => (
        <span className="text-ink-soft">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      filterFn: "equals",
      cell: ({ getValue }) => (
        <ExamStatusBadge status={getValue<ExamDisplayStatus>()} />
      ),
    },
    {
      id: "actions",
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          {!row.original.whatsappSent && row.original.patientPhone && (
            <ResendButton
              examId={row.original.id}
              onSuccess={handleResendSuccess}
            />
          )}
          <button
            onClick={(e) => e.stopPropagation()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-soft transition-colors hover:text-brand-700"
            aria-label="Ver detalhes"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
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

  function handleStatusFilter(value: ExamDisplayStatus | "todos") {
    setActiveStatus(value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
    setColumnFilters(value === "todos" ? [] : [{ id: "status", value }]);
  }

  function handleSearch(value: string) {
    setGlobalFilter(value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }

  const { pageIndex, pageSize } = table.getState().pagination;

  if (isPending) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
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
              onChange={(e) => handleStatusFilter(e.target.value as ExamDisplayStatus | "todos")}
              options={[
                { value: "todos", label: "Todos os status" },
                { value: "disponivel", label: "Disponíveis" },
                { value: "bloqueado", label: "Bloqueados" },
                { value: "arquivado", label: "Arquivados" },
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
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-sm text-ink-soft">
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
}
