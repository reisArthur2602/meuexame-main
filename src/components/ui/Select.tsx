import { forwardRef, type SelectHTMLAttributes } from "react";
import { CircleAlert, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      placeholder,
      options,
      className,
      id,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="block w-full">
        {label && (
          <label
            htmlFor={selectId}
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
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              "w-full appearance-none rounded-xl border bg-surface-muted px-4 py-3 pr-10 text-sm text-ink outline-none transition",
              disabled
                ? "cursor-not-allowed border-border bg-surface-subtle text-ink-soft"
                : hasError
                  ? "border-rose-300 bg-rose-50 text-rose-900 ring-4 ring-rose-50"
                  : "border-border focus:border-brand-500 focus:bg-surface focus:ring-4 focus:ring-brand-100",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
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
Select.displayName = "Select";

export { Select };
