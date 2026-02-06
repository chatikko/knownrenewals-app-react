import { cn } from "@/lib/cn";
import { Icon } from "@/components/primitives/Icon";

type AlertTone = "success" | "danger" | "warning" | "info";

const styles: Record<AlertTone, string> = {
  success: "border-success/20 bg-success/10 text-success",
  danger: "border-danger/20 bg-danger/10 text-danger",
  warning: "border-warning/20 bg-warning/10 text-warning",
  info: "border-primary/20 bg-primary/10 text-primary",
};

export function Alert({ tone = "info", message, className }: { tone?: AlertTone; message: string; className?: string }) {
  const icon = tone === "success" ? "success" : tone === "warning" ? "warning" : tone === "danger" ? "danger" : "info";
  return (
    <p className={cn("inline-flex items-center gap-sm rounded-md border px-md py-sm text-small", styles[tone], className)}>
      <Icon name={icon} />
      {message}
    </p>
  );
}
