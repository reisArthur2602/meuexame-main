import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  size?: "sm" | "md";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, icon, size = "md", className, id, disabled, ...props },
    ref
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="block w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "mb-2 block text-sm font-bold",
              hasError ? "text-negative" : "text-ink",
              disabled && "text-ink-soft"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full rounded-xl border bg-surface-muted text-sm text-ink outline-none transition",
              size === "md" ? "py-3" : "py-2",
              icon ? "pl-11 pr-4" : "px-4",
              disabled
                ? "cursor-not-allowed border-border bg-surface-subtle text-ink-soft"
                : hasError
                  ? "border-rose-300 bg-rose-50 text-rose-900 ring-4 ring-rose-50 focus:ring-rose-100"
                  : "border-border focus:border-brand-500 focus:bg-surface focus:ring-4 focus:ring-brand-100",
              className
            )}
            {...props}
          />
        </div>
        {hasError && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-negative">
            <CircleAlert className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        )}
        {hint && !hasError && (
          <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
