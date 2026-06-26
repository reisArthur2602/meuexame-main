import { type ElementType } from "react";
import { ExamStatusBadge, type ExamStatus } from "./ExamStatusBadge";
import { cn } from "@/lib/utils";

interface ExamSummaryCardProps {
  protocol: string;
  patientName: string;
  patientCpf?: string;
  examType: string;
  status: ExamStatus;
  uploadedAt: string;
  icon?: ElementType;
  onClick?: () => void;
  className?: string;
}

export function ExamSummaryCard({
  protocol,
  patientName,
  patientCpf,
  examType,
  status,
  uploadedAt,
  icon: Icon,
  onClick,
  className,
}: ExamSummaryCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-border bg-surface p-5 shadow-card transition-shadow",
        onClick && "cursor-pointer hover:shadow-soft",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <ExamStatusBadge status={status} />
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-ink-soft">{protocol}</p>
        <h3 className="mt-1 text-base font-extrabold text-ink">{patientName}</h3>
        {patientCpf && (
          <p className="text-xs text-ink-soft">{patientCpf}</p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-xs text-ink-soft">{examType}</span>
        <span className="text-xs text-ink-soft">{uploadedAt}</span>
      </div>
    </article>
  );
}
