import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    options: { label: string; value: string }[];
    error?: string;
  }
>(({ label, options, error, className, ...props }, ref) => {
  return (
    <label className="flex flex-col gap-xs">
      <span className="text-small text-text-secondary">{label}</span>
      <select
        ref={ref}
        className={cn(
          "w-full rounded-md border bg-surface px-md py-sm text-body outline-none transition-all duration-150",
          error ? "border-danger focus-visible:shadow-[var(--state-error-ring)]" : "border-border hover:border-[var(--color-border-hover)] focus-visible:shadow-focus",
          className,
        )}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <span className={cn("min-h-[1rem] text-small", error ? "text-danger" : "text-transparent")}>{error ?? "."}</span>
    </label>
  );
});

Select.displayName = "Select";
