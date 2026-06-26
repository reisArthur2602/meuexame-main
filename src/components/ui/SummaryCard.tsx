import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon?: ElementType;
  iconClass?: string;
  badge?: ReactNode;
  trend?: ReactNode;
  className?: string;
}

export function SummaryCard({
  label,
  value,
  icon: Icon,
  iconClass = "bg-brand-50 text-brand-700",
  badge,
  trend,
  className,
}: SummaryCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-border bg-surface p-5 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {Icon && (
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-xl",
              iconClass
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
        )}
        {badge && <span>{badge}</span>}
        {trend && !badge && <span>{trend}</span>}
      </div>
      <p className="mt-5 text-3xl font-extrabold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </article>
  );
}
