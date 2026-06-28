"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserRound, Hash, ArrowRight, LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { maskCpf } from "@/helpers/mask-cpf";
import { lookupExamSchema, type LookupExamInput } from "@/schemas/exam";
import { lookupExam } from "../actions/lookup-exam";

export const ExamLookupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LookupExamInput>({
    resolver: zodResolver(lookupExamSchema),
  });

  const mutation = useMutation({
    mutationFn: (input: LookupExamInput) => lookupExam(input),
    onSuccess(data, variables) {
      if (data.success) {
        router.push(`/result?cpf=${variables.cpf}&protocol=${variables.protocol}`);
      } else {
        toast.error(data.message);
      }
    },
    onError() {
      toast.error("Erro inesperado. Tente novamente.");
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <div className="rounded-4xl border border-white bg-surface p-6 shadow-soft md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-700">
            Consulta online
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
            Localize seu exame
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Preencha os dados exatamente como informados no atendimento.
          </p>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <Hash className="h-6 w-6" />
        </span>
      </div>

      <form onSubmit={onSubmit} className="mt-7 space-y-5">
        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <Input
              label="CPF do paciente"
              placeholder="000.000.000-00"
              error={errors.cpf?.message}
              icon={<UserRound className="h-5 w-5" />}
              value={maskCpf(field.value || "")}
              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              inputMode="numeric"
            />
          )}
        />

        <Input
          label="Protocolo do exame"
          placeholder="Ex.: EXM-2026-001234"
          error={errors.protocol?.message}
          icon={<Hash className="h-5 w-5" />}
          className="uppercase placeholder:normal-case"
          {...register("protocol")}
        />

        <Button
          type="submit"
          variant="dark"
          size="lg"
          loading={mutation.isPending}
          className="w-full"
        >
          {!mutation.isPending && "Consultar exame"}
          {!mutation.isPending && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-5 flex items-start gap-2 rounded-xl bg-surface-muted p-3 text-xs leading-5 text-ink-soft">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-brand-700" />
        Seus dados são usados somente para localizar o documento e não ficam
        visíveis publicamente.
      </p>
    </div>
  );
};
