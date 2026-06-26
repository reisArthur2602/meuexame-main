import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de privacidade — MeuExame",
  description:
    "Saiba como tratamos os dados dos pacientes na plataforma MeuExame.",
};

const SECTIONS = [
  {
    title: "1. Dados utilizados",
    body: "O portal utiliza CPF e protocolo exclusivamente para localizar o exame solicitado. Esses dados são processados de forma restrita e não são exibidos publicamente.",
  },
  {
    title: "2. Finalidade",
    body: "As informações são utilizadas para validar a identidade do paciente, disponibilizar o documento correto e manter registros de segurança do acesso.",
  },
  {
    title: "3. Segurança",
    body: "Os documentos não ficam disponíveis por links públicos. O acesso depende da combinação correta das informações fornecidas pela clínica.",
  },
  {
    title: "4. Compartilhamento",
    body: "Os dados não são vendidos ou utilizados para publicidade. O compartilhamento ocorre apenas quando necessário para a prestação do serviço ou cumprimento de obrigação legal.",
  },
  {
    title: "5. Contato",
    body: "Para dúvidas relacionadas à privacidade ou ao tratamento de dados, entre em contato com a clínica pelos canais disponíveis na página de ajuda.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
      <div className="rounded-4xl border border-border bg-surface p-7 shadow-card md:p-10">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <ShieldCheck className="h-7 w-7" />
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink">
          Política de privacidade
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          Última atualização: 24 de junho de 2026
        </p>

        <div className="mt-8 space-y-8 text-sm leading-7 text-ink-muted">
          {SECTIONS.map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-lg font-extrabold text-ink">{title}</h2>
              <p className="mt-2">{body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
