import type { Metadata } from "next";
import { LifeBuoy, Plus, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Central de ajuda — MeuExame",
  description:
    "Encontre respostas rápidas sobre acesso, protocolo e download dos exames.",
};

const FAQ = [
  {
    question: "Onde encontro o número do protocolo?",
    answer:
      "O protocolo é entregue no comprovante de atendimento e também pode ser enviado pela clínica por mensagem. Ele normalmente contém letras, números e hífens.",
  },
  {
    question: "Meu exame não foi localizado. O que devo fazer?",
    answer:
      "Confira se o CPF é o mesmo informado no atendimento e se o protocolo foi digitado corretamente. Alguns resultados podem levar algumas horas para serem liberados.",
  },
  {
    question: "Posso acessar pelo celular?",
    answer:
      "Sim. O portal foi desenvolvido para funcionar em celulares, tablets e computadores.",
  },
  {
    question: "O arquivo não abre no meu dispositivo.",
    answer:
      "Verifique se existe um leitor de PDF instalado. Você também pode baixar o documento e tentar abri-lo em outro navegador.",
  },
  {
    question: "Outra pessoa pode acessar meu exame?",
    answer:
      "Somente alguém que tenha acesso ao CPF e ao protocolo correto poderá realizar a consulta. Evite compartilhar essas informações.",
  },
];

export default function HelpPage() {
  return (
    <main>
      {/* ── Cabeçalho ─────────────────────────────────────────── */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center lg:px-8">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <LifeBuoy className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink">
            Como podemos ajudar?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-ink-soft">
            Encontre respostas rápidas para as dúvidas mais comuns sobre acesso,
            protocolo e download dos exames.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        <div className="grid gap-4">
          {FAQ.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
                {question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-subtle text-ink-soft transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-4 pr-10 text-sm leading-7 text-ink-soft">
                {answer}
              </p>
            </details>
          ))}
        </div>

        {/* ── CTA whatsapp ──────────────────────────────────────── */}
        <div className="mt-10 rounded-3xl bg-slate-950 p-7 text-white md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xl font-extrabold">Ainda precisa de ajuda?</p>
            <p className="mt-2 text-sm text-slate-300">
              Fale com nossa equipe de atendimento.
            </p>
          </div>
          <a
            href="https://wa.me/5521999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-brand-300 md:mt-0"
          >
            <MessageCircle className="h-4 w-4" />
            Falar no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
