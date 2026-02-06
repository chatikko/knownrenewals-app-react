import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { billingApi } from "@/api/billing";
import { Alert } from "@/components/primitives/Alert";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { Select } from "@/components/primitives/Select";
import { Button } from "@/components/primitives/Button";
import { LoadingState, ErrorState } from "@/components/QueryState";

export function BillingPage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");
  const query = useQuery({ queryKey: ["billing", "status"], queryFn: billingApi.status });
  const checkout = useMutation({
    mutationFn: () => billingApi.checkout({ plan, success_url: `${window.location.origin}/billing`, cancel_url: `${window.location.origin}/billing` }),
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

  return (
    <div className="max-w-3xl space-y-lg">
      <Card className="space-y-lg">
        <div className="flex items-center justify-between gap-md">
          <h1 className="text-h1">Billing</h1>
          <Badge status={statusTone} label={data.status ?? "unknown"} />
        </div>
        <div className="grid gap-md sm:grid-cols-2">
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Current Plan</p>
            <p className="text-h2 capitalize">{data.plan ?? "-"}</p>
          </div>
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Subscription Status</p>
            <p className="text-h2 capitalize">{data.status ?? "-"}</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-md">
        <h2 className="text-h2">Manage Subscription</h2>
        <p className="text-small text-text-secondary">Choose a plan and continue to checkout.</p>
        <Select
          label="Checkout Plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value as "monthly" | "yearly")}
          options={[{ label: "Yearly", value: "yearly" }, { label: "Monthly", value: "monthly" }]}
        />
        {checkout.isError ? <Alert tone="danger" message="Could not start checkout." /> : null}
        <Button className="w-full sm:w-auto" isLoading={checkout.isPending} onClick={() => checkout.mutate()}>
          Upgrade / Manage Billing
        </Button>
      </Card>
    </div>
  );
}
