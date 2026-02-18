import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contractsApi } from "@/api/contracts";
import { billingApi } from "@/api/billing";
import { Alert } from "@/components/primitives/Alert";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { Input } from "@/components/primitives/Input";
import { Modal } from "@/components/primitives/Modal";
import { Select } from "@/components/primitives/Select";
import { LoadingState, ErrorState } from "@/components/QueryState";
import { formatDate, toDateInputValue } from "@/lib/format";
import { BILLING_FREQUENCIES, REMINDER_PRESETS, RENEWAL_TYPES, extractRenewal, formatContractName } from "@/lib/renewals";

const cleanOptionalText = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  return text ? text : undefined;
};

const cleanOptionalNumber = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  if (!text) return undefined;
  const parsed = Number(text);
  return Number.isNaN(parsed) ? undefined : parsed;
};

export function ContractDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);

  const query = useQuery({ queryKey: ["contracts", id], queryFn: () => contractsApi.get(id!), enabled: Boolean(id) });
  const billingQuery = useQuery({ queryKey: ["billing", "status"], queryFn: billingApi.status, retry: false });
  const readOnlyMode = Boolean(billingQuery.data?.read_only_mode);

  const update = useMutation({
    mutationFn: (payload: {
      external_contract_id?: string;
      category?: string;
      start_date?: string;
      renewal_date: string;
      billing_frequency?: string;
      contract_value?: number;
      annualized_value?: number;
      auto_renew?: boolean;
      notice_period_days: number;
      notes?: string;
      contract_name: string;
      renewal_type: string;
      renewal_name: string;
    }) => contractsApi.update(id!, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contracts"] });
      qc.invalidateQueries({ queryKey: ["contracts", id] });
    },
  });

  const remove = useMutation({
    mutationFn: () => contractsApi.remove(id!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contracts"] });
      navigate("/contracts");
    },
  });

  useEffect(() => {
    if (!update.isSuccess && !update.isError) return;
    const timer = setTimeout(() => update.reset(), 2000);
    return () => clearTimeout(timer);
  }, [update.isSuccess, update.isError, update.reset]);

  if (query.isLoading) return <LoadingState />;
  if (query.isError || !query.data) return <ErrorState message="Contract not found." />;

  const c = query.data;
  const parsed = extractRenewal(c);
  const defaults = { renewal_date: toDateInputValue(c.renewal_date), notice_period_days: String(c.notice_period_days) };

  return (
    <div className="space-y-lg">
      <Card className="space-y-sm">
        <h1 className="text-h1">{c.vendor_name}</h1>
        <p className="text-text-secondary">Renewal Type: {parsed.renewalType}</p>
        <p className="text-text-secondary">Renewal Name: {parsed.renewalName || "-"}</p>
        <p className="text-text-secondary">Category: {c.category || "-"}</p>
        <p className="text-text-secondary">Billing Frequency: {c.billing_frequency || "-"}</p>
        <p className="text-text-secondary">Renewal Date: {formatDate(c.renewal_date)}</p>
        <p className="text-text-secondary">Notice Deadline: {formatDate(c.notice_deadline)}</p>
        <Badge status={c.status} />
      </Card>

      <Card>
        <h2 className="mb-md text-h2">Edit Contract</h2>
        <form className="space-y-md" onSubmit={(e) => {
          e.preventDefault();
          if (readOnlyMode) return;
          update.reset();
          const fd = new FormData(e.currentTarget);
          const renewalType = String(fd.get("renewal_type")) as (typeof RENEWAL_TYPES)[number];
          const renewalName = String(fd.get("renewal_name"));
          update.mutate({
            renewal_type: renewalType,
            renewal_name: renewalName,
            contract_name: formatContractName(renewalType, renewalName),
            external_contract_id: cleanOptionalText(fd.get("external_contract_id")),
            category: cleanOptionalText(fd.get("category")),
            start_date: cleanOptionalText(fd.get("start_date")),
            renewal_date: String(fd.get("renewal_date")),
            billing_frequency: cleanOptionalText(fd.get("billing_frequency")),
            contract_value: cleanOptionalNumber(fd.get("contract_value")),
            annualized_value: cleanOptionalNumber(fd.get("annualized_value")),
            auto_renew: fd.get("auto_renew") === "on",
            notice_period_days: Number(fd.get("notice_period_days")),
            notes: cleanOptionalText(fd.get("notes")),
          });
        }}>
          {readOnlyMode ? (
            <Alert
              tone="warning"
              message={`Trial expired. Account is read-only${typeof billingQuery.data?.grace_days_left === "number" ? ` (${billingQuery.data.grace_days_left} grace day(s) left)` : ""}. Upgrade to edit contracts.`}
            />
          ) : null}
          <Select
            label="Renewal Type"
            name="renewal_type"
            defaultValue={parsed.renewalType}
            options={RENEWAL_TYPES.map((type) => ({ label: type, value: type }))}
          />
          <Input required label="Renewal Name" name="renewal_name" defaultValue={parsed.renewalName || c.vendor_name} />
          <Input required label="Renewal Date" name="renewal_date" type="date" defaultValue={defaults.renewal_date} />
          <Input required label="Notice Period (days)" name="notice_period_days" type="number" defaultValue={defaults.notice_period_days} />
          <details className="rounded-md border border-border bg-background p-md">
            <summary className="cursor-pointer text-small font-semibold text-text-secondary">Advanced Fields</summary>
            <div className="mt-md space-y-md">
              <Input label="Contract ID (External)" name="external_contract_id" defaultValue={c.external_contract_id || ""} />
              <Input label="Category" name="category" defaultValue={c.category || ""} />
              <Input
                label="Start Date"
                name="start_date"
                type="date"
                defaultValue={c.start_date ? new Date(c.start_date).toISOString().slice(0, 10) : ""}
              />
              <Select
                label="Billing Frequency"
                name="billing_frequency"
                defaultValue={c.billing_frequency || ""}
                options={[
                  { label: "Select frequency", value: "" },
                  ...BILLING_FREQUENCIES.map((frequency) => ({ label: frequency, value: frequency })),
                ]}
              />
              <Input label="Contract Value" name="contract_value" type="number" step="0.01" defaultValue={c.contract_value?.toString() || ""} />
              <Input label="Annualized Value" name="annualized_value" type="number" step="0.01" defaultValue={c.annualized_value?.toString() || ""} />
              <label className="inline-flex items-center gap-xs rounded-md border border-border bg-surface px-md py-sm text-small text-text-secondary">
                <input type="checkbox" name="auto_renew" defaultChecked={Boolean(c.auto_renew)} />
                Auto Renew
              </label>
              <label className="flex flex-col gap-xs">
                <span className="text-small text-text-secondary">Notes</span>
                <textarea
                  name="notes"
                  defaultValue={c.notes || ""}
                  className="w-full rounded-md border border-border bg-surface px-md py-sm text-body outline-none transition-all duration-150 hover:border-[var(--color-border-hover)] focus-visible:shadow-focus"
                  rows={4}
                />
              </label>
            </div>
          </details>
          <p className="text-small text-text-secondary">
            Common reminder schedules: {REMINDER_PRESETS.map((preset) => preset.label).join(", ")}.
          </p>
          {update.isSuccess ? <Alert tone="success" message="Contract updated successfully." /> : null}
          {update.isError ? <Alert tone="danger" message="Failed to update contract." /> : null}
          <div className="flex gap-sm">
            <Button isLoading={update.isPending} disabled={readOnlyMode}>Save</Button>
            <Button type="button" variant="danger" disabled={readOnlyMode} onClick={() => setShowDelete(true)}>Delete Contract</Button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="mb-md text-h2">Activity Log</h2>
        <p className="text-small text-text-secondary">No activity entries from API yet.</p>
      </Card>

      <Modal
        open={showDelete}
        title="Delete Contract"
        onClose={() => setShowDelete(false)}
        footer={<><Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button><Button variant="danger" isLoading={remove.isPending} onClick={() => remove.mutate()}>Confirm Delete</Button></>}
      >
        <p className="text-text-secondary">This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
