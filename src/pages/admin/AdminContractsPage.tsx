import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/api/admin";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { Modal } from "@/components/primitives/Modal";
import { Select } from "@/components/primitives/Select";
import { Pagination } from "@/components/primitives/Pagination";
import { LoadingState, ErrorState, EmptyState } from "@/components/QueryState";
import type { AdminContract } from "@/types/api";

const limit = 10;

export function AdminContractsPage() {
  const [skip, setSkip] = useState(0);
  const [selected, setSelected] = useState<AdminContract | null>(null);
  const qc = useQueryClient();

  const key = useMemo(() => ["admin", "contracts", skip, limit] as const, [skip]);
  const query = useQuery({ queryKey: key, queryFn: () => adminApi.contracts.list(skip, limit) });

  const mutation = useMutation({
    mutationFn: (payload: { id: string; status: "safe" | "soon" | "risk" }) => adminApi.contracts.update(payload.id, { status: payload.status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "contracts"] });
      setSelected(null);
    },
  });

  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load contracts." />;
  if (!query.data || !query.data.items.length) return <EmptyState message="No contracts found." />;
  const data = query.data;

  return (
    <div className="space-y-md">
      <h1 className="text-h1">Admin Contracts</h1>
      <Card className="p-0">
        <Table
          items={data.items}
          rowKey={(item) => item.id}
          columns={[
            { key: "vendor", header: "Vendor", render: (item) => item.vendor_name },
            { key: "owner", header: "Owner", render: (item) => item.owner_email },
            { key: "status", header: "Status", render: (item) => <Badge status={item.status} /> },
            { key: "edit", header: "", render: (item) => <Button variant="secondary" onClick={() => setSelected(item)}>Edit</Button> },
          ]}
        />
      </Card>
      <Pagination skip={skip} limit={limit} total={data.total} onChange={setSkip} />

      <Modal open={Boolean(selected)} title="Edit Contract" onClose={() => setSelected(null)}>
        {selected ? <form className="space-y-md" onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          mutation.mutate({ id: selected.id, status: fd.get("status") as "safe" | "soon" | "risk" });
        }}>
          <Select label="Status" name="status" defaultValue={selected.status} options={[{ label: "Safe", value: "safe" }, { label: "Soon", value: "soon" }, { label: "Risk", value: "risk" }]} />
          <Button isLoading={mutation.isPending}>Save</Button>
        </form> : null}
      </Modal>
    </div>
  );
}
