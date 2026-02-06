import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/api/admin";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { Pagination } from "@/components/primitives/Pagination";
import { LoadingState, ErrorState, EmptyState } from "@/components/QueryState";

const limit = 20;

export function AdminAuthEventsPage() {
  const [skip, setSkip] = useState(0);
  const key = useMemo(() => ["admin", "auth-events", skip, limit] as const, [skip]);
  const query = useQuery({ queryKey: key, queryFn: () => adminApi.authEvents.list(skip, limit) });

  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load auth events." />;
  if (!query.data || !query.data.items.length) return <EmptyState message="No auth events found." />;
  const data = query.data;

  return (
    <div className="space-y-md">
      <h1 className="text-h1">Admin Auth Events</h1>
      <Card className="p-0">
        <Table
          items={data.items}
          rowKey={(item) => item.id}
          columns={[
            { key: "event", header: "Event", render: (item) => item.event_type },
            { key: "user", header: "User", render: (item) => item.user_id ?? "-" },
            { key: "success", header: "Success", render: (item) => item.success ? "Yes" : "No" },
            { key: "ip", header: "IP", render: (item) => item.ip_address ?? "-" },
            { key: "created", header: "Created", render: (item) => new Date(item.created_at).toLocaleString() },
          ]}
        />
      </Card>
      <Pagination skip={skip} limit={limit} total={data.total} onChange={setSkip} />
    </div>
  );
}
