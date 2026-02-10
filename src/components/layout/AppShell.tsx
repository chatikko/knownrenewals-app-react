import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/primitives/Button";
import { adminApi } from "@/api/admin";
import { billingApi } from "@/api/billing";
import { Badge } from "@/components/primitives/Badge";
import { Icon, type IconName } from "@/components/primitives/Icon";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { cn } from "@/lib/cn";
import { useAuth } from "@/auth/AuthProvider";

const appLinks: Array<[string, string, IconName]> = [
  ["/dashboard", "Dashboard", "dashboard"],
  ["/contracts", "Contracts", "contracts"],
  ["/billing", "Billing", "billing"],
];

const adminLinks: Array<[string, string, IconName]> = [
  ["/admin/users", "Admin Users", "users"],
  ["/admin/accounts", "Admin Accounts", "accounts"],
  ["/admin/contracts", "Admin Contracts", "adminContracts"],
  ["/admin/auth-events", "Auth Events", "authEvents"],
  ["/admin/billing-events", "Billing Events", "billingEvents"],
];

export function AppShell() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const appEnv = (import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE ?? "").toLowerCase();
  const showSandboxBadge = appEnv !== "" && appEnv !== "production" && appEnv !== "prod";
  const adminProbe = useQuery({
    queryKey: ["admin", "guard"],
    queryFn: () => adminApi.users.list(0, 1),
    enabled: isAuthenticated,
    retry: false,
    staleTime: 60_000,
  });
  const billingStatus = useQuery({
    queryKey: ["billing", "status"],
    queryFn: billingApi.status,
    enabled: isAuthenticated,
    retry: false,
    staleTime: 60_000,
  });

  const billingState = (() => {
    if (billingStatus.isLoading) return { label: "Checking Billing", tone: "unknown" as const };
    if (billingStatus.isError || !billingStatus.data) return { label: "Billing Unknown", tone: "unknown" as const };
    const isTrialing = billingStatus.data.status === "trialing" || billingStatus.data.status === "trailing";
    const trialDaysLeft = billingStatus.data.trial_days_left;

    switch (billingStatus.data.status) {
      case "active":
        return { label: "Subscribed", tone: "subscribed" as const };
      case "trialing":
        return {
          label: typeof trialDaysLeft === "number" ? `Trialing (${trialDaysLeft}d left)` : "Trialing",
          tone: "trialing" as const,
        };
      case "trailing":
        return {
          label: typeof trialDaysLeft === "number" ? `Trialing (${trialDaysLeft}d left)` : "Trialing",
          tone: "trialing" as const,
        };
      case "past_due":
        return { label: "Past Due", tone: "past_due" as const };
      case "canceled":
        return { label: "Canceled", tone: "canceled" as const };
      case "inactive":
        return { label: "Inactive", tone: "inactive" as const };
      default:
        return { label: "Not Subscribed", tone: "inactive" as const };
    }
  })();

  const isAdmin = adminProbe.isSuccess;
  const planTier = (billingStatus.data?.plan_tier ?? "").toLowerCase();
  const canAccessTeam = planTier === "pro" || planTier === "team";
  const visibleAppLinks: Array<[string, string, IconName]> = canAccessTeam
    ? [...appLinks.slice(0, 2), ["/team", "Team", "users"], appLinks[2]]
    : appLinks;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-surface/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-md">
            <img src="/logo.png" alt="KnowRenewals logo" className="h-10 w-auto" />
            <Badge status={billingState.tone} label={billingState.label} />
          </div>
          <div className="flex items-center gap-sm">
            {showSandboxBadge ? (
              <div className="hidden rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-small font-medium text-amber-900 md:block">
                Sandbox mode enabled. Contact support@knowrenewals.com for demo and production access.
              </div>
            ) : null}
            <ThemeToggle />
            <Button variant="secondary" onClick={() => { logout(); navigate("/login"); }}>
              <Icon name="logout" className="mr-xs" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="rounded-xl border border-border/90 bg-surface/75 p-md shadow-sm backdrop-blur-xl lg:fixed lg:top-24 lg:w-[260px]">
          <div className="mb-sm px-sm text-small uppercase tracking-[0.08em] text-text-secondary">App</div>
          <div className="mb-md flex flex-col gap-xs">
            {visibleAppLinks.map(([to, label, icon]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md border-l-2 border-transparent px-6 py-3 text-body text-text-secondary transition-all duration-200 hover:bg-background/90 hover:text-text-primary hover:shadow-sm",
                    isActive && "border-primary bg-primary/10 text-primary font-medium",
                  )
                }
              >
                <span className="inline-flex items-center gap-sm">
                  <Icon name={icon} />
                  {label}
                </span>
              </NavLink>
            ))}
          </div>

          {isAdmin ? (
            <>
              <div className="mb-sm mt-sm px-sm text-small uppercase tracking-[0.08em] text-text-secondary">Admin</div>
              <div className="flex flex-col gap-xs">
                {adminLinks.map(([to, label, icon]) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        "rounded-md border-l-2 border-transparent px-6 py-3 text-body text-text-secondary transition-all duration-200 hover:bg-background/90 hover:text-text-primary hover:shadow-sm",
                        isActive && "border-primary bg-primary/10 text-primary font-medium",
                      )
                    }
                  >
                    <span className="inline-flex items-center gap-sm">
                      <Icon name={icon} />
                      {label}
                    </span>
                  </NavLink>
                ))}
              </div>
            </>
          ) : null}
        </nav>

        <main className="space-y-lg lg:ml-[284px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
