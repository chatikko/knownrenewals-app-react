import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractsApi } from "@/api/contracts";
import { Alert } from "@/components/primitives/Alert";
import { Card } from "@/components/primitives/Card";
import { Input } from "@/components/primitives/Input";
import { Select } from "@/components/primitives/Select";
import { Button } from "@/components/primitives/Button";
import { REMINDER_PRESETS, RENEWAL_TYPES, formatContractName } from "@/lib/renewals";

const schema = z.object({
  vendor_name: z.string().min(1),
  renewal_type: z.enum(RENEWAL_TYPES),
  renewal_name: z.string().min(1),
  renewal_date: z.string().min(1),
  notice_period_days: z.coerce.number().int().min(0),
  owner_email: z.string().email(),
});

type Form = z.infer<typeof schema>;

export function AddContractPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const form = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      vendor_name: "",
      renewal_type: "Contract",
      renewal_name: "",
      renewal_date: "",
      notice_period_days: 30,
      owner_email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: contractsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contracts"] });
      navigate("/contracts");
    },
  });

  return (
    <Card className="max-w-2xl">
      <h1 className="mb-lg text-h1">Add Contract</h1>
      <form
        className="space-y-md"
        onSubmit={form.handleSubmit((values) =>
          mutation.mutate({
            vendor_name: values.vendor_name,
            renewal_type: values.renewal_type,
            renewal_name: values.renewal_name,
            contract_name: formatContractName(values.renewal_type, values.renewal_name),
            renewal_date: values.renewal_date,
            notice_period_days: values.notice_period_days,
            owner_email: values.owner_email,
          }),
        )}
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
        {mutation.isError ? <Alert tone="danger" message="Could not save contract." /> : null}
        <Button isLoading={mutation.isPending}>Save Contract</Button>
      </form>
    </Card>
  );
}
