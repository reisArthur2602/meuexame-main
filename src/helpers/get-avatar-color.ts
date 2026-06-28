import type { UserAvatarColor } from "@/types";

const AVATAR_COLORS: UserAvatarColor[] = ["brand", "blue", "amber", "rose", "teal"];

export const getAvatarColor = (id: string): UserAvatarColor => {
  const hash = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};
