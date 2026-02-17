import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/api/admin";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Pagination } from "@/components/primitives/Pagination";
import { Table } from "@/components/primitives/Table";
import { EmptyState, ErrorState, LoadingState } from "@/components/QueryState";

const limit = 20;

function formatDateTime(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

export function AdminLeadMagnetPage() {
  const [skip, setSkip] = useState(0);
  const statsQuery = useQuery({
    queryKey: ["admin", "lead-magnets", "renewal-template", "stats"],
    queryFn: adminApi.leadMagnets.stats,
  });
  const listKey = useMemo(() => ["admin", "lead-magnets", "renewal-template", skip, limit] as const, [skip]);
  const listQuery = useQuery({
    queryKey: listKey,
    queryFn: () => adminApi.leadMagnets.list(skip, limit),
  });

  const handleDownloadCsv = async () => {
    const blob = await adminApi.leadMagnets.downloadCsv();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "knowrenewals-renewal-template-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (statsQuery.isLoading || listQuery.isLoading) return <LoadingState />;
  if (statsQuery.isError) return <ErrorState message="Failed to load lead magnet stats." />;
  if (listQuery.isError) return <ErrorState message="Failed to load lead magnet submissions." />;

  const stats = statsQuery.data;
  const rows = listQuery.data?.items ?? [];
  const total = listQuery.data?.total ?? 0;

  return (
    <div className="space-y-md">
      <div className="flex items-center justify-between gap-md">
        <h1 className="text-h1">Admin Lead Magnets</h1>
        <Button variant="secondary" onClick={handleDownloadCsv}>
          Export CSV
        </Button>
      </div>

      <div className="grid gap-md md:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="text-small text-text-secondary">Total submissions</p>
          <p className="mt-xs text-h2">{stats?.total_submissions ?? 0}</p>
        </Card>
        <Card>
          <p className="text-small text-text-secondary">Successful sends</p>
          <p className="mt-xs text-h2">{stats?.successful_sends ?? 0}</p>
        </Card>
        <Card>
          <p className="text-small text-text-secondary">Unique emails</p>
          <p className="mt-xs text-h2">{stats?.unique_emails ?? 0}</p>
        </Card>
        <Card>
          <p className="text-small text-text-secondary">Failed deliveries</p>
          <p className="mt-xs text-h2">{stats?.failed_deliveries ?? 0}</p>
        </Card>
        <Card>
          <p className="text-small text-text-secondary">Skipped submissions</p>
          <p className="mt-xs text-h2">{stats?.skipped_submissions ?? 0}</p>
        </Card>
      </div>

      {!rows.length ? (
        <EmptyState message="No lead magnet submissions found." />
      ) : (
        <>
          <Card className="p-0">
            <Table
              items={rows}
              rowKey={(item) => item.id}
              columns={[
                { key: "created", header: "Submitted", render: (item) => formatDateTime(item.created_at) },
                { key: "email", header: "Email", render: (item) => item.email },
                { key: "status", header: "Status", render: (item) => item.status },
                { key: "sent", header: "Sent At", render: (item) => formatDateTime(item.sent_at) },
                { key: "source", header: "Source Path", render: (item) => item.source_path ?? "-" },
                { key: "utm", header: "UTM Campaign", render: (item) => item.utm_campaign ?? "-" },
              ]}
            />
          </Card>
          <Pagination skip={skip} limit={limit} total={total} onChange={setSkip} />
        </>
      )}
    </div>
  );
}

export default AdminLeadMagnetPage;
