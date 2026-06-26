import { type ReactNode } from "react";
import {
  CheckCircle2,
  TriangleAlert,
  CircleX,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertVariant = "positive" | "warning" | "negative" | "info";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const config: Record<
  AlertVariant,
  {
    container: string;
    icon: typeof CheckCircle2;
    iconClass: string;
  }
> = {
  positive: {
    container:
      "border-emerald-200 bg-positive-soft text-emerald-900",
    icon: CheckCircle2,
    iconClass: "text-positive",
  },
  warning: {
    container: "border-amber-200 bg-warning-soft text-amber-900",
    icon: TriangleAlert,
    iconClass: "text-warning",
  },
  negative: {
    container: "border-rose-200 bg-negative-soft text-rose-900",
    icon: CircleX,
    iconClass: "text-negative",
  },
  info: {
    container: "border-blue-200 bg-info-soft text-blue-900",
    icon: Info,
    iconClass: "text-info",
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  const { container, icon: Icon, iconClass } = config[variant];

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border p-4 text-sm",
        container,
        className
      )}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconClass)} />
      <div className="flex-1 min-w-0">
        {title && <p className="font-bold">{title}</p>}
        <p className={cn("text-xs leading-5", title && "mt-1")}>{children}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
