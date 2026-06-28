import { FileText, Eye, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type DocumentCardProps = {
  filename: string;
  size?: string;
  mimeType?: string;
  onView?: () => void;
  onDownload?: () => void;
  onReplace?: () => void;
  className?: string;
};

export const DocumentCard = ({
  filename,
  size,
  mimeType = "PDF",
  onView,
  onDownload,
  onReplace,
  className,
}: DocumentCardProps) => (
  <div
    className={cn(
      "flex flex-col gap-4 rounded-2xl border border-border bg-surface-muted p-4 sm:flex-row sm:items-center",
      className
    )}
  >
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface text-rose-500 shadow-sm">
      <FileText className="h-6 w-6" />
    </span>

    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-bold text-ink">{filename}</p>
      <p className="mt-0.5 text-xs text-ink-soft">
        {size ? `${size} · ${mimeType}` : mimeType}
      </p>
    </div>

    <div className="flex shrink-0 gap-2">
      {onView && (
        <button
          onClick={onView}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-ink-soft transition-colors hover:text-brand-700"
          aria-label="Visualizar"
        >
          <Eye className="h-4 w-4" />
        </button>
      )}
      {onDownload && (
        <button
          onClick={onDownload}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-ink-soft transition-colors hover:text-brand-700"
          aria-label="Download"
        >
          <Download className="h-4 w-4" />
        </button>
      )}
      {onReplace && (
        <button
          onClick={onReplace}
          className="text-sm font-bold text-brand-700 transition-opacity hover:opacity-80"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      )}
    </div>
  </div>
);
