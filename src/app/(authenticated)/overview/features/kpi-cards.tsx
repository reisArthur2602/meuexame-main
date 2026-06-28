import { FileCheck, Files, UploadCloud, Users } from "lucide-react";
import { getKpis } from "../actions/get-overview-data";

export const KpiCards = async () => {
  const kpis = await getKpis();

  const cards = [
    {
      icon: Files,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-700",
      value: kpis.totalExams.toLocaleString("pt-BR"),
      label: "Exames cadastrados",
    },
    {
      icon: UploadCloud,
      iconBg: "bg-positive-soft",
      iconColor: "text-positive",
      value: kpis.todayExams.toLocaleString("pt-BR"),
      label: "Uploads realizados",
      badge: "Hoje",
    },
    {
      icon: FileCheck,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-700",
      value: kpis.availableExams.toLocaleString("pt-BR"),
      label: "Exames disponíveis",
    },
    {
      icon: Users,
      iconBg: "bg-warning-soft",
      iconColor: "text-warning",
      value: kpis.activeUsers.toLocaleString("pt-BR"),
      label: "Usuários ativos",
      badge: "Equipe",
    },
  ];

  return (
    <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ icon: Icon, iconBg, iconColor, value, label, badge }) => (
        <article
          key={label}
          className="rounded-2xl border border-border bg-surface p-5 shadow-card"
        >
          <div className="flex items-center justify-between">
            <span
              className={`grid h-10 w-10 place-items-center rounded-xl ${iconBg} ${iconColor}`}
            >
              <Icon className="h-5 w-5" />
            </span>
            {badge && (
              <span className="text-xs font-semibold text-ink-soft">{badge}</span>
            )}
          </div>
          <p className="mt-5 text-3xl font-extrabold text-ink">{value}</p>
          <p className="mt-1 text-sm text-ink-soft">{label}</p>
        </article>
      ))}
    </section>
  );
};
