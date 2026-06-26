import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive"
  | "dark";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-white shadow-lg shadow-brand-700/20 hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2",
  secondary:
    "border border-border bg-surface text-ink-muted hover:border-brand-300 hover:text-brand-700 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  ghost:
    "text-ink-muted hover:bg-surface-subtle hover:text-ink focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  destructive:
    "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2",
  dark: "bg-slate-950 text-white hover:bg-brand-800 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "rounded-lg px-3 py-2 text-xs",
  md: "rounded-xl px-4 py-3 text-sm",
  lg: "rounded-2xl px-6 py-4 text-base",
  icon: "grid h-11 w-11 place-items-center rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold outline-none transition-colors",
          sizeClasses[size],
          disabled && !loading
            ? "cursor-not-allowed bg-surface-subtle text-ink-soft shadow-none"
            : variantClasses[variant],
          loading && "cursor-wait",
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
