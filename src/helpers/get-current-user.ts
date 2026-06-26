import { cache } from "react";
import { getSession } from "./get-session";
import prisma from "@/lib/prisma";

export type CurrentUser = {
  id: string;
  name: string;
  username: string;
  role: "ADMIN" | "STAFF";
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session) return null;

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, username: true, role: true },
  });
});
