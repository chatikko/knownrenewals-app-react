import { cn } from "@/lib/cn";
import { Icon } from "@/components/primitives/Icon";
import { useTheme } from "@/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center gap-sm rounded-md border px-sm py-xs text-small font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:shadow-focus",
        isDark ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-surface text-text-secondary",
      )}
    >
      <span className="inline-flex items-center gap-xs">
        <Icon name={isDark ? "moon" : "sun"} />
        {isDark ? "Dark" : "Light"}
      </span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full border transition-colors duration-150",
          isDark ? "border-primary/50 bg-primary/20" : "border-border bg-background",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-all duration-150",
            isDark ? "left-[18px] bg-primary" : "left-[2px] bg-text-secondary",
          )}
        />
      </span>
    </button>
  );
}
