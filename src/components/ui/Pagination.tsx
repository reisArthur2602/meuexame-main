import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  className,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const pages = getPageNumbers(page, totalPages);

  const start = pageSize ? (page - 1) * pageSize + 1 : undefined;
  const end = pageSize ? Math.min(page * pageSize, totalItems ?? 0) : undefined;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 text-sm",
        className
      )}
    >
      {totalItems !== undefined && pageSize ? (
        <p className="text-ink-soft">
          Mostrando <span className="font-semibold text-ink">{start}–{end}</span> de{" "}
          <span className="font-semibold text-ink">{totalItems.toLocaleString("pt-BR")}</span>{" "}
          resultados
        </p>
      ) : (
        <span />
      )}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          className={cn(
            "rounded-lg border border-border px-3 py-2 font-semibold transition-colors",
            canPrev
              ? "text-ink-muted hover:bg-surface-subtle"
              : "cursor-not-allowed text-ink-soft"
          )}
        >
          Anterior
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="px-2 py-2 text-ink-soft select-none"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={cn(
                "h-9 min-w-[36px] rounded-lg border px-3 py-2 font-semibold transition-colors",
                p === page
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-border text-ink-muted hover:bg-surface-subtle"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          className={cn(
            "rounded-lg border border-border px-3 py-2 font-semibold transition-colors",
            canNext
              ? "text-ink-muted hover:bg-surface-subtle"
              : "cursor-not-allowed text-ink-soft"
          )}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

function getPageNumbers(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}
