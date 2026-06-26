import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer items-start gap-3",
          props.disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong text-brand-700 transition focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          {...props}
        />
        {(label || description) && (
          <span className="min-w-0 flex-1">
            {label && (
              <span className="block text-sm font-semibold text-ink">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs text-ink-soft">{description}</span>
            )}
            {error && (
              <span className="block text-xs font-semibold text-negative">
                {error}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
