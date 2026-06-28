"use client";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FileText, Save, UploadCloud, UserRound, X } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { maskCpf } from "@/helpers/mask-cpf";
import { maskPhone } from "@/helpers/format-phone";
import { createExamSchema, type CreateExamInput } from "@/schemas/exam";
import { createExam } from "../actions/create-exam";

export const NewExamForm = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateExamInput>({
    resolver: zodResolver(createExamSchema),
    defaultValues: { publishNow: true },
  });

  const mutation = useMutation({
    mutationFn: createExam,
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        router.push("/exams");
      } else {
        toast.error(data.message);
      }
    },
    onError() {
      toast.error("Erro inesperado. Tente novamente.");
    },
  });

  const acceptFile = (f: File) => {
    if (f.type !== "application/pdf") {
      setFileError("Somente arquivos PDF são aceitos.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      setFileError("O arquivo não pode ultrapassar 20 MB.");
      return;
    }
    setFileError("");
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) acceptFile(dropped);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (picked) acceptFile(picked);
  };

  const onSubmit = handleSubmit((values) => {
    if (!file) {
      setFileError("Adicione o arquivo PDF do exame.");
      return;
    }

    const fd = new FormData();
    fd.append("patientName", values.patientName);
    fd.append("patientCpf", values.patientCpf.replace(/\D/g, ""));
    if (values.patientPhone) fd.append("patientPhone", values.patientPhone.replace(/\D/g, ""));
    fd.append("protocol", values.protocol);
    fd.append("publishNow", String(values.publishNow ?? true));
    fd.append("file", file);

    mutation.mutate(fd);
  });

  return (
    <form onSubmit={onSubmit} className="mt-7 space-y-6">

      {/* Dados do paciente */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <UserRound className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-ink">Dados do paciente</h3>
            <p className="text-xs text-ink-soft">Informações usadas para localizar o exame.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-5">
          <Input
            label="Nome completo"
            placeholder="Nome do paciente"
            error={errors.patientName?.message}
            {...register("patientName")}
          />

          <Controller
            name="patientCpf"
            control={control}
            render={({ field }) => (
              <Input
                label="CPF"
                placeholder="000.000.000-00"
                error={errors.patientCpf?.message}
                value={maskCpf(field.value || "")}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                inputMode="numeric"
              />
            )}
          />

          <Controller
            name="patientPhone"
            control={control}
            render={({ field }) => (
              <Input
                label="Telefone (opcional)"
                placeholder="(21) 97514-0550"
                error={errors.patientPhone?.message}
                value={maskPhone(field.value || "")}
                onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                inputMode="numeric"
              />
            )}
          />

          <Input
            label="Protocolo"
            placeholder="EXM-2026-000000"
            className="uppercase"
            error={errors.protocol?.message}
            {...register("protocol")}
          />
        </div>
      </section>

      {/* Arquivo do exame */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-ink">Arquivo do exame</h3>
            <p className="text-xs text-ink-soft">Somente arquivos PDF, com até 20 MB.</p>
          </div>
        </div>

        <div className="mt-6">
          {file ? (
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface-muted p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-surface text-rose-500 shadow-sm">
                <FileText className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{file.name}</p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  {(file.size / 1024 / 1024).toFixed(1)} MB · PDF
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setFile(null); setFileError(""); }}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink-soft transition-colors hover:text-negative"
                aria-label="Remover arquivo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={cn(
                "cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
                isDragOver
                  ? "border-brand-400 bg-brand-50"
                  : "border-border bg-surface-muted hover:border-brand-300 hover:bg-brand-50/30"
              )}
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface text-brand-700 shadow-sm">
                <UploadCloud className="h-7 w-7" />
              </span>
              <p className="mt-4 font-bold text-ink">Arraste o PDF ou clique para selecionar</p>
              <p className="mt-2 text-sm text-ink-soft">O arquivo será validado antes do envio.</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileInput}
          />

          {fileError && (
            <p className="mt-3 text-xs font-semibold text-negative">{fileError}</p>
          )}
        </div>
      </section>

      {/* Publicar imediatamente */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-card">
        <Checkbox
          label="Disponibilizar imediatamente"
          description="O paciente poderá acessar assim que o cadastro for concluído."
          {...register("publishNow")}
        />
      </section>

      {/* Ações */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/exams")}
          disabled={mutation.isPending}
        >
          Cancelar
        </Button>
        <Button type="submit" loading={mutation.isPending}>
          <Save className="h-4 w-4" />
          Salvar exame
        </Button>
      </div>

      {mutation.isError && (
        <Alert variant="negative" title="Erro ao salvar">
          Ocorreu um erro inesperado. Tente novamente.
        </Alert>
      )}
    </form>
  );
};
