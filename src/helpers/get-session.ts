import { cache } from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export type Session = {
  userId: string;
};

export const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, env.AUTH_SECRET) as jwt.JwtPayload;
    if (!payload.sub) return null;
    return { userId: payload.sub };
  } catch {
    return null;
  }
});
