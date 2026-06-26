import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TableColumn<T extends object = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}

export interface TableProps<T extends object = Record<string, unknown>> {
  columns: TableColumn<T>[];
  rows: T[];
  keyField?: keyof T;
  onRowClick?: (row: T) => void;
  emptyState?: ReactNode;
  className?: string;
}

const alignClass = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function Table<T extends object>({
  columns,
  rows,
  keyField,
  onRowClick,
  emptyState,
  className,
}: TableProps<T>) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full text-left">
        <thead className="bg-surface-muted text-xs font-bold uppercase tracking-wide text-ink-soft">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-5 py-3",
                  alignClass[col.align ?? "left"],
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                {emptyState ?? (
                  <div className="py-12 text-center text-sm text-ink-soft">
                    Nenhum resultado encontrado.
                  </div>
                )}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => {
              const key = keyField
                ? String((row as Record<string, unknown>)[keyField as string])
                : i;
              return (
                <tr
                  key={key}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    onRowClick &&
                      "cursor-pointer hover:bg-surface-muted transition-colors"
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-5 py-4",
                        alignClass[col.align ?? "left"],
                        col.className
                      )}
                    >
                      {col.render
                        ? col.render(row)
                        : ((row as Record<string, unknown>)[col.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
