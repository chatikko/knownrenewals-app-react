import type { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("rounded-lg border border-border bg-surface p-[20px] transition-shadow duration-150", className)}>{children}</section>;
}
