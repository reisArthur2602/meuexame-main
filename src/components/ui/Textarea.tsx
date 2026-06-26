import { forwardRef, type TextareaHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, disabled, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="block w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "mb-2 block text-sm font-bold",
              hasError ? "text-negative" : "text-ink",
              disabled && "text-ink-soft"
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          rows={props.rows ?? 4}
          className={cn(
            "w-full resize-none rounded-xl border bg-surface-muted px-4 py-3 text-sm text-ink outline-none transition",
            disabled
              ? "cursor-not-allowed border-border bg-surface-subtle text-ink-soft"
              : hasError
                ? "border-rose-300 bg-rose-50 text-rose-900 ring-4 ring-rose-50"
                : "border-border focus:border-brand-500 focus:bg-surface focus:ring-4 focus:ring-brand-100",
            className
          )}
          {...props}
        />
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
Textarea.displayName = "Textarea";

export { Textarea };
