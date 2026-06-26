"use client";

import { Eye, Download } from "lucide-react";

type PdfActionsProps = {
  filename: string;
  fileSize: string;
};

export function PdfActions({ filename, fileSize }: PdfActionsProps) {
  return (
    <aside className="rounded-3xl border border-border bg-surface-muted p-5">
      {/* PDF preview thumb */}
      <div className="mx-auto grid h-28 w-24 place-items-center rounded-xl border border-border bg-surface shadow-sm">
        <svg
          className="h-10 w-10 text-rose-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>

      <p className="mt-4 text-center text-sm font-bold text-ink">{filename}</p>
      <p className="mt-1 text-center text-xs text-ink-soft">
        PDF · {fileSize}
      </p>

      <div className="mt-5 grid gap-3">
        <button
          onClick={() => alert("Visualização do PDF simulada.")}
          className="flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800"
        >
          <Eye className="h-4 w-4" />
          Visualizar PDF
        </button>
        <button
          onClick={() => alert("Download iniciado (simulação).")}
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-bold text-ink-muted transition-colors hover:border-brand-300 hover:text-brand-700"
        >
          <Download className="h-4 w-4" />
          Baixar exame
        </button>
      </div>
    </aside>
  );
}
