import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { billingApi } from "@/api/billing";
import { Alert } from "@/components/primitives/Alert";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/primitives/Button";
import { ConfirmAlertDialog } from "@/components/primitives/ConfirmAlertDialog";
import { LoadingState, ErrorState } from "@/components/QueryState";

type PlanTier = "founders" | "pro" | "team";
type BillingCycle = "monthly" | "yearly";

const PLAN_DETAILS: Record<PlanTier, { name: string; monthlyPrice: number; yearlyPrice: number; features: string[]; tagline?: string }> = {
  founders: {
    name: "Founders",
    monthlyPrice: 19,
    yearlyPrice: 190,
    tagline: "Only for first 50 users",
    features: ["Up to 25 renewals", "1 user", "Email reminders", "CSV import & export"],
  },
  pro: {
    name: "Pro",
    monthlyPrice: 99,
    yearlyPrice: 990,
    tagline: "Most Popular",
    features: ["Unlimited renewals", "Up to 5 users", "Custom reminder schedules", "Team-wide visibility"],
  },
  team: {
    name: "Team",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: ["Up to 15 users", "Role-based access", "Shared renewal ownership", "Priority support"],
  },
};

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

function formatSubscriptionLabel(tier: PlanTier | null, cycle: BillingCycle | null) {
  if (!tier || !cycle) return "No active plan";
  return `${PLAN_DETAILS[tier].name} (${cycle})`;
}

export function BillingPage() {
  const qc = useQueryClient();
  const [plan, setPlan] = useState<BillingCycle>("yearly");
  const [tier, setTier] = useState<PlanTier>("pro");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
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
  const cancel = useMutation({
    mutationFn: billingApi.cancel,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["billing", "status"] });
    },
  });
  const resume = useMutation({
    mutationFn: billingApi.resume,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["billing", "status"] });
    },
  });

  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load billing status." />;
  if (!query.data) return <ErrorState message="Failed to load billing status." />;
  const data = query.data;
  const normalizedStatus = (data.status ?? "unknown").toLowerCase();
  const statusTone =
    normalizedStatus === "active"
      ? "subscribed"
      : normalizedStatus === "trialing" || normalizedStatus === "trailing"
        ? "trialing"
        : normalizedStatus === "past_due"
          ? "past_due"
          : normalizedStatus === "canceled"
            ? "canceled"
            : normalizedStatus === "inactive"
              ? "inactive"
              : "unknown";
  const isTrialStatus = normalizedStatus === "trialing" || normalizedStatus === "trailing";
  const isSubscribed = normalizedStatus === "active" || isTrialStatus;
  const isActiveSubscription = normalizedStatus === "active";
  const isPendingCancel = Boolean(data.cancel_at_period_end);
  const planTier = (data.plan_tier ?? "").toLowerCase();
  const currentTier: PlanTier | null =
    planTier === "founders" || planTier === "pro" || planTier === "team"
      ? (planTier as PlanTier)
      : null;
  const currentPlanCycle: BillingCycle | null = data.plan === "monthly" || data.plan === "yearly" ? data.plan : null;
  const foundersAvailable = Boolean(data.founders_available ?? true);
  const foundersUnavailableForUser = !foundersAvailable && currentTier !== "founders";
  const isCurrentSelection = isSubscribed && currentTier === tier && currentPlanCycle === plan;
  const isPlanSwitch = isSubscribed && !isCurrentSelection;
  const selectionLabel = `${PLAN_DETAILS[tier].name} (${plan})`;
  const isSelectedFoundersUnavailable = foundersUnavailableForUser && tier === "founders";
  const canCheckout = !isCurrentSelection && !isSelectedFoundersUnavailable;
  const checkoutButtonLabel = isCurrentSelection
    ? "Current Plan Selected"
    : isPlanSwitch
      ? `Switch to ${PLAN_DETAILS[tier].name}`
      : `Start ${PLAN_DETAILS[tier].name}`;

  return (
    <div className="max-w-5xl space-y-md">
      <div className="space-y-xs">
        <h1 className="text-h1">Billing</h1>
        <p className="text-small text-text-secondary">Manage your subscription, compare plans, and switch anytime.</p>
      </div>

      <Card className="space-y-md">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <h2 className="text-h2">Current Subscription</h2>
          <Badge status={statusTone} label={normalizedStatus} />
        </div>
        <div className="grid gap-md sm:grid-cols-3">
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Current Plan</p>
            <p className="text-h2">{formatSubscriptionLabel(currentTier, currentPlanCycle)}</p>
          </div>
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Subscription Status</p>
            <p className="text-h2 capitalize">{normalizedStatus}</p>
            {isTrialStatus ? (
              <p className="text-small text-warning">
                {typeof data.trial_days_left === "number" ? `${data.trial_days_left} day(s) left in trial.` : "Trial active."}
              </p>
            ) : null}
            {isPendingCancel ? <p className="text-small text-warning">Cancellation scheduled at period end.</p> : null}
          </div>
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Billing Cycle</p>
            <p className="text-h2 capitalize">{currentPlanCycle ?? "-"}</p>
            <p className="text-small text-text-secondary">Switch instantly from the plans below.</p>
          </div>
        </div>
        {isSubscribed ? <Badge status="subscribed" label="You can still upgrade anytime" /> : null}
        {isActiveSubscription ? (
          <div className="flex flex-wrap items-center gap-sm">
            {isPendingCancel ? (
              <Button
                variant="secondary"
                isLoading={resume.isPending}
                onClick={() => resume.mutate()}
              >
                Resume Subscription
              </Button>
            ) : (
              <Button
                variant="danger"
                isLoading={cancel.isPending}
                onClick={() => {
                  setShowCancelDialog(true);
                }}
              >
                Cancel Subscription
              </Button>
            )}
            {cancel.isError ? <Alert tone="danger" message="Could not cancel subscription." /> : null}
            {resume.isError ? <Alert tone="danger" message="Could not resume subscription." /> : null}
            {cancel.isSuccess ? <Alert tone="success" message={cancel.data.message ?? "Subscription cancellation scheduled."} /> : null}
            {resume.isSuccess ? <Alert tone="success" message={resume.data.message ?? "Subscription resumed."} /> : null}
          </div>
        ) : null}
      </Card>

      <Card className="space-y-md">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <div className="space-y-xs">
            <h2 className="text-h2">Plans</h2>
            <p className="text-small text-text-secondary">Transparent pricing. No hidden fees. Cancel anytime.</p>
            {foundersUnavailableForUser ? (
              <p className="text-small text-warning">
                Founders plan is currently full ({data.founders_slots_remaining ?? 0} slots remaining).
              </p>
            ) : null}
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
          {(["founders", "pro", "team"] as PlanTier[]).map((planTierOption) => {
            const details = PLAN_DETAILS[planTierOption];
            const isCurrentCard = currentTier === planTierOption && isSubscribed;
            const isSelectedCard = tier === planTierOption;
            const isFoundersCardUnavailable = foundersUnavailableForUser && planTierOption === "founders";
            return (
              <article
                key={planTierOption}
                className={`rounded-md border px-md py-md ${
                  isCurrentCard
                    ? "border-success/40 bg-success/5"
                    : isSelectedCard
                      ? "border-primary/50 ring-2 ring-primary/20"
                      : "border-border bg-background"
                }`}
              >
                <div className="space-y-xs">
                  <p className={`text-small font-semibold uppercase tracking-wide ${planTierOption === "pro" ? "text-primary" : "text-text-secondary"}`}>{details.name}</p>
                  <p className="text-h2">{formatCurrency(plan === "monthly" ? details.monthlyPrice : details.yearlyPrice)}</p>
                  <p className="text-small text-text-secondary">{plan === "monthly" ? "per month" : "per year (2 months free)"}</p>
                  {details.tagline ? <Badge status={planTierOption === "founders" ? "soon" : "trialing"} label={details.tagline} /> : null}
                  {isCurrentCard ? <Badge status="subscribed" label="Current Plan" /> : null}
                </div>
                <ul className="mt-sm space-y-xs text-small text-text-secondary">
                  {details.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Button
                  className="mt-sm w-full"
                  variant={isSelectedCard ? "primary" : "secondary"}
                  disabled={isFoundersCardUnavailable}
                  onClick={() => setTier(planTierOption)}
                >
                  {isCurrentCard ? "Current Plan" : isSelectedCard ? "Selected" : `Select ${details.name}`}
                </Button>
              </article>
            );
          })}
        </div>
      </Card>

      <Card className="space-y-md">
        <h2 className="text-h2">Checkout</h2>
        <p className="text-small text-text-secondary">
          {isPlanSwitch
            ? `Switch from ${formatSubscriptionLabel(currentTier, currentPlanCycle)} to ${selectionLabel}.`
            : `Proceed with ${selectionLabel}.`}
        </p>
        {isSelectedFoundersUnavailable ? (
          <Alert tone="warning" message="Founders plan is unavailable for new subscriptions. Please choose Pro or Team." />
        ) : null}
        {checkout.isError ? <Alert tone="danger" message="Could not start checkout." /> : null}
        <Button
          className="w-full sm:w-auto"
          disabled={!canCheckout}
          isLoading={checkout.isPending}
          onClick={() => {
            if (isPlanSwitch) {
              setShowSwitchDialog(true);
              return;
            }
            checkout.mutate();
          }}
        >
          {checkoutButtonLabel}
        </Button>
        {isCurrentSelection ? <Alert tone="info" message="You are already on this plan and billing cycle." /> : null}
      </Card>

      <ConfirmAlertDialog
        open={showCancelDialog}
        title="Cancel Subscription"
        tone="danger"
        message="Your plan will remain active until the current billing period ends. You can resume before it ends."
        confirmLabel="Cancel at Period End"
        cancelLabel="Keep Subscription"
        isLoading={cancel.isPending}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={() => {
          cancel.mutate(undefined, {
            onSuccess: () => setShowCancelDialog(false),
          });
        }}
      />

      <ConfirmAlertDialog
        open={showSwitchDialog}
        title="Change Plan"
        tone="warning"
        message={`You are switching from ${currentTier ?? "current"} (${currentPlanCycle ?? "current"}) to ${selectionLabel}.`}
        confirmLabel="Confirm Plan Change"
        cancelLabel="Keep Current Plan"
        isLoading={checkout.isPending}
        onClose={() => setShowSwitchDialog(false)}
        onConfirm={() => {
          checkout.mutate(undefined, {
            onSuccess: () => setShowSwitchDialog(false),
          });
        }}
      >
        <p className="text-small text-text-secondary">You do not need to unsubscribe first. The checkout page will show final billing details.</p>
      </ConfirmAlertDialog>
    </div>
  );
}
