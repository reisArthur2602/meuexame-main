import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { getCurrentUser } from "@/helpers/get-current-user";

export default async function AuthenticatedLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return <AppLayout user={user}>{children}</AppLayout>;
}
