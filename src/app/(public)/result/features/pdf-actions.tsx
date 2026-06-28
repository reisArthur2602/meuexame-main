"use client";

import { Eye, Download, FileText } from "lucide-react";

type PdfActionsProps = {
  filename: string;
  fileSize: string;
  downloadUrl: string;
};

export const PdfActions = ({ filename, fileSize, downloadUrl }: PdfActionsProps) => {
  const viewUrl = `${downloadUrl}&mode=view`;

  return (
    <aside className="group relative overflow-hidden rounded-3xl border border-border bg-linear-to-b from-surface to-surface-muted p-5 shadow-card transition hover:border-brand-200 hover:shadow-soft">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-100/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative mx-auto grid h-28 w-24 place-items-center rounded-xl border border-border bg-surface shadow-sm transition-transform duration-300 group-hover:scale-105">
        <FileText className="h-10 w-10 text-rose-500" strokeWidth={1.5} />
        <span className="absolute -bottom-2 rounded-md bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          PDF
        </span>
      </div>

      <p className="relative mt-5 truncate text-center text-sm font-bold text-ink" title={filename}>
        {filename}
      </p>
      <p className="relative mt-1 text-center text-xs text-ink-soft">PDF · {fileSize}</p>

      <div className="relative mt-5 grid gap-3">
        <a
          href={viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-brand-700/20 transition hover:-translate-y-0.5 hover:bg-brand-800"
        >
          <Eye className="h-4 w-4" />
          Visualizar PDF
        </a>
        <a
          href={downloadUrl}
          download={filename}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-ink-muted transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
        >
          <Download className="h-4 w-4" />
          Baixar exame
        </a>
      </div>
    </aside>
  );
};
