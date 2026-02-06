import { useQuery } from "@tanstack/react-query";
import { contractsApi } from "@/api/contracts";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { EmptyState, ErrorState, LoadingState } from "@/components/QueryState";
import { formatDate } from "@/lib/format";

type ContractBadgeStatus = "safe" | "soon" | "risk";

function StatusBadge({ status }: { status: ContractBadgeStatus }) {
  let classes = "border-border bg-background text-text-secondary";
  switch (status) {
    case "safe":
      classes = "border-success/30 bg-success/10 text-success";
      break;
    case "soon":
      classes = "border-warning/30 bg-warning/10 text-warning";
      break;
    case "risk":
      classes = "border-danger/30 bg-danger/10 text-danger";
      break;
  }

  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-small font-medium ${classes}`}>{status}</span>;
}

export function DashboardPage() {
  const query = useQuery({ queryKey: ["contracts"], queryFn: contractsApi.list });
  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load dashboard." />;
  if (!query.data || !query.data.items.length) return <EmptyState message="No contracts available yet." />;
  const data = query.data;

  const total = data.items.length;
  const soonCount = data.items.filter((item) => item.status === "soon").length;
  const riskCount = data.items.filter((item) => item.status === "risk").length;
  const ratio = (count: number) => `${Math.max(6, Math.round((count / total) * 100))}%`;

  return (
    <div className="space-y-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Dashboard</h1>
      </div>
      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-3">
        <Card className="space-y-sm border-border bg-gradient-to-br from-surface to-primary/5 shadow-sm">
          <p className="text-small text-text-secondary">Total Contracts</p>
          <p className="text-[24px] font-bold text-text-primary">{total}</p>
          <div className="h-2 w-full rounded-full bg-background">
            <div className="h-2 rounded-full bg-primary" style={{ width: "100%" }} />
          </div>
        </Card>
        <Card className="space-y-sm border-border border-t-2 border-t-warning bg-gradient-to-br from-surface to-warning/10 shadow-sm">
          <p className="text-small text-text-secondary">Expiring Soon</p>
          <p className="text-[24px] font-bold text-warning">{soonCount}</p>
          <div className="h-2 w-full rounded-full bg-warning/15">
            <div className="h-2 rounded-full bg-warning" style={{ width: ratio(soonCount) }} />
          </div>
        </Card>
        <Card className="space-y-sm border-border bg-gradient-to-br from-surface to-danger/10 shadow-sm">
          <p className="text-small text-text-secondary">Risk</p>
          <p className="text-[24px] font-bold text-danger">{riskCount}</p>
          <div className="h-2 w-full rounded-full bg-danger/15">
            <div className="h-2 rounded-full bg-danger" style={{ width: ratio(riskCount) }} />
          </div>
        </Card>
      </div>

      <Card className="border-warning/30 bg-gradient-to-r from-warning/10 to-warning/5 text-warning">
        <span className="font-medium">{soonCount + riskCount}</span> contracts need action in next 30 days
      </Card>
      <Table
        items={data.items}
        rowKey={(item) => item.id}
        columns={[
          { key: "vendor", header: "Vendor", render: (item) => item.vendor_name },
          { key: "renewal", header: "Renewal Date", render: (item) => formatDate(item.renewal_date) },
          { key: "notice", header: "Notice Deadline", render: (item) => formatDate(item.notice_deadline) },
          {
            key: "status",
            header: "Status",
            render: (item) => <StatusBadge status={item.status} />,
          },
          { key: "owner", header: "Owner", render: (item) => item.owner_email },
        ]}
      />
    </div>
  );
}
