"use client";

import { useState } from "react";
import {
  Files,
  FilePlus2,
  Download,
  Eye,
  Inbox,
  Ban,
  Link,
  Trash2,
  MoreHorizontal,
  Bell,
} from "lucide-react";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Alert } from "@/components/ui/Alert";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card } from "@/components/ui/Card";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { Drawer } from "@/components/ui/Drawer";
import {
  DropdownMenu,
  DropdownItem,
  DropdownSeparator,
} from "@/components/ui/DropdownMenu";
import {
  EmptyState,
} from "@/components/ui/EmptyState";
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
} from "@/components/ui/Skeleton";

import { ExamStatusBadge } from "@/components/exam/ExamStatusBadge";
import { MovementTimeline } from "@/components/exam/MovementTimeline";
import { DocumentCard } from "@/components/exam/DocumentCard";
import { InternalNoteCard } from "@/components/exam/InternalNoteCard";

// ─── Helpers ────────────────────────────────────────────────────────────────

function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">
        {index}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>
      )}
    </div>
  );
}

function DemoBox({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && (
        <p className="mb-3 text-sm font-extrabold text-ink">{label}</p>
      )}
      {children}
    </div>
  );
}

// ─── Color swatches ─────────────────────────────────────────────────────────

const brandSwatches = [
  { shade: "50", hex: "#F0FDFA", bg: "bg-brand-50", ring: true },
  { shade: "100", hex: "#CCFBF1", bg: "bg-brand-100" },
  { shade: "200", hex: "#99F6E4", bg: "bg-brand-200" },
  { shade: "300", hex: "#5EEAD4", bg: "bg-brand-300" },
  { shade: "400", hex: "#2DD4BF", bg: "bg-brand-400" },
  { shade: "500", hex: "#14B8A6", bg: "bg-brand-500" },
  { shade: "600", hex: "#0D9488", bg: "bg-brand-600" },
  { shade: "700", hex: "#0F766E", bg: "bg-brand-700" },
  { shade: "800", hex: "#115E59", bg: "bg-brand-800" },
  { shade: "900", hex: "#134E4A", bg: "bg-brand-900" },
];

const slateSwatches = [
  { shade: "50", hex: "#F8FAFC", bg: "bg-slate-50", ring: true },
  { shade: "100", hex: "#F1F5F9", bg: "bg-slate-100" },
  { shade: "200", hex: "#E2E8F0", bg: "bg-slate-200" },
  { shade: "300", hex: "#CBD5E1", bg: "bg-slate-300" },
  { shade: "400", hex: "#94A3B8", bg: "bg-slate-400" },
  { shade: "500", hex: "#64748B", bg: "bg-slate-500" },
  { shade: "600", hex: "#475569", bg: "bg-slate-600" },
  { shade: "700", hex: "#334155", bg: "bg-slate-700" },
  { shade: "800", hex: "#1E293B", bg: "bg-slate-800" },
  { shade: "900", hex: "#0F172A", bg: "bg-slate-900" },
];

// ─── Table demo data ─────────────────────────────────────────────────────────

const tableRows = [
  { id: "1", patient: "Mariana Oliveira", protocol: "EXM-2026-001284", status: "Disponível", statusVariant: "positive" },
  { id: "2", patient: "Carlos Henrique", protocol: "EXM-2026-001283", status: "Bloqueado", statusVariant: "warning" },
  { id: "3", patient: "Luciana Martins", protocol: "EXM-2026-001282", status: "Disponível", statusVariant: "positive" },
];

const tableColumns = [
  { key: "patient", header: "Paciente", render: (r: Record<string, unknown>) => <span className="font-bold">{r.patient as string}</span> },
  { key: "protocol", header: "Protocolo", render: (r: Record<string, unknown>) => <span className="text-ink-soft">{r.protocol as string}</span> },
  {
    key: "status", header: "Status",
    render: (r: Record<string, unknown>) => (
      <Badge variant={r.statusVariant as "positive" | "warning"}>{r.status as string}</Badge>
    )
  },
  {
    key: "actions", header: "Ação", align: "right" as const,
    render: () => (
      <button className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-soft hover:text-brand-700">
        <Eye className="h-4 w-4" />
      </button>
    )
  },
];

// ─── Main page ───────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <AppLayout>
      <PageHeader
        title="Design System"
        subtitle="Tokens, componentes e padrões visuais do MeuExame."
        actions={
          <span className="rounded-xl border border-border bg-surface px-3 py-2 text-xs font-bold text-ink-soft">
            v1.0
          </span>
        }
      />

      <main className="p-5 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-14">

          {/* ── Hero ──────────────────────────────────────────────────── */}
          <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-soft md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
              <div>
                <h2 className="text-3xl font-extrabold tracking-[-.04em] md:text-5xl">
                  Uma linguagem visual clara, humana e segura.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  Tokens e componentes usados em todas as áreas do produto MeuExame.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">
                  Princípios
                </p>
                <div className="mt-4 grid gap-3 text-sm">
                  <span>✦ Clareza antes da decoração</span>
                  <span>✦ Alto contraste e leitura rápida</span>
                  <span>✦ Feedback visível para cada ação</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── 01 · Cores ────────────────────────────────────────────── */}
          <section>
            <SectionHeader
              index="01 · Foundations"
              title="Cores"
              subtitle="Paleta principal, neutros e cores semânticas de feedback."
            />

            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <h3 className="font-extrabold text-ink">Brand / Teal</h3>
                <div className="mt-5 grid grid-cols-5 gap-3">
                  {brandSwatches.map((s) => (
                    <div key={s.shade}>
                      <div
                        className={`h-16 rounded-xl ${s.bg}${s.ring ? " ring-1 ring-inset ring-border" : ""}`}
                      />
                      <p className="mt-2 text-xs font-bold text-ink">{s.shade}</p>
                      <p className="text-[11px] text-ink-soft">{s.hex}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-extrabold text-ink">Neutral / Slate</h3>
                <div className="mt-5 grid grid-cols-5 gap-3">
                  {slateSwatches.map((s) => (
                    <div key={s.shade}>
                      <div
                        className={`h-16 rounded-xl ${s.bg}${s.ring ? " ring-1 ring-inset ring-border" : ""}`}
                      />
                      <p className="mt-2 text-xs font-bold text-ink">{s.shade}</p>
                      <p className="text-[11px] text-ink-soft">{s.hex}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-emerald-200 bg-positive-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-positive">Positive</p>
                <p className="mt-2 font-extrabold text-emerald-900">#059669</p>
              </div>
              <div className="rounded-2xl border border-amber-200 bg-warning-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-warning">Warning</p>
                <p className="mt-2 font-extrabold text-amber-900">#D97706</p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-negative-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-negative">Negative</p>
                <p className="mt-2 font-extrabold text-rose-900">#E11D48</p>
              </div>
              <div className="rounded-2xl border border-blue-200 bg-info-soft p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-info">Info</p>
                <p className="mt-2 font-extrabold text-blue-900">#2563EB</p>
              </div>
            </div>
          </section>

          {/* ── 02 · Tipografia ───────────────────────────────────────── */}
          <section>
            <SectionHeader index="02 · Foundations" title="Tipografia" subtitle="Inter como família principal, 400–800." />
            <Card>
              <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
                <div className="rounded-2xl bg-slate-950 p-6 text-white">
                  <p className="text-6xl font-extrabold tracking-[-.06em]">Aa</p>
                  <p className="mt-4 font-bold">Inter</p>
                  <p className="mt-1 text-xs text-slate-400">UI Sans Serif</p>
                </div>
                <div className="space-y-6">
                  <div className="border-b border-border pb-5">
                    <p className="text-xs font-bold text-ink-soft">Display · 48 / 800</p>
                    <p className="mt-2 text-4xl font-extrabold tracking-[-.04em] md:text-5xl text-ink">Seus exames, sem complicação.</p>
                  </div>
                  <div className="border-b border-border pb-5">
                    <p className="text-xs font-bold text-ink-soft">Heading 1 · 30 / 800</p>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Detalhes do exame</p>
                  </div>
                  <div className="border-b border-border pb-5">
                    <p className="text-xs font-bold text-ink-soft">Heading 2 · 24 / 800</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight text-ink">Exames cadastrados</p>
                  </div>
                  <div className="border-b border-border pb-5">
                    <p className="text-xs font-bold text-ink-soft">Body · 16 / 400</p>
                    <p className="mt-2 leading-7 text-ink-muted">Texto usado em descrições, explicações e conteúdo informativo.</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink-soft">Label · 14 / 700</p>
                    <p className="mt-2 text-sm font-bold text-ink">CPF do paciente</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* ── 03 · Sombras e raios ──────────────────────────────────── */}
          <section>
            <SectionHeader index="03 · Foundations" title="Sombras e raios" />
            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <h3 className="font-extrabold text-ink">Border radius</h3>
                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    { label: "rounded-lg · 8px", cls: "rounded-lg" },
                    { label: "rounded-xl · 12px", cls: "rounded-xl" },
                    { label: "rounded-2xl · 16px", cls: "rounded-2xl" },
                    { label: "rounded-3xl · 24px", cls: "rounded-3xl" },
                  ].map(({ label, cls }) => (
                    <div key={cls} className={`${cls} h-20 bg-brand-100 p-3`}>
                      <p className="text-xs font-bold text-brand-800">{label}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <h3 className="font-extrabold text-ink">Shadows</h3>
                <div className="mt-5 space-y-4">
                  <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
                    <p className="text-xs font-bold text-ink">shadow-sm</p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
                    <p className="text-xs font-bold text-ink">shadow-card</p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface p-4 shadow-soft">
                    <p className="text-xs font-bold text-ink">shadow-soft</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ── 04 · Buttons ──────────────────────────────────────────── */}
          <section>
            <SectionHeader
              index="04 · Components"
              title="Buttons"
              subtitle="Use textos curtos, verbos de ação e ícones somente quando melhorarem a leitura."
            />
            <Card>
              <div className="grid gap-8 xl:grid-cols-2">
                <DemoBox label="Variantes">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">
                      <FilePlus2 className="h-4 w-4" /> Primário
                    </Button>
                    <Button variant="dark">
                      Escuro <Files className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary">Secundário</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4" /> Destrutivo
                    </Button>
                    <Button disabled>Desabilitado</Button>
                    <Button loading>Carregando</Button>
                  </div>
                </DemoBox>
                <DemoBox label="Tamanhos">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon">
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                </DemoBox>
              </div>
            </Card>
          </section>

          {/* ── 05 · Inputs ───────────────────────────────────────────── */}
          <section>
            <SectionHeader
              index="05 · Components"
              title="Inputs, selects e campos"
              subtitle="Altura padrão de 48px, labels claros e estados de erro com texto."
            />
            <Card>
              <div className="grid gap-6 md:grid-cols-2">
                <Input label="Input padrão" placeholder="Digite uma informação" />
                <Input
                  label="Input com ícone"
                  placeholder="Buscar exame..."
                  icon={<Eye className="h-4 w-4" />}
                />
                <Select
                  label="Select"
                  placeholder="Selecione uma opção"
                  options={[
                    { value: "lab", label: "Resultado laboratorial" },
                    { value: "img", label: "Imagem" },
                    { value: "tc", label: "Tomografia" },
                  ]}
                />
                <Input label="Data" type="date" />
                <Input
                  label="Estado de erro"
                  defaultValue="CPF inválido"
                  error="Informe um CPF válido."
                />
                <Input
                  label="Desabilitado"
                  defaultValue="Campo não editável"
                  disabled
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Textarea"
                    placeholder="Digite uma observação..."
                  />
                </div>
              </div>
              <div className="mt-7 flex flex-wrap gap-6 border-t border-border pt-6">
                <Checkbox label="Checkbox selecionado" defaultChecked />
                <Checkbox label="Checkbox padrão" />
                <Checkbox label="Checkbox desabilitado" disabled />
              </div>
            </Card>
          </section>

          {/* ── 06 · Badges ───────────────────────────────────────────── */}
          <section>
            <SectionHeader index="06 · Components" title="Badges e estados de exame" />
            <div className="grid gap-6 xl:grid-cols-2">
              <Card>
                <h3 className="font-extrabold text-ink">Badges genéricos</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Badge variant="positive">Disponível</Badge>
                  <Badge variant="warning">Bloqueado</Badge>
                  <Badge variant="negative">Erro</Badge>
                  <Badge variant="info">Informativo</Badge>
                  <Badge variant="neutral">Neutro</Badge>
                  <Badge variant="brand">Brand</Badge>
                  <Badge variant="positive" dot>Com ponto</Badge>
                </div>
              </Card>
              <Card>
                <h3 className="font-extrabold text-ink">Status de exame</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ExamStatusBadge status="disponivel" />
                  <ExamStatusBadge status="bloqueado" />
                  <ExamStatusBadge status="pendente" />
                  <ExamStatusBadge status="processando" />
                  <ExamStatusBadge status="disponivel" dot />
                </div>
              </Card>
            </div>
          </section>

          {/* ── 07 · Alerts ───────────────────────────────────────────── */}
          <section>
            <SectionHeader index="07 · Components" title="Alerts" />
            <Card>
              <div className="space-y-3">
                <Alert variant="positive" title="Sucesso">
                  Exame cadastrado e disponibilizado com sucesso.
                </Alert>
                <Alert variant="warning" title="Atenção">
                  Revise os dados antes de continuar.
                </Alert>
                <Alert variant="negative" title="Erro">
                  Não foi possível concluir a operação.
                </Alert>
                {alertVisible ? (
                  <Alert
                    variant="info"
                    title="Informação"
                    onDismiss={() => setAlertVisible(false)}
                  >
                    Este alert pode ser fechado pelo usuário.
                  </Alert>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setAlertVisible(true)}
                  >
                    Mostrar alert novamente
                  </Button>
                )}
              </div>
            </Card>
          </section>

          {/* ── 08 · Cards ────────────────────────────────────────────── */}
          <section>
            <SectionHeader index="08 · Components" title="Cards" />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                label="Exames cadastrados"
                value="1.284"
                icon={Files}
                iconClass="bg-blue-50 text-blue-700"
                badge={<Badge variant="positive">+12%</Badge>}
              />
              <SummaryCard
                label="Uploads realizados"
                value="38"
                icon={FilePlus2}
                iconClass="bg-positive-soft text-positive"
              />
              <SummaryCard
                label="Downloads no mês"
                value="842"
                icon={Download}
                iconClass="bg-violet-50 text-violet-700"
                badge={<Badge variant="positive">+8%</Badge>}
              />
              <SummaryCard
                label="Usuários ativos"
                value="12"
                icon={Bell}
                iconClass="bg-warning-soft text-warning"
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <Card>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-extrabold text-ink">Card informativo</p>
                    <p className="mt-2 text-sm leading-6 text-ink-muted">
                      Use para agrupar conteúdo relacionado.
                    </p>
                  </div>
                  <Bell className="h-5 w-5 shrink-0 text-ink-soft" />
                </div>
              </Card>
              <Card variant="dark">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-300">
                  Destaque
                </p>
                <p className="mt-3 text-xl font-extrabold">Card escuro</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Ideal para chamadas especiais.
                </p>
              </Card>
              <Card variant="brand">
                <p className="text-sm font-extrabold text-brand-900">
                  Card com contexto
                </p>
                <p className="mt-2 text-sm leading-6 text-brand-800">
                  Use fundos suaves para informações positivas.
                </p>
              </Card>
            </div>
          </section>

          {/* ── 09 · Tabelas ──────────────────────────────────────────── */}
          <section>
            <SectionHeader index="09 · Components" title="Tabela" />
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
              <div className="flex items-center justify-between border-b border-border p-5">
                <div>
                  <h3 className="font-extrabold text-ink">Últimos exames</h3>
                  <p className="mt-1 text-xs text-ink-soft">
                    Cabeçalho claro e ações alinhadas à direita.
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Ver todos
                </Button>
              </div>
              <Table columns={tableColumns} rows={tableRows} keyField="id" />
            </div>
          </section>

          {/* ── 10 · Paginação ────────────────────────────────────────── */}
          <section>
            <SectionHeader index="10 · Components" title="Paginação" />
            <Card>
              <Pagination
                page={paginationPage}
                totalPages={12}
                onPageChange={setPaginationPage}
                totalItems={120}
                pageSize={10}
              />
            </Card>
          </section>

          {/* ── 11 · Empty State ──────────────────────────────────────── */}
          <section>
            <SectionHeader index="11 · Components" title="Estado vazio" />
            <Card>
              <EmptyState
                icon={Inbox}
                title="Nenhum exame encontrado"
                description="Tente ajustar os filtros ou cadastre um novo exame para começar."
                action={
                  <Button>
                    <FilePlus2 className="h-4 w-4" /> Cadastrar exame
                  </Button>
                }
              />
            </Card>
          </section>

          {/* ── 12 · Skeletons ────────────────────────────────────────── */}
          <section>
            <SectionHeader index="12 · Components" title="Skeletons" />
            <div className="grid gap-5 md:grid-cols-3">
              <Card>
                <h3 className="mb-4 font-extrabold text-ink">Texto</h3>
                <SkeletonText lines={4} />
              </Card>
              <Card>
                <h3 className="mb-4 font-extrabold text-ink">Formas</h3>
                <div className="flex items-center gap-3">
                  <Skeleton circle className="h-12 w-12 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="mt-4 h-24 w-full" />
              </Card>
              <SkeletonCard />
            </div>
          </section>

          {/* ── 13 · Tabs ─────────────────────────────────────────────── */}
          <section>
            <SectionHeader index="13 · Components" title="Tabs" />
            <Card>
              <Tabs defaultValue="dados">
                <TabsList>
                  <TabsTrigger value="dados">Dados do paciente</TabsTrigger>
                  <TabsTrigger value="arquivo">Arquivo</TabsTrigger>
                  <TabsTrigger value="historico">Histórico</TabsTrigger>
                </TabsList>
                <TabsContent value="dados">
                  <p className="text-sm text-ink-muted">
                    Informações cadastrais do paciente aparecem aqui.
                  </p>
                </TabsContent>
                <TabsContent value="arquivo">
                  <DocumentCard
                    filename="resultado-mariana-oliveira.pdf"
                    size="2,4 MB"
                    mimeType="PDF"
                    onView={() => {}}
                    onDownload={() => {}}
                  />
                </TabsContent>
                <TabsContent value="historico">
                  <MovementTimeline
                    events={[
                      {
                        id: "1",
                        title: "Exame disponibilizado",
                        actor: "Anderson Costa",
                        timestamp: "Hoje às 20:43",
                        active: true,
                      },
                      {
                        id: "2",
                        title: "Arquivo enviado",
                        actor: "Anderson Costa",
                        timestamp: "Hoje às 20:42",
                      },
                      {
                        id: "3",
                        title: "Cadastro criado",
                        actor: "Anderson Costa",
                        timestamp: "Hoje às 20:41",
                      },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </section>

          {/* ── 14 · Drawer ───────────────────────────────────────────── */}
          <section>
            <SectionHeader index="14 · Components" title="Drawer e DropdownMenu" />
            <Card>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setDrawerOpen(true)}>
                  Abrir Drawer
                </Button>

                <DropdownMenu
                  trigger={
                    <Button variant="secondary">
                      <MoreHorizontal className="h-4 w-4" /> Mais ações
                    </Button>
                  }
                >
                  <DropdownItem icon={<Eye className="h-4 w-4" />}>
                    Visualizar
                  </DropdownItem>
                  <DropdownItem icon={<Link className="h-4 w-4" />}>
                    Copiar referência
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem
                    variant="warning"
                    icon={<Ban className="h-4 w-4" />}
                  >
                    Bloquear acesso
                  </DropdownItem>
                  <DropdownItem
                    variant="destructive"
                    icon={<Trash2 className="h-4 w-4" />}
                  >
                    Excluir exame
                  </DropdownItem>
                </DropdownMenu>
              </div>
            </Card>
          </section>

          {/* ── 15 · Notas e documentos ───────────────────────────────── */}
          <section>
            <SectionHeader index="15 · Domain Components" title="Componentes de exame" />
            <div className="grid gap-5 lg:grid-cols-2">
              <InternalNoteCard
                note="Resultado revisado e liberado após conferência dos dados cadastrais do paciente."
                author="Anderson Costa"
                timestamp="Hoje às 20:43"
                onEdit={() => {}}
              />
              <DocumentCard
                filename="resultado-mariana-oliveira.pdf"
                size="2,4 MB"
                mimeType="PDF"
                onView={() => {}}
                onDownload={() => {}}
                onReplace={() => {}}
              />
            </div>
          </section>

          {/* ── Guidelines ────────────────────────────────────────────── */}
          <section className="rounded-[2rem] border border-brand-200 bg-brand-50 p-7 md:p-9">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-brand-700">
                  Boas práticas
                </p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-brand-900">
                  Regras rápidas de consistência
                </h2>
              </div>
              <div className="grid gap-4 text-sm leading-6 text-brand-900">
                <p className="flex gap-3">
                  <span className="font-extrabold">01.</span>
                  Use apenas um botão primário por seção ou fluxo principal.
                </p>
                <p className="flex gap-3">
                  <span className="font-extrabold">02.</span>
                  Não dependa somente da cor para comunicar status.
                </p>
                <p className="flex gap-3">
                  <span className="font-extrabold">03.</span>
                  Campos obrigatórios devem ter validação próxima ao input.
                </p>
                <p className="flex gap-3">
                  <span className="font-extrabold">04.</span>
                  Prefira títulos objetivos e textos de apoio curtos.
                </p>
                <p className="flex gap-3">
                  <span className="font-extrabold">05.</span>
                  Mantenha o CPF mascarado fora das telas de edição.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Drawer demo */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Ações do exame"
        subtitle="Escolha uma ação para continuar."
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setDrawerOpen(false)}>Confirmar</Button>
          </div>
        }
      >
        <div className="space-y-2">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-warning hover:bg-warning-soft">
            <Ban className="h-4 w-4" /> Bloquear acesso
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-ink-muted hover:bg-surface-subtle">
            <Link className="h-4 w-4" /> Copiar referência
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-negative hover:bg-negative-soft">
            <Trash2 className="h-4 w-4" /> Excluir exame
          </button>
        </div>
      </Drawer>
    </AppLayout>
  );
}
