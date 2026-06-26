import { type ReactNode, type ElementType } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ElementType;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "Nenhum resultado encontrado",
  description = "Tente ajustar os filtros ou crie um novo item.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 text-center",
        className
      )}
    >
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface-subtle text-ink-soft">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-base font-extrabold text-ink">{title}</h3>
      <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
