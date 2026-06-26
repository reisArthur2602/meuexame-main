import { redirect } from "next/navigation";
import { getSession, type Session } from "./get-session";
import { getCurrentUser } from "./get-current-user";

export type Permission =
  | "exam.view"
  | "exam.create"
  | "exam.update"
  | "exam.delete"
  | "exam.document.view"
  | "exam.document.upload"
  | "exam.document.delete"
  | "exam.whatsapp.resend"
  | "user.view"
  | "user.create"
  | "user.update"
  | "user.delete";

const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  ADMIN: [
    "exam.view",
    "exam.create",
    "exam.update",
    "exam.delete",
    "exam.document.view",
    "exam.document.upload",
    "exam.document.delete",
    "exam.whatsapp.resend",
    "user.view",
    "user.create",
    "user.update",
    "user.delete",
  ],
  STAFF: [
    "exam.view",
    "exam.create",
    "exam.update",
    "exam.document.view",
    "exam.document.upload",
    "exam.document.delete",
    "exam.whatsapp.resend",
  ],
};

export function canPermission(
  user: { role: string },
  permission: Permission
): boolean {
  return (ROLE_PERMISSIONS[user.role] ?? []).includes(permission);
}

export async function requirePermissions(
  permissions: Permission[],
  options?: { mode?: "all" | "any" }
): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const userPerms = ROLE_PERMISSIONS[user.role] ?? [];
  const mode = options?.mode ?? "all";

  const hasPermission =
    mode === "all"
      ? permissions.every((p) => userPerms.includes(p))
      : permissions.some((p) => userPerms.includes(p));

  if (!hasPermission) redirect("/overview");

  return session;
}
