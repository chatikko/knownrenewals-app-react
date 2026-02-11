import { useMemo, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/api/users";
import { billingApi } from "@/api/billing";
import { Alert } from "@/components/primitives/Alert";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Input } from "@/components/primitives/Input";
import { Table } from "@/components/primitives/Table";
import { EmptyState, ErrorState, LoadingState } from "@/components/QueryState";

const PLAN_SEATS: Record<string, number> = {
  trialing: 1,
  founders: 1,
  pro: 5,
  team: 15,
};

function parseError(error: unknown, fallback: string) {
  if (!axios.isAxiosError<{ detail?: string; message?: string }>(error)) return fallback;
  return error.response?.data?.message ?? error.response?.data?.detail ?? fallback;
}

export function TeamPage() {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const membersQuery = useQuery({ queryKey: ["users", "members"], queryFn: usersApi.listMembers });
  const billingQuery = useQuery({ queryKey: ["billing", "status"], queryFn: billingApi.status, retry: false });

  const createMutation = useMutation({
    mutationFn: usersApi.createMember,
    onSuccess: async () => {
      setEmail("");
      setPassword("");
      setIsAdmin(false);
      await qc.invalidateQueries({ queryKey: ["users", "members"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: usersApi.removeMember,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["users", "members"] });
    },
  });
  const removeLoadingId = useMemo(
    () => (removeMutation.isPending ? (removeMutation.variables as string | undefined) : undefined),
    [removeMutation.isPending, removeMutation.variables],
  );

  if (membersQuery.isLoading) return <LoadingState />;
  if (membersQuery.isError) {
    const message = parseError(membersQuery.error, "Failed to load team members.");
    if (axios.isAxiosError(membersQuery.error) && membersQuery.error.response?.status === 403) {
      const detail = (membersQuery.error.response?.data as { detail?: string } | undefined)?.detail ?? "";
      if (detail.toLowerCase().includes("pro and team")) {
        return <ErrorState message="Team management is available only on Pro and Team plans. Please upgrade in Billing." />;
      }
      return <ErrorState message="Admin access required to manage team members." />;
    }
    return <ErrorState message={message} />;
  }
  if (!membersQuery.data) return <EmptyState message="No members found." />;

  const members = membersQuery.data.items;
  const planTier = (billingQuery.data?.plan_tier ?? "pro").toLowerCase();
  const readOnlyMode = Boolean(billingQuery.data?.read_only_mode);
  const seatLimit = PLAN_SEATS[planTier] ?? PLAN_SEATS.pro;
  const seatsUsed = members.length;
  const seatsRemaining = Math.max(0, seatLimit - seatsUsed);
  const addDisabled = createMutation.isPending || seatsRemaining <= 0 || readOnlyMode;

  return (
    <div className="space-y-lg">
      <div className="space-y-xs">
        <h1 className="text-h1">Team</h1>
        <p className="text-small text-text-secondary">Manage account users based on your plan seat limit.</p>
      </div>

      <Card className="space-y-md">
        <h2 className="text-h2">Plan Seats</h2>
        <div className="grid gap-md sm:grid-cols-3">
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Plan Tier</p>
            <p className="text-h2 capitalize">{planTier}</p>
          </div>
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Seats Used</p>
            <p className="text-h2">{seatsUsed}</p>
          </div>
          <div className="rounded-md border border-border bg-background px-lg py-md">
            <p className="text-small text-text-secondary">Seats Remaining</p>
            <p className="text-h2">{seatsRemaining}</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-md">
        <h2 className="text-h2">Add Member</h2>
        {readOnlyMode ? (
          <Alert
            tone="warning"
            message={`Trial expired. Account is read-only${typeof billingQuery.data?.grace_days_left === "number" ? ` (${billingQuery.data.grace_days_left} grace day(s) left)` : ""}. Upgrade to manage team members.`}
          />
        ) : null}
        {createMutation.isError ? <Alert tone="danger" message={parseError(createMutation.error, "Could not add member.")} /> : null}
        {seatsRemaining <= 0 ? <Alert tone="warning" message="Seat limit reached for your current plan." /> : null}
        <form
          className="grid gap-sm sm:grid-cols-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (readOnlyMode) return;
            createMutation.mutate({ email, password, is_admin: isAdmin });
          }}
        >
          <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Temporary Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-end gap-sm">
            <label className="inline-flex items-center gap-xs rounded-md border border-border bg-background px-md py-sm text-small">
              <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
              Admin
            </label>
            <Button type="submit" isLoading={createMutation.isPending} disabled={addDisabled}>
              Add Member
            </Button>
          </div>
        </form>
      </Card>

      {removeMutation.isError ? <Alert tone="danger" message={parseError(removeMutation.error, "Could not remove member.")} /> : null}
      {!members.length ? (
        <EmptyState message="No team members found." />
      ) : (
        <Card className="p-0">
          <Table
            items={members}
            rowKey={(item) => item.id}
            columns={[
              { key: "email", header: "Email", render: (item) => item.email },
              { key: "admin", header: "Admin", render: (item) => (item.is_admin ? "Yes" : "No") },
              { key: "active", header: "Active", render: (item) => (item.is_active ? "Yes" : "No") },
              { key: "verified", header: "Verified", render: (item) => (item.is_email_verified ? "Yes" : "No") },
              {
                key: "action",
                header: "",
                render: (item) => (
                  <Button
                    variant="secondary"
                    disabled={readOnlyMode}
                    isLoading={removeLoadingId === item.id}
                    onClick={() => removeMutation.mutate(item.id)}
                  >
                    Remove
                  </Button>
                ),
              },
            ]}
          />
        </Card>
      )}
    </div>
  );
}
