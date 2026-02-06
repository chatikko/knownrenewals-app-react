import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/api/admin";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { Button } from "@/components/primitives/Button";
import { Modal } from "@/components/primitives/Modal";
import { Select } from "@/components/primitives/Select";
import { Pagination } from "@/components/primitives/Pagination";
import { LoadingState, ErrorState, EmptyState } from "@/components/QueryState";
import type { AdminAccount } from "@/types/api";

const limit = 10;

export function AdminAccountsPage() {
  const [skip, setSkip] = useState(0);
  const [selected, setSelected] = useState<AdminAccount | null>(null);
  const qc = useQueryClient();

  const key = useMemo(() => ["admin", "accounts", skip, limit] as const, [skip]);
  const query = useQuery({ queryKey: key, queryFn: () => adminApi.accounts.list(skip, limit) });

  const mutation = useMutation({
    mutationFn: (payload: { id: string; plan: "monthly" | "yearly"; status: "inactive" | "trialing" | "active" | "past_due" | "canceled" }) =>
      adminApi.accounts.update(payload.id, { plan: payload.plan, status: payload.status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "accounts"] });
      setSelected(null);
    },
  });

  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load accounts." />;
  if (!query.data || !query.data.items.length) return <EmptyState message="No accounts found." />;
  const data = query.data;

  return (
    <div className="space-y-md">
      <h1 className="text-h1">Admin Accounts</h1>
      <Card className="p-0">
        <Table
          items={data.items}
          rowKey={(item) => item.id}
          columns={[
            { key: "name", header: "Name", render: (item) => item.name },
            { key: "owner", header: "Owner", render: (item) => item.owner_email },
            { key: "plan", header: "Plan", render: (item) => item.plan },
            { key: "status", header: "Status", render: (item) => item.status },
            { key: "edit", header: "", render: (item) => <Button variant="secondary" onClick={() => setSelected(item)}>Edit</Button> },
          ]}
        />
      </Card>
      <Pagination skip={skip} limit={limit} total={data.total} onChange={setSkip} />

      <Modal open={Boolean(selected)} title="Edit Account" onClose={() => setSelected(null)}>
        {selected ? <form className="space-y-md" onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          mutation.mutate({ id: selected.id, plan: fd.get("plan") as "monthly" | "yearly", status: fd.get("status") as "inactive" | "trialing" | "active" | "past_due" | "canceled" });
        }}>
          <Select label="Plan" name="plan" defaultValue={selected.plan} options={[{ label: "Monthly", value: "monthly" }, { label: "Yearly", value: "yearly" }]} />
          <Select label="Status" name="status" defaultValue={selected.status} options={[{ label: "Inactive", value: "inactive" }, { label: "Trialing", value: "trialing" }, { label: "Active", value: "active" }, { label: "Past Due", value: "past_due" }, { label: "Canceled", value: "canceled" }]} />
          <Button isLoading={mutation.isPending}>Save</Button>
        </form> : null}
      </Modal>
    </div>
  );
}
