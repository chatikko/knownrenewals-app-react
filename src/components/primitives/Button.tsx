import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-emerald-600 text-white hover:-translate-y-0.5 hover:bg-emerald-700",
  secondary: "border border-border bg-surface text-text-primary hover:-translate-y-0.5 hover:bg-background",
  danger: "bg-danger text-white hover:-translate-y-0.5 hover:bg-[#B91C1C]",
  ghost: "bg-transparent text-text-secondary hover:bg-background hover:text-text-primary",
};

export function Button({
  variant = "primary",
  className,
  isLoading,
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; isLoading?: boolean }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-lg py-sm text-body font-medium transition-all duration-150",
        "active:scale-95",
        "focus-visible:outline-none focus-visible:shadow-focus",
        "disabled:cursor-not-allowed disabled:opacity-[var(--state-disabled-opacity)]",
        styles[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
