import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "dark" | "brand";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  header?: ReactNode;
  footer?: ReactNode;
  as?: "article" | "section" | "div";
}

const variantClasses: Record<CardVariant, string> = {
  default: "border border-border bg-surface shadow-card",
  dark: "bg-slate-950 text-white shadow-card",
  brand: "border border-brand-200 bg-brand-50",
};

export function Card({
  variant = "default",
  header,
  footer,
  as: Tag = "article",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn("overflow-hidden rounded-2xl", variantClasses[variant], className)}
      {...props}
    >
      {header && (
        <div
          className={cn(
            "flex items-center justify-between border-b px-5 py-4",
            variant === "dark" ? "border-white/10" : "border-border"
          )}
        >
          {header}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div
          className={cn(
            "border-t px-5 py-4",
            variant === "dark" ? "border-white/10" : "border-border"
          )}
        >
          {footer}
        </div>
      )}
    </Tag>
  );
}
