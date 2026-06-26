"use client";

import { useSidebar } from "@/contexts/SidebarContext";
import type { CurrentUser } from "@/helpers/get-current-user";
import { signOut } from "@/helpers/sign-out";
import { cn } from "@/lib/utils";
import { FilePlus2, Files, HeartPulse, LayoutDashboard, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/overview", icon: LayoutDashboard, label: "Visão geral" },
  { href: "/exams", icon: Files, label: "Exames" },
  { href: "/exams/new", icon: FilePlus2, label: "Novo exame" },
  { href: "/users", icon: Users, label: "Usuários" },
];

const roleLabel: Record<CurrentUser["role"], string> = {
  ADMIN: "Administrador",
  STAFF: "Staff",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Sidebar({ user }: { user: CurrentUser }) {
  const pathname = usePathname();
  const { open, close } = useSidebar();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-surface p-5 transition-transform duration-200",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="px-2">
        <Link href="/overview" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white shadow-lg shadow-brand-700/20">
            <HeartPulse className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-base font-extrabold tracking-tight text-ink">
              MeuExame
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-ink-soft">
              Centro Clínico
            </span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-7 flex-1 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.endsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={close}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-brand-700 text-white shadow-md shadow-brand-700/20"
                  : "text-ink-muted hover:bg-surface-subtle hover:text-ink"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-white" : "text-ink-soft"
                )}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
            {getInitials(user.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-ink">{user.name}</p>
            <p className="text-xs text-ink-soft">{roleLabel[user.role]}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-ink-soft transition-colors hover:text-negative"
            title="Sair"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
