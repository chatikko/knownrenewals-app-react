import { cn } from "@/lib/cn";

export type IconName =
  | "dashboard"
  | "contracts"
  | "billing"
  | "users"
  | "accounts"
  | "adminContracts"
  | "authEvents"
  | "billingEvents"
  | "logout"
  | "sun"
  | "moon"
  | "success"
  | "warning"
  | "danger"
  | "info";

const paths: Record<IconName, string> = {
  dashboard: "M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z",
  contracts: "M6 3h9l5 5v13H6zM15 3v6h6",
  billing: "M3 7h18M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 9h4",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  accounts: "M3 21h18M4 21V9l8-6 8 6v12M9 21v-6h6v6",
  adminContracts: "M4 4h16v16H4zM8 8h8M8 12h8M8 16h5",
  authEvents: "M12 3v18M3 12h18M5 5l14 14M19 5 5 19",
  billingEvents: "M12 1v22M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H7",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  sun: "M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8",
  success: "M20 6 9 17l-5-5",
  warning: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0",
  danger: "M18 6 6 18M6 6l12 12",
  info: "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
    >
      <path d={paths[name]} />
    </svg>
  );
}
