"use server";

import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { env } from "@/env";
import { loginSchema } from "@/schemas/auth";

function createToken(userId: string): string {
  return jwt.sign({ sub: userId }, env.AUTH_SECRET, { expiresIn: "7d" });
}

export async function signIn(
  input: unknown
): Promise<{ success: boolean; message: string }> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, message: "Preencha todos os campos." };
  }

  const { username, password } = parsed.data;

  let user;
  try {
    user = await prisma.user.findUnique({ where: { username } });
  } catch {
    throw new Error("Erro ao consultar o banco de dados.");
  }

  if (!user || !user.isActive) {
    return { success: false, message: "Usuário ou senha incorretos." };
  }

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(password, user.passwordHash);
  } catch {
    throw new Error("Erro ao verificar a senha.");
  }

  if (!passwordMatch) {
    return { success: false, message: "Usuário ou senha incorretos." };
  }

  const token = createToken(user.id);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });

  return { success: true, message: "Login realizado com sucesso." };
}
