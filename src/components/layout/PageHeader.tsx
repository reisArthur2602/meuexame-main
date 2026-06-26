"use client";

import { type ReactNode } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: PageHeaderProps) {
  const { toggle } = useSidebar();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-border/80 bg-surface-muted/90 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center justify-between px-5 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-ink-muted transition-colors hover:text-ink lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-ink md:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="hidden text-sm text-ink-soft sm:block">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
