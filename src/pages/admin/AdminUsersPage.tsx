import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/api/admin";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { Button } from "@/components/primitives/Button";
import { Modal } from "@/components/primitives/Modal";
import { Pagination } from "@/components/primitives/Pagination";
import { LoadingState, ErrorState, EmptyState } from "@/components/QueryState";
import type { AdminUser } from "@/types/api";

const limit = 10;

export function AdminUsersPage() {
  const [skip, setSkip] = useState(0);
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const qc = useQueryClient();

  const key = useMemo(() => ["admin", "users", skip, limit] as const, [skip]);
  const query = useQuery({ queryKey: key, queryFn: () => adminApi.users.list(skip, limit) });
  const mutation = useMutation({
    mutationFn: (payload: { id: string; data: { is_active: boolean; is_email_verified: boolean; is_admin: boolean } }) =>
      adminApi.users.update(payload.id, payload.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      setSelected(null);
    },
  });

  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load users." />;
  if (!query.data || !query.data.items.length) return <EmptyState message="No users found." />;
  const data = query.data;

  return (
    <div className="space-y-md">
      <h1 className="text-h1">Admin Users</h1>
      <Card className="p-0">
        <Table
          items={data.items}
          rowKey={(item) => item.id}
          columns={[
            { key: "email", header: "Email", render: (item) => item.email },
            { key: "active", header: "Active", render: (item) => item.is_active ? "Yes" : "No" },
            { key: "verified", header: "Verified", render: (item) => item.is_email_verified ? "Yes" : "No" },
            { key: "admin", header: "Admin", render: (item) => item.is_admin ? "Yes" : "No" },
            { key: "edit", header: "", render: (item) => <Button variant="secondary" onClick={() => setSelected(item)}>Edit</Button> },
          ]}
        />
      </Card>
      <Pagination skip={skip} limit={limit} total={data.total} onChange={setSkip} />

      <Modal
        open={Boolean(selected)}
        title="Edit User"
        onClose={() => setSelected(null)}
        footer={<><Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button><Button isLoading={mutation.isPending} onClick={() => {
          const form = document.getElementById("admin-user-form") as HTMLFormElement | null;
          if (!form || !selected) return;
          const data = new FormData(form);
          mutation.mutate({ id: selected.id, data: { is_active: data.get("is_active") === "on", is_email_verified: data.get("is_email_verified") === "on", is_admin: data.get("is_admin") === "on" } });
        }}>Save</Button></>}
      >
        {selected ? <form id="admin-user-form" className="space-y-sm">
          <label className="flex gap-sm"><input type="checkbox" name="is_active" defaultChecked={selected.is_active} /> Active</label>
          <label className="flex gap-sm"><input type="checkbox" name="is_email_verified" defaultChecked={selected.is_email_verified} /> Verified</label>
          <label className="flex gap-sm"><input type="checkbox" name="is_admin" defaultChecked={selected.is_admin} /> Admin</label>
        </form> : null}
      </Modal>
    </div>
  );
}
