"use server";

import { cache } from "react";
import { shouldBeAdmin } from "@/helpers/should-be-admin";
import { getInitials } from "@/helpers/get-initials";
import { getAvatarColor } from "@/helpers/get-avatar-color";
import { formatLastAccess } from "@/helpers/format-date";
import prisma from "@/lib/prisma";

export const getUsers = cache(async () => {
  await shouldBeAdmin();

  const now = new Date();
  
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, username: true, role: true, isActive: true, lastLoginAt: true },
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name,
    username: u.username,
    initials: getInitials(u.name),
    avatarColor: getAvatarColor(u.id),
    role: (u.role === "ADMIN" ? "admin" : "employee") as "admin" | "employee",
    status: (u.isActive ? "active" : "inactive") as "active" | "inactive",
    lastAccess: formatLastAccess(u.lastLoginAt, now),
  }));
});
