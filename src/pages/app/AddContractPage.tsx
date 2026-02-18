import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractsApi } from "@/api/contracts";
import { billingApi } from "@/api/billing";
import { Alert } from "@/components/primitives/Alert";
import { Card } from "@/components/primitives/Card";
import { Input } from "@/components/primitives/Input";
import { Select } from "@/components/primitives/Select";
import { Button } from "@/components/primitives/Button";
import { BILLING_FREQUENCIES, REMINDER_PRESETS, RENEWAL_TYPES, formatContractName } from "@/lib/renewals";

const optionalNonNegativeNumber = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  },
  z.number().min(0).optional(),
);

const cleanOptionalText = (value: string | undefined) => {
  const trimmed = (value ?? "").trim();
  return trimmed ? trimmed : undefined;
};

const schema = z.object({
  vendor_name: z.string().min(1),
  renewal_type: z.enum(RENEWAL_TYPES),
  external_contract_id: z.string().max(64).optional(),
  category: z.string().max(100).optional(),
  renewal_name: z.string().min(1),
  start_date: z.string().optional(),
  renewal_date: z.string().min(1),
  billing_frequency: z.enum(BILLING_FREQUENCIES).optional().or(z.literal("")),
  contract_value: optionalNonNegativeNumber,
  annualized_value: optionalNonNegativeNumber,
  auto_renew: z.boolean().optional(),
  notice_period_days: z.coerce.number().int().min(0),
  owner_email: z.string().email(),
  notes: z.string().max(2000).optional(),
});

type Form = z.infer<typeof schema>;

export function AddContractPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const billingQuery = useQuery({ queryKey: ["billing", "status"], queryFn: billingApi.status, retry: false });
  const form = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      vendor_name: "",
      renewal_type: "Contract",
      external_contract_id: "",
      category: "",
      renewal_name: "",
      start_date: "",
      renewal_date: "",
      billing_frequency: "",
      contract_value: undefined,
      annualized_value: undefined,
      auto_renew: false,
      notice_period_days: 30,
      owner_email: "",
      notes: "",
    },
  });

  const mutation = useMutation({
    mutationFn: contractsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contracts"] });
      navigate("/contracts");
    },
  });
  const readOnlyMode = Boolean(billingQuery.data?.read_only_mode);

  return (
    <Card className="max-w-2xl">
      <h1 className="mb-lg text-h1">Add Contract</h1>
      {readOnlyMode ? (
        <Alert
          tone="warning"
          message={`Trial expired. Account is read-only${typeof billingQuery.data?.grace_days_left === "number" ? ` (${billingQuery.data.grace_days_left} grace day(s) left)` : ""}. Upgrade to add contracts.`}
        />
      ) : null}
      <form
        className="space-y-md"
        onSubmit={form.handleSubmit((values) => {
          if (readOnlyMode) return;
          mutation.mutate({
            vendor_name: values.vendor_name,
            renewal_type: values.renewal_type,
            external_contract_id: cleanOptionalText(values.external_contract_id),
            category: cleanOptionalText(values.category),
            renewal_name: values.renewal_name,
            contract_name: formatContractName(values.renewal_type, values.renewal_name),
            start_date: cleanOptionalText(values.start_date),
            renewal_date: values.renewal_date,
            billing_frequency: values.billing_frequency || undefined,
            contract_value: values.contract_value,
            annualized_value: values.annualized_value,
            auto_renew: values.auto_renew ?? false,
            notice_period_days: values.notice_period_days,
            owner_email: values.owner_email,
            notes: cleanOptionalText(values.notes),
          });
        })}
      >
        <Input required label="Vendor Name" {...form.register("vendor_name")} error={form.formState.errors.vendor_name?.message} />
        <Select
          label="Renewal Type"
          value={form.watch("renewal_type")}
          onChange={(e) => form.setValue("renewal_type", e.target.value as Form["renewal_type"], { shouldValidate: true })}
          options={RENEWAL_TYPES.map((type) => ({ label: type, value: type }))}
        />
        <Input required label="Renewal Name" {...form.register("renewal_name")} error={form.formState.errors.renewal_name?.message} />
        <Input required label="Renewal Date" type="date" {...form.register("renewal_date")} error={form.formState.errors.renewal_date?.message} />
        <Select
          label="Reminder Schedule"
          value={String(form.watch("notice_period_days"))}
          onChange={(e) => form.setValue("notice_period_days", Number(e.target.value), { shouldValidate: true })}
          options={REMINDER_PRESETS.map((preset) => ({ label: preset.label, value: String(preset.value) }))}
        />
        <Input required label="Owner Email" {...form.register("owner_email")} error={form.formState.errors.owner_email?.message} />
        <details className="rounded-md border border-border bg-background p-md">
          <summary className="cursor-pointer text-small font-semibold text-text-secondary">Advanced Fields</summary>
          <div className="mt-md space-y-md">
            <Input label="Contract ID (External)" {...form.register("external_contract_id")} error={form.formState.errors.external_contract_id?.message} />
            <Input label="Category" {...form.register("category")} error={form.formState.errors.category?.message} />
            <Input label="Start Date" type="date" {...form.register("start_date")} error={form.formState.errors.start_date?.message} />
            <Select
              label="Billing Frequency"
              value={form.watch("billing_frequency") || ""}
              onChange={(e) => form.setValue("billing_frequency", e.target.value as Form["billing_frequency"], { shouldValidate: true })}
              options={[
                { label: "Select frequency", value: "" },
                ...BILLING_FREQUENCIES.map((frequency) => ({ label: frequency, value: frequency })),
              ]}
            />
            <Input label="Contract Value" type="number" step="0.01" {...form.register("contract_value")} error={form.formState.errors.contract_value?.message} />
            <Input label="Annualized Value" type="number" step="0.01" {...form.register("annualized_value")} error={form.formState.errors.annualized_value?.message} />
            <label className="inline-flex items-center gap-xs rounded-md border border-border bg-surface px-md py-sm text-small text-text-secondary">
              <input type="checkbox" {...form.register("auto_renew")} />
              Auto Renew
            </label>
            <label className="flex flex-col gap-xs">
              <span className="text-small text-text-secondary">Notes</span>
              <textarea
                className="w-full rounded-md border border-border bg-surface px-md py-sm text-body outline-none transition-all duration-150 hover:border-[var(--color-border-hover)] focus-visible:shadow-focus"
                rows={4}
                {...form.register("notes")}
              />
            </label>
          </div>
        </details>
        {mutation.isError ? <Alert tone="danger" message="Could not save contract." /> : null}
        <Button isLoading={mutation.isPending} disabled={readOnlyMode}>Save Contract</Button>
      </form>
    </Card>
  );
}
