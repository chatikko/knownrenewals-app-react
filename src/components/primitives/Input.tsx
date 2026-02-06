import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }>(
  ({ label, error, className, required, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-xs">
        <span className="flex items-center gap-xs text-small text-text-secondary">
          {label}
          {required ? <span className="text-danger">*</span> : null}
        </span>
        <input
          ref={ref}
          className={cn(
            "w-full rounded-md border bg-surface px-md py-sm text-body outline-none transition-all duration-150",
            error ? "border-danger focus-visible:shadow-[var(--state-error-ring)]" : "border-border hover:border-[var(--color-border-hover)] focus-visible:shadow-focus",
            className,
          )}
          aria-invalid={Boolean(error)}
          required={required}
          {...props}
        />
        <span className={cn("min-h-[1rem] text-small", error ? "text-danger" : "text-transparent")}>{error ?? "."}</span>
      </label>
    );
  },
);

Input.displayName = "Input";
