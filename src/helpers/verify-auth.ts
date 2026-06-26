import { redirect } from "next/navigation";
import { getSession, type Session } from "./get-session";

/** Para layouts e Server Components — redireciona para /login se não autenticado. */
export async function verifyAuth(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/** Para Server Actions — lança erro se não autenticado (defesa contra chamadas diretas). */
export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new Error("Não autorizado.");
  return session;
}
