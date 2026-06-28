import { Badge, type BadgeVariant } from "@/components/ui/badge";

export type ExamStatus = "disponivel" | "bloqueado" | "pendente" | "processando" | "arquivado";

const statusConfig: Record<
  ExamStatus,
  { label: string; variant: BadgeVariant }
> = {
  disponivel: { label: "Disponível", variant: "positive" },
  bloqueado: { label: "Bloqueado", variant: "warning" },
  pendente: { label: "Pendente", variant: "neutral" },
  processando: { label: "Processando", variant: "info" },
  arquivado: { label: "Arquivado", variant: "neutral" },
};

interface ExamStatusBadgeProps {
  status: ExamStatus;
  dot?: boolean;
  className?: string;
}

export function ExamStatusBadge({
  status,
  dot = false,
  className,
}: ExamStatusBadgeProps) {
  const { label, variant } = statusConfig[status];
  return (
    <Badge variant={variant} dot={dot} className={className}>
      {label}
    </Badge>
  );
}
