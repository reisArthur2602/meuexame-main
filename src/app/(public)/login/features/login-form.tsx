"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, CircleAlert, Eye, EyeOff, Lock, UserRound } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginInput } from "@/schemas/auth";
import { signIn } from "../actions/sign-in";

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: (input: LoginInput) => signIn(input),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        router.push("/overview");
      } else {
        toast.error(data.message);
      }
    },
    onError() {
      toast.error("Erro inesperado. Tente novamente.");
    },
  });

  const onSubmit = (values: LoginInput) => mutation.mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
      <Input
        label="Nome de usuário"
        type="text"
        autoComplete="username"
        placeholder="admin"
        icon={<UserRound className="h-5 w-5" />}
        error={errors.username?.message}
        {...register("username")}
      />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-bold text-ink">Senha</label>
          <Link
            href="#"
            className="text-xs font-bold text-brand-700 hover:text-brand-800"
          >
            Esqueci minha senha
          </Link>
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            icon={<Lock className="h-5 w-5" />}
            className="pr-12"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft transition-colors hover:text-ink"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-negative">
            <CircleAlert className="h-3.5 w-3.5 shrink-0" />
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="dark"
        size="lg"
        loading={mutation.isPending}
        className="w-full"
      >
        Entrar no painel
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
};
