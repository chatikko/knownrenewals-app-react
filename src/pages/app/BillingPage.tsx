import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { billingApi } from "@/api/billing";
import { Alert } from "@/components/primitives/Alert";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";
import { LoadingState, ErrorState } from "@/components/QueryState";

export function BillingPage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const [tier, setTier] = useState<"founders" | "pro" | "team">("pro");
  const checkoutPlan = `${tier}_${plan}` as "founders_monthly" | "founders_yearly" | "pro_monthly" | "pro_yearly" | "team_monthly" | "team_yearly";
  const query = useQuery({ queryKey: ["billing", "status"], queryFn: billingApi.status });
  const checkout = useMutation({
    mutationFn: () =>
      billingApi.checkout({
        plan: checkoutPlan,
        success_url: `${window.location.origin}/billing`,
        cancel_url: `${window.location.origin}/billing`,
      }),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load billing status." />;
  if (!query.data) return <ErrorState message="Failed to load billing status." />;
  const data = query.data;
  const statusTone =
    data.status === "active"
      ? "subscribed"
      : data.status === "trialing"
        ? "trialing"
        : data.status === "past_due"
          ? "past_due"
          : data.status === "canceled"
            ? "canceled"
            : data.status === "inactive"
              ? "inactive"
              : "unknown";
  const isSubscribed = data.status === "active" || data.status === "trialing";
  const planTier = (data.plan_tier ?? "").toLowerCase();
  const currentTier: "founders" | "pro" | "team" | null =
    planTier === "founders" || planTier === "pro" || planTier === "team"
      ? (planTier as "founders" | "pro" | "team")
      : null;

  return (
    <div className="max-w-5xl space-y-md">
      <div className="space-y-xs">
        <h1 className="text-h1">Billing</h1>
        <p className="text-small text-text-secondary">Subscription management and plan updates.</p>
      </div>

      <Card className="space-y-md">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <h2 className="text-h2">Current Subscription</h2>
          <Badge status={statusTone} label={data.status ?? "unknown"} />
        </div>
        <div className="grid gap-md sm:grid-cols-2">
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Current Plan</p>
            <p className="text-h2 capitalize">{data.plan_tier ? `${data.plan_tier} (${data.plan ?? "-"})` : (data.plan ?? "No active plan")}</p>
          </div>
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Subscription Status</p>
            <p className="text-h2 capitalize">{data.status ?? "-"}</p>
          </div>
        </div>
        {isSubscribed ? <Badge status="subscribed" label="You can still upgrade anytime" /> : null}
      </Card>

      <Card className="space-y-md">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <div className="space-y-xs">
            <h2 className="text-h2">Plans</h2>
            <p className="text-small text-text-secondary">Compare plans and upgrade anytime.</p>
          </div>
          <div className="inline-flex rounded-md border border-border bg-background p-1">
            <Button
              variant={plan === "monthly" ? "primary" : "ghost"}
              className="px-md py-xs"
              onClick={() => setPlan("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={plan === "yearly" ? "primary" : "ghost"}
              className="px-md py-xs"
              onClick={() => setPlan("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="grid gap-md lg:grid-cols-3">
          <article
            className={`rounded-md border px-md py-md ${
              currentTier === "founders" && isSubscribed
                ? "border-success/40 bg-success/5"
                : tier === "founders"
                  ? "border-primary/50 ring-2 ring-primary/20"
                  : "border-border bg-background"
            }`}
          >
            <div className="space-y-xs">
              <p className="text-small font-semibold uppercase tracking-wide text-text-secondary">Founders</p>
              <p className="text-h2">{plan === "monthly" ? "$19" : "$190"}</p>
              <p className="text-small text-text-secondary">{plan === "monthly" ? "per month" : "per year (2 months free)"}</p>
              {currentTier === "founders" && data.status === "active" ? <Badge status="subscribed" label="Current Active" /> : null}
              {currentTier === "founders" && data.status === "trialing" ? <Badge status="trialing" label="Trialing" /> : null}
              <p className="text-small font-medium text-warning">Only for first 50 users.</p>
            </div>
            <ul className="mt-sm space-y-xs text-small text-text-secondary">
              <li>Up to 25 renewals</li>
              <li>1 user</li>
              <li>Email reminders</li>
              <li>CSV import &amp; export</li>
            </ul>
            <Button className="mt-sm w-full" variant={tier === "founders" ? "primary" : "secondary"} onClick={() => setTier("founders")}>
              {tier === "founders" ? "Selected" : "Select Founders"}
            </Button>
          </article>

          <article
            className={`rounded-md px-md py-md ${
              currentTier === "pro" && isSubscribed
                ? "border-2 border-success/40 bg-success/5"
                : tier === "pro"
                  ? "border-2 border-primary/40 bg-primary/5"
                  : "border border-border bg-background"
            }`}
          >
            <div className="space-y-xs">
              <p className="text-small font-semibold uppercase tracking-wide text-primary">Pro</p>
              <p className="text-h2">{plan === "monthly" ? "$99" : "$990"}</p>
              <p className="text-small text-text-secondary">{plan === "monthly" ? "per month" : "per year (2 months free)"}</p>
              {currentTier === "pro" && data.status === "active" ? <Badge status="subscribed" label="Current Active" /> : null}
              {currentTier === "pro" && data.status === "trialing" ? <Badge status="trialing" label="Trialing" /> : null}
              <Badge status="trialing" label="Most Popular" />
            </div>
            <ul className="mt-sm space-y-xs text-small text-text-secondary">
              <li>Unlimited renewals</li>
              <li>Up to 5 users</li>
              <li>Custom reminder schedules</li>
              <li>Team-wide visibility</li>
            </ul>
            <Button className="mt-sm w-full" variant={tier === "pro" ? "primary" : "secondary"} onClick={() => setTier("pro")}>
              {tier === "pro" ? "Selected" : "Select Pro"}
            </Button>
          </article>

          <article
            className={`rounded-md border px-md py-md ${
              currentTier === "team" && isSubscribed
                ? "border-success/40 bg-success/5"
                : tier === "team"
                  ? "border-primary/50 ring-2 ring-primary/20"
                  : "border-border bg-background"
            }`}
          >
            <div className="space-y-xs">
              <p className="text-small font-semibold uppercase tracking-wide text-text-secondary">Team</p>
              <p className="text-h2">{plan === "monthly" ? "$199" : "$1,990"}</p>
              <p className="text-small text-text-secondary">{plan === "monthly" ? "per month" : "per year (2 months free)"}</p>
              {currentTier === "team" && data.status === "active" ? <Badge status="subscribed" label="Current Active" /> : null}
              {currentTier === "team" && data.status === "trialing" ? <Badge status="trialing" label="Trialing" /> : null}
            </div>
            <ul className="mt-sm space-y-xs text-small text-text-secondary">
              <li>Up to 15 users</li>
              <li>Role-based access</li>
              <li>Shared renewal ownership</li>
              <li>Priority support</li>
            </ul>
            <Button className="mt-sm w-full" variant={tier === "team" ? "primary" : "secondary"} onClick={() => setTier("team")}>
              {tier === "team" ? "Selected" : "Select Team"}
            </Button>
          </article>
        </div>
      </Card>

      <Card className="space-y-md">
        <h2 className="text-h2">Checkout</h2>
        <p className="text-small text-text-secondary">
          Proceed with <span className="capitalize">{tier}</span> ({plan}) billing. You can manage or cancel anytime.
        </p>
        {checkout.isError ? <Alert tone="danger" message="Could not start checkout." /> : null}
        <Button className="w-full sm:w-auto" isLoading={checkout.isPending} onClick={() => checkout.mutate()}>
          Continue to Checkout
        </Button>
      </Card>
    </div>
  );
}
