import { Link } from "react-router-dom";
import { useRef, useState, type ChangeEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { contractsApi } from "@/api/contracts";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { Badge } from "@/components/primitives/Badge";
import { Alert } from "@/components/primitives/Alert";
import { EmptyState, ErrorState, LoadingState } from "@/components/QueryState";
import { formatDate } from "@/lib/format";
import { extractRenewal, formatContractName, type RenewalType } from "@/lib/renewals";

function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter(Boolean);
  for (const line of lines) {
    const cells: string[] = [];
    let cell = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === "\"") {
        if (inQuotes && line[i + 1] === "\"") {
          cell += "\"";
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (char === "," && !inQuotes) {
        cells.push(cell.trim());
        cell = "";
        continue;
      }
      cell += char;
    }
    cells.push(cell.trim());
    rows.push(cells);
  }
  return rows;
}

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
    return `"${value.replace(/"/g, "\"\"")}"`;
  }
  return value;
}

function normalizeType(type: string): RenewalType {
  const lookup: Record<string, RenewalType> = {
    subscription: "Subscription",
    contract: "Contract",
    license: "License",
    domain: "Domain",
    certificate: "Certificate",
    other: "Other",
  };
  return lookup[type.trim().toLowerCase()] ?? "Contract";
}

export function ContractsPage() {
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "danger"; text: string } | null>(null);
  const query = useQuery({ queryKey: ["contracts"], queryFn: contractsApi.list });
  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load contracts." />;
  if (!query.data) return <EmptyState message="No contracts found." />;
  const data = query.data;

  const downloadCsv = () => {
    const header = ["vendor_name", "renewal_type", "renewal_name", "renewal_date", "notice_period_days", "owner_email", "status"];
    const rows = data.items.map((item) => {
      const parsed = extractRenewal(item);
      return [
        item.vendor_name,
        parsed.renewalType,
        parsed.renewalName || item.vendor_name,
        item.renewal_date.slice(0, 10),
        String(item.notice_period_days),
        item.owner_email,
        item.status,
      ].map(escapeCsv).join(",");
    });
    const csv = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "knowrenewals-contracts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    const header = ["vendor_name", "renewal_type", "renewal_name", "renewal_date", "notice_period_days", "owner_email"];
    const sample = ["Acme Inc", "Subscription", "CRM Platform", "2026-06-30", "30", "ops@acme.com"];
    const csv = [header.join(","), sample.join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "knowrenewals-contracts-template.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const onImportFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setMessage(null);
    setImporting(true);

    try {
      const text = await file.text();
      const rows = parseCsv(text);
      if (rows.length < 2) throw new Error("CSV must include header and at least one row.");

      const headers = rows[0].map((h) => h.trim().toLowerCase());
      const indexOf = (name: string) => headers.indexOf(name);
      const required = ["vendor_name", "renewal_date", "notice_period_days", "owner_email"];
      for (const key of required) {
        if (indexOf(key) === -1) throw new Error(`Missing required column: ${key}`);
      }

      let created = 0;
      let failed = 0;
      for (const row of rows.slice(1)) {
        if (!row.length || row.every((cell) => cell.trim() === "")) continue;
        const vendor = row[indexOf("vendor_name")]?.trim();
        const renewalDate = row[indexOf("renewal_date")]?.trim();
        const noticeDaysRaw = row[indexOf("notice_period_days")]?.trim();
        const ownerEmail = row[indexOf("owner_email")]?.trim();
        const typeRaw = indexOf("renewal_type") >= 0 ? row[indexOf("renewal_type")]?.trim() : "";
        const nameRaw = indexOf("renewal_name") >= 0 ? row[indexOf("renewal_name")]?.trim() : "";
        const noticeDays = Number(noticeDaysRaw);

        if (!vendor || !renewalDate || !ownerEmail || Number.isNaN(noticeDays)) {
          failed += 1;
          continue;
        }

        try {
          await contractsApi.create({
            vendor_name: vendor,
            contract_name: formatContractName(normalizeType(typeRaw), nameRaw || vendor),
            renewal_date: renewalDate,
            notice_period_days: noticeDays,
            owner_email: ownerEmail,
          });
          created += 1;
        } catch {
          failed += 1;
        }
      }

      await qc.invalidateQueries({ queryKey: ["contracts"] });
      setMessage({
        tone: failed ? "danger" : "success",
        text: failed ? `Imported ${created} row(s), failed ${failed} row(s).` : `Imported ${created} row(s) successfully.`,
      });
    } catch (error) {
      setMessage({ tone: "danger", text: error instanceof Error ? error.message : "CSV import failed." });
    } finally {
      setImporting(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center justify-between">
        <h1 className="text-h1">Contracts</h1>
        <div className="flex items-center gap-sm">
          <input ref={fileInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={onImportFile} />
          <Button variant="secondary" onClick={downloadTemplate}>
            Download Template
          </Button>
          <Button variant="secondary" isLoading={importing} onClick={() => fileInputRef.current?.click()}>
            Import CSV
          </Button>
          <Button variant="secondary" onClick={downloadCsv}>
            Export CSV
          </Button>
          <Link to="/contracts/new"><Button>Add Contract</Button></Link>
        </div>
      </div>
      {message ? <Alert tone={message.tone} message={message.text} /> : null}
      {!data.items.length ? <EmptyState message="No contracts found." /> : (
        <Card className="p-0">
          <Table
            items={data.items}
            rowKey={(item) => item.id}
            columns={[
              { key: "vendor", header: "Vendor", render: (item) => item.vendor_name },
              { key: "type", header: "Type", render: (item) => extractRenewal(item).renewalType },
              { key: "contract", header: "Renewal Name", render: (item) => extractRenewal(item).renewalName || "-" },
              { key: "renewal", header: "Renewal Date", render: (item) => formatDate(item.renewal_date) },
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
