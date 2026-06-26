"use client";

import { useState, type ReactNode } from "react";
import { Eye, Search } from "lucide-react";
import { Table, type TableColumn } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Input } from "@/components/ui/Input";
import { ExamStatusBadge, type ExamStatus } from "./ExamStatusBadge";
import { cn } from "@/lib/utils";

export interface ExamRow {
  id: string;
  protocol: string;
  patientName: string;
  patientCpf: string;
  examType: string;
  uploadedAt: string;
  status: ExamStatus;
}

interface ExamTableProps {
  rows: ExamRow[];
  onView?: (row: ExamRow) => void;
  pageSize?: number;
  actions?: ReactNode;
}

const statusFilters: { label: string; value: ExamStatus | "todos" }[] = [
  { label: "Todos", value: "todos" },
  { label: "Disponíveis", value: "disponivel" },
  { label: "Bloqueados", value: "bloqueado" },
  { label: "Pendentes", value: "pendente" },
];

export function ExamTable({
  rows,
  onView,
  pageSize = 10,
  actions,
}: ExamTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ExamStatus | "todos">(
    "todos"
  );
  const [page, setPage] = useState(1);

  const filtered = rows.filter((r) => {
    const matchSearch =
      !search ||
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.patientCpf.includes(search) ||
      r.protocol.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "todos" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleFilterChange(f: ExamStatus | "todos") {
    setStatusFilter(f);
    setPage(1);
  }

  const columns: TableColumn<ExamRow>[] = [
    {
      key: "patientName",
      header: "Paciente",
      render: (r) => (
        <div>
          <p className="font-bold text-ink">{r.patientName}</p>
          <p className="text-xs text-ink-soft">{r.examType}</p>
        </div>
      ),
    },
    {
      key: "patientCpf",
      header: "CPF",
      render: (r) => <span className="text-ink-muted">{r.patientCpf}</span>,
    },
    {
      key: "protocol",
      header: "Protocolo",
      render: (r) => <span className="font-semibold text-ink">{r.protocol}</span>,
    },
    {
      key: "uploadedAt",
      header: "Upload",
      render: (r) => <span className="text-ink-soft">{r.uploadedAt}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <ExamStatusBadge status={r.status} />,
    },
    ...(onView
      ? ([
          {
            key: "actions",
            header: "Ações",
            align: "right" as const,
            render: (r) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView(r);
                }}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-soft transition-colors hover:text-brand-700"
                aria-label="Ver detalhes"
              >
                <Eye className="h-4 w-4" />
              </button>
            ),
          },
        ] as TableColumn<ExamRow>[])
      : []),
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
      {/* Toolbar */}
      <div className="border-b border-border p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar por paciente, CPF ou protocolo..."
            icon={<Search className="h-4 w-4" />}
            className="max-w-md"
          />
          <div className="flex flex-wrap items-center gap-2">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => handleFilterChange(f.value)}
                className={cn(
                  "rounded-xl px-3 py-2 text-xs font-bold transition-colors",
                  statusFilter === f.value
                    ? "bg-slate-900 text-white"
                    : "border border-border bg-surface text-ink-muted hover:bg-surface-subtle"
                )}
              >
                {f.label}
              </button>
            ))}
            {actions}
          </div>
        </div>
      </div>

      <Table<ExamRow>
        columns={columns}
        rows={pageRows}
        keyField="id"
      />

      {/* Footer */}
      <div className="border-t border-border px-5 py-4">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filtered.length}
          pageSize={pageSize}
        />
      </div>
    </section>
  );
}
