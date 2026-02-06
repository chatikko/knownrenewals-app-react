import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { contractsApi } from "@/api/contracts";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { Badge } from "@/components/primitives/Badge";
import { EmptyState, ErrorState, LoadingState } from "@/components/QueryState";
import { formatDate } from "@/lib/format";

export function ContractsPage() {
  const query = useQuery({ queryKey: ["contracts"], queryFn: contractsApi.list });
  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load contracts." />;
  if (!query.data) return <EmptyState message="No contracts found." />;
  const data = query.data;

  return (
    <div className="space-y-md">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Contracts</h1>
        <Link to="/contracts/new"><Button>Add Contract</Button></Link>
      </div>
      {!data.items.length ? <EmptyState message="No contracts found." /> : (
        <Card className="p-0">
          <Table
            items={data.items}
            rowKey={(item) => item.id}
            columns={[
              { key: "vendor", header: "Vendor", render: (item) => item.vendor_name },
              { key: "contract", header: "Contract", render: (item) => item.contract_name ?? "-" },
              { key: "renewal", header: "Renewal", render: (item) => formatDate(item.renewal_date) },
              { key: "notice", header: "Notice", render: (item) => formatDate(item.notice_deadline) },
              { key: "status", header: "Status", render: (item) => <Badge status={item.status} /> },
              { key: "open", header: "", render: (item) => <Link className="text-primary hover:underline" to={`/contracts/${item.id}`}>Open</Link> },
            ]}
          />
        </Card>
      )}
    </div>
  );
}
