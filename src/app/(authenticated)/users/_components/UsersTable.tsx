"use client";

import { useState } from "react";
import { Search, UserPlus, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: "brand" | "blue" | "amber" | "rose" | "teal";
  role: "admin" | "employee";
  status: "active" | "inactive";
  lastAccess: string;
};

const AVATAR_COLORS: Record<UserRow["avatarColor"], string> = {
  brand: "bg-brand-100 text-brand-800",
  blue: "bg-blue-100 text-blue-800",
  amber: "bg-amber-100 text-amber-800",
  rose: "bg-rose-100 text-rose-800",
  teal: "bg-teal-100 text-teal-800",
};

const ROLE_OPTIONS = [
  { value: "employee", label: "Funcionário" },
  { value: "admin", label: "Administrador" },
];

function RoleBadge({ role }: { role: UserRow["role"] }) {
  if (role === "admin") {
    return (
      <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
        Administrador
      </span>
    );
  }
  return (
    <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-bold text-ink-muted">
      Funcionário
    </span>
  );
}

function StatusIndicator({ status }: { status: UserRow["status"] }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-positive">
        <span className="h-2 w-2 rounded-full bg-positive" />
        Ativo
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft">
      <span className="h-2 w-2 rounded-full bg-border-strong" />
      Inativo
    </span>
  );
}

// ── New User Modal ──────────────────────────────────────────────────────────

type NewUserModalProps = {
  open: boolean;
  onClose: () => void;
};

function NewUserModal({ open, onClose }: NewUserModalProps) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // TODO: chamar action/endpoint real
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-ink/50 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mx-auto my-12 max-w-lg rounded-2xl bg-surface p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-ink">Novo usuário</h3>
            <p className="mt-1 text-xs text-ink-soft">
              Crie um acesso para um integrante da equipe.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg bg-surface-subtle text-ink-soft transition-colors hover:text-ink"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Nome completo"
            name="name"
            placeholder="Nome do usuário"
            required
          />
          <Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="email@clinica.com.br"
            required
          />
          <Select
            label="Perfil"
            name="role"
            options={ROLE_OPTIONS}
            required
          />
          <Button type="submit" loading={loading} className="w-full">
            Criar usuário
          </Button>
        </form>
      </div>
    </div>
  );
}

// ── UsersTable ──────────────────────────────────────────────────────────────

type UsersTableProps = {
  rows: UserRow[];
};

export function UsersTable({ rows }: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = rows.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <NewUserModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Section header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">
            Usuários da equipe
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Gerencie acessos e permissões administrativas.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-700/20 transition-colors hover:bg-brand-800"
        >
          <UserPlus className="h-4 w-4" />
          Novo usuário
        </button>
      </div>

      {/* Table card */}
      <section className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        {/* Search bar */}
        <div className="border-b border-border/60 p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar usuário..."
              className="w-full rounded-xl border border-border bg-surface-muted py-3 pl-11 pr-4 text-sm text-ink outline-none placeholder:text-ink-soft transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-surface-muted text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-5 py-3 font-semibold">Usuário</th>
                <th className="px-5 py-3 font-semibold">Perfil</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Último acesso</th>
                <th className="px-5 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-ink-soft"
                  >
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-surface-muted/50"
                  >
                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid h-10 w-10 place-items-center rounded-full text-sm font-bold",
                            AVATAR_COLORS[user.avatarColor]
                          )}
                        >
                          {user.initials}
                        </span>
                        <div>
                          <p className="font-bold text-ink">{user.name}</p>
                          <p className="text-xs text-ink-soft">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <RoleBadge role={user.role} />
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusIndicator status={user.status} />
                    </td>

                    {/* Last access */}
                    <td className="px-5 py-4 text-ink-soft">
                      {user.lastAccess}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <button
                        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
                        title="Editar usuário"
                        aria-label={`Editar ${user.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
