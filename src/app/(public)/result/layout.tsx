import { type PropsWithChildren } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function ResultLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted text-ink">
      <LandingHeader />
      <div className="flex-1">{children}</div>
      <LandingFooter />
    </div>
  );
}
