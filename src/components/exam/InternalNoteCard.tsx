import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

interface InternalNoteCardProps {
  note: string;
  author?: string;
  timestamp?: string;
  onEdit?: () => void;
  className?: string;
}

export function InternalNoteCard({
  note,
  author,
  timestamp,
  onEdit,
  className,
}: InternalNoteCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-5 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-ink">Observação interna</h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="grid h-8 w-8 place-items-center rounded-lg text-ink-soft transition-colors hover:bg-surface-subtle hover:text-ink"
            aria-label="Editar observação"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-soft">{note}</p>
      {(author || timestamp) && (
        <p className="mt-3 text-xs text-ink-soft border-t border-border pt-3">
          {author && <span className="font-semibold">{author}</span>}
          {author && timestamp && " · "}
          {timestamp}
        </p>
      )}
    </div>
  );
}
