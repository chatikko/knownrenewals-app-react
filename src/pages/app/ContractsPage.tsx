import { Link, useSearchParams } from "react-router-dom";
import { useRef, useState, type ChangeEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { contractsApi } from "@/api/contracts";
import { billingApi } from "@/api/billing";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Table } from "@/components/primitives/Table";
import { Badge } from "@/components/primitives/Badge";
import { Alert } from "@/components/primitives/Alert";
import { EmptyState, ErrorState, LoadingState } from "@/components/QueryState";
import { formatDate } from "@/lib/format";
import { extractRenewal, formatContractName, type RenewalType } from "@/lib/renewals";
import { trackEvent } from "@/lib/analytics";

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

function parseSpreadsheetRows(content: ArrayBuffer): string[][] {
  const workbook = XLSX.read(content, { type: "array", cellDates: true });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) return [];
  const worksheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json<Array<string | number | boolean | Date | null>>(worksheet, {
    header: 1,
    raw: true,
    defval: "",
  });
  return rows.map((row) =>
    row.map((cell) => {
      if (cell === null || cell === undefined) return "";
      if (cell instanceof Date) return cell.toISOString().slice(0, 10);
      return String(cell).trim();
    }),
  );
}

async function parseImportRows(file: File): Promise<string[][]> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv")) {
    const text = await file.text();
    return parseCsv(text);
  }
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
    const content = await file.arrayBuffer();
    return parseSpreadsheetRows(content);
  }
  throw new Error("Unsupported file type. Use CSV, XLSX, or XLS.");
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ");
}

function indexByAliases(headers: string[], aliases: string[]): number {
  const normalizedAliases = aliases.map((alias) => normalizeHeader(alias));
  return headers.findIndex((header) => normalizedAliases.includes(header));
}

function parseOptionalNumber(value: string): number | undefined {
  const text = value.trim().replace(/,/g, "").replace(/[^0-9.-]/g, "");
  if (!text) return undefined;
  const parsed = Number(text);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function parseOptionalBoolean(value: string): boolean | undefined {
  const text = value.trim().toLowerCase();
  if (!text) return undefined;
  if (["yes", "true", "1", "y"].includes(text)) return true;
  if (["no", "false", "0", "n"].includes(text)) return false;
  return undefined;
}

function normalizeDateInput(value: string): string {
  const text = value.trim();
  if (!text) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  const maybeSerial = Number(text);
  if (!Number.isNaN(maybeSerial) && Number.isFinite(maybeSerial)) {
    const parsed = XLSX.SSF.parse_date_code(maybeSerial);
    if (parsed && parsed.y && parsed.m && parsed.d) {
      const date = new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
      return date.toISOString().slice(0, 10);
    }
  }

  const date = new Date(text);
  if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
  return text;
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

function inferTypeFromCategory(category: string): RenewalType {
  const normalized = category.trim().toLowerCase();
  if (!normalized) return "Contract";
  const byCategory: Record<string, RenewalType> = {
    saas: "Subscription",
    software: "Subscription",
    subscription: "Subscription",
    domain: "Domain",
    certificate: "Certificate",
    license: "License",
    insurance: "Other",
    vendor: "Contract",
    contract: "Contract",
  };
  return byCategory[normalized] ?? "Contract";
}

function normalizeExternalContractId(value: string): string {
  return value.trim().toLowerCase();
}

export function ContractsPage() {
  const [searchParams] = useSearchParams();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ tone: "success" | "danger"; text: string } | null>(null);
  const query = useQuery({ queryKey: ["contracts"], queryFn: contractsApi.list });
  const billingQuery = useQuery({ queryKey: ["billing", "status"], queryFn: billingApi.status, retry: false });
  const readOnlyMode = Boolean(billingQuery.data?.read_only_mode);
  const isTemplateOnboarding = searchParams.get("onboarding") === "import-template";
  if (query.isLoading) return <LoadingState />;
  if (query.isError) return <ErrorState message="Failed to load contracts." />;
  if (!query.data) return <EmptyState message="No contracts found." />;
  const data = query.data;

  const downloadCsv = () => {
    const header = [
      "external_contract_id",
      "vendor_name",
      "category",
      "renewal_type",
      "renewal_name",
      "start_date",
      "renewal_date",
      "billing_frequency",
      "contract_value",
      "annualized_value",
      "auto_renew",
      "notice_period_days",
      "owner_email",
      "notes",
      "status",
    ];
    const rows = data.items.map((item) => {
      const parsed = extractRenewal(item);
      return [
        item.external_contract_id ?? "",
        item.vendor_name,
        item.category ?? "",
        parsed.renewalType,
        parsed.renewalName || item.vendor_name,
        item.start_date ? item.start_date.slice(0, 10) : "",
        item.renewal_date.slice(0, 10),
        item.billing_frequency ?? "",
        item.contract_value?.toString() ?? "",
        item.annualized_value?.toString() ?? "",
        item.auto_renew === null || item.auto_renew === undefined ? "" : (item.auto_renew ? "Yes" : "No"),
        String(item.notice_period_days),
        item.owner_email,
        item.notes ?? "",
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
    const header = [
      "Contract ID",
      "Contract Name",
      "Vendor",
      "Category",
      "Start Date",
      "Renewal Date",
      "Billing Frequency",
      "Contract Value",
      "Auto Renew",
      "Notice Period (Days)",
      "Renewal Notice Date",
      "Days Until Renewal",
      "Renewal Status",
      "Owner",
      "Notes",
      "Annualized Value",
    ];
    const sample = [
      "KR-001",
      "CRM Platform",
      "Acme CRM",
      "SaaS",
      "2025-03-01",
      "2026-03-01",
      "Annual",
      "12000",
      "Yes",
      "30",
      "",
      "",
      "",
      "ops@acme.com",
      "Primary CRM used by sales and customer success.",
      "12000",
    ];
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
    if (readOnlyMode) {
      event.target.value = "";
      return;
    }
    const file = event.target.files?.[0];
    if (!file) return;
    if (isTemplateOnboarding) {
      trackEvent("template_import_started", {
        location: "contracts_import",
        file_type: file.name.split(".").pop()?.toLowerCase() ?? "unknown",
      });
    }
    setMessage(null);
    setImporting(true);

    try {
      const rows = await parseImportRows(file);
      if (rows.length < 2) throw new Error("File must include header and at least one row.");

      const headers = rows[0].map((h) => normalizeHeader(h));
      const col = {
        vendor: indexByAliases(headers, ["vendor_name", "vendor"]),
        renewalDate: indexByAliases(headers, ["renewal_date", "renewal date"]),
        noticeDays: indexByAliases(headers, ["notice_period_days", "notice period (days)", "notice period days"]),
        owner: indexByAliases(headers, ["owner_email", "owner"]),
        renewalType: indexByAliases(headers, ["renewal_type", "renewal type"]),
        renewalName: indexByAliases(headers, ["renewal_name", "renewal name", "contract_name", "contract name"]),
        externalContractId: indexByAliases(headers, ["external_contract_id", "external contract id", "contract_id", "contract id"]),
        category: indexByAliases(headers, ["category"]),
        startDate: indexByAliases(headers, ["start_date", "start date"]),
        billingFrequency: indexByAliases(headers, ["billing_frequency", "billing frequency"]),
        contractValue: indexByAliases(headers, ["contract_value", "contract value"]),
        annualizedValue: indexByAliases(headers, ["annualized_value", "annualized value"]),
        autoRenew: indexByAliases(headers, ["auto_renew", "auto renew"]),
        notes: indexByAliases(headers, ["notes"]),
      };

      if (col.renewalDate === -1) {
        throw new Error("Missing required column: renewal date.");
      }

      let created = 0;
      let duplicateSkipped = 0;
      let failed = 0;
      let missingContractId = 0;
      const existingExternalIds = new Set(
        data.items
          .map((item) => normalizeExternalContractId(item.external_contract_id ?? ""))
          .filter(Boolean),
      );
      const seenExternalIds = new Set(existingExternalIds);

      for (const row of rows.slice(1)) {
        if (!row.length || row.every((cell) => cell.trim() === "")) continue;
        const valueAt = (index: number) => (index >= 0 ? (row[index] ?? "").trim() : "");
        const vendor = valueAt(col.vendor) || valueAt(col.renewalName) || "Unknown Vendor";
        const renewalDate = normalizeDateInput(valueAt(col.renewalDate));
        const noticeDaysRaw = valueAt(col.noticeDays);
        const ownerEmail = valueAt(col.owner);
        const category = valueAt(col.category);
        const typeRaw = valueAt(col.renewalType);
        const nameRaw = valueAt(col.renewalName);
        const noticeDays = noticeDaysRaw ? Number(noticeDaysRaw) : 30;
        const externalContractId = valueAt(col.externalContractId);
        const normalizedExternalContractId = normalizeExternalContractId(externalContractId);
        const startDate = normalizeDateInput(valueAt(col.startDate));
        const billingFrequency = valueAt(col.billingFrequency);
        const contractValue = parseOptionalNumber(valueAt(col.contractValue));
        const annualizedValue = parseOptionalNumber(valueAt(col.annualizedValue));
        const autoRenew = parseOptionalBoolean(valueAt(col.autoRenew));
        const notes = valueAt(col.notes);
        const renewalType = typeRaw ? normalizeType(typeRaw) : inferTypeFromCategory(category);
        const renewalName = nameRaw || vendor;
        let addedToSeen = false;

        if (normalizedExternalContractId) {
          if (seenExternalIds.has(normalizedExternalContractId)) {
            duplicateSkipped += 1;
            continue;
          }
          seenExternalIds.add(normalizedExternalContractId);
          addedToSeen = true;
        } else {
          missingContractId += 1;
        }

        if (!renewalDate || Number.isNaN(noticeDays)) {
          failed += 1;
          if (addedToSeen) {
            seenExternalIds.delete(normalizedExternalContractId);
          }
          continue;
        }

        try {
          await contractsApi.create({
            vendor_name: vendor,
            external_contract_id: externalContractId || undefined,
            category: category || undefined,
            renewal_type: renewalType,
            renewal_name: renewalName,
            contract_name: formatContractName(renewalType, renewalName),
            start_date: startDate || undefined,
            renewal_date: renewalDate,
            billing_frequency: billingFrequency || undefined,
            contract_value: contractValue,
            annualized_value: annualizedValue,
            auto_renew: autoRenew,
            notice_period_days: noticeDays,
            owner_email: ownerEmail || undefined,
            notes: notes || undefined,
          });
          created += 1;
        } catch {
          failed += 1;
          if (addedToSeen) {
            seenExternalIds.delete(normalizedExternalContractId);
          }
        }
      }

      await qc.invalidateQueries({ queryKey: ["contracts"] });
      if (isTemplateOnboarding) {
        trackEvent("template_import_completed", {
          imported: created,
          skipped_duplicates: duplicateSkipped,
          failed,
          missing_contract_id: missingContractId,
        });
      }
      setMessage({
        tone: failed ? "danger" : "success",
        text: `Imported ${created}, skipped duplicates ${duplicateSkipped}, failed ${failed}, missing Contract ID ${missingContractId}.`,
      });
    } catch (error) {
      setMessage({ tone: "danger", text: error instanceof Error ? error.message : "Import failed." });
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
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            className="hidden"
            onChange={onImportFile}
          />
          <Button variant="secondary" onClick={downloadTemplate}>
            Download Blank Template
          </Button>
          <Button
            variant="secondary"
            isLoading={importing}
            disabled={readOnlyMode}
            onClick={() => {
              if (isTemplateOnboarding) {
                trackEvent("template_cta_clicked", { location: "contracts_page", action: "open_import" });
              }
              fileInputRef.current?.click();
            }}
          >
            Import File
          </Button>
          <Button variant="secondary" onClick={downloadCsv}>
            Export Filled File (CSV)
          </Button>
          <Link to="/contracts/new"><Button disabled={readOnlyMode}>Add Contract</Button></Link>
        </div>
      </div>
      {isTemplateOnboarding ? (
        <Alert
          tone="info"
          message="Upload your filled template file to auto-sync contracts. Use Download Blank Template only if you need a fresh file."
        />
      ) : null}
      {readOnlyMode ? (
        <Alert
          tone="warning"
          message={`Trial expired. Account is read-only${typeof billingQuery.data?.grace_days_left === "number" ? ` (${billingQuery.data.grace_days_left} grace day(s) left)` : ""}. Upgrade to create or import contracts.`}
        />
      ) : null}
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
