import { cn } from "@/lib/cn";

type BadgeTone =
  | "safe"
  | "soon"
  | "risk"
  | "subscribed"
  | "trialing"
  | "past_due"
  | "canceled"
  | "inactive"
  | "unknown";

const styles: Record<BadgeTone, string> = {
  safe: "bg-success/10 text-success border-success/30",
  soon: "bg-warning/10 text-warning border-warning/30",
  risk: "bg-danger/10 text-danger border-danger/30",
  subscribed: "bg-success/10 text-success border-success/30",
  trialing: "bg-warning/10 text-warning border-warning/30",
  past_due: "bg-danger/10 text-danger border-danger/30",
  canceled: "bg-danger/10 text-danger border-danger/30",
  inactive: "bg-background text-text-secondary border-border",
  unknown: "bg-background text-text-secondary border-border",
};

export function Badge({ status, label }: { status: BadgeTone; label?: string }) {
  const defaultLabel =
    status === "safe" ? "Active" : status === "soon" ? "Expiring" : status === "risk" ? "Alert" : status.replace(/_/g, " ");

  return (
    <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-small capitalize tracking-[0.01em]", styles[status])}>
      {label ?? defaultLabel}
    </span>
  );
}
