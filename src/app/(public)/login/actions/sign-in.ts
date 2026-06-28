"use server";

import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { env } from "@/env";
import { loginSchema } from "@/schemas/auth";

const createToken = (userId: string) =>
  jwt.sign({ sub: userId }, env.AUTH_SECRET, { expiresIn: "7d" });

export const signIn = async (input: unknown) => {
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

  const isFirstLogin = user.lastLoginAt === null;

  // Update lastLoginAt
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  const token = createToken(user.id);
  const cookieStore = await cookies();

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  if (isFirstLogin) {
    cookieStore.set("first_login", "1", {
      httpOnly: false,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10,
    });
  }

  return { success: true, message: "Login realizado com sucesso." };
};
