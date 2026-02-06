import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contractsApi } from "@/api/contracts";
import { Alert } from "@/components/primitives/Alert";
import { Card } from "@/components/primitives/Card";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";

const schema = z.object({
  vendor_name: z.string().min(1),
  contract_name: z.string().optional(),
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
    defaultValues: { vendor_name: "", contract_name: "", renewal_date: "", notice_period_days: 30, owner_email: "" },
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
      <form className="space-y-md" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
        <Input required label="Vendor Name" {...form.register("vendor_name")} error={form.formState.errors.vendor_name?.message} />
        <Input label="Contract Name" {...form.register("contract_name")} error={form.formState.errors.contract_name?.message} />
        <Input required label="Renewal Date" type="date" {...form.register("renewal_date")} error={form.formState.errors.renewal_date?.message} />
        <Input required label="Notice Period (days)" type="number" {...form.register("notice_period_days")} error={form.formState.errors.notice_period_days?.message} />
        <Input required label="Owner Email" {...form.register("owner_email")} error={form.formState.errors.owner_email?.message} />
        {mutation.isError ? <Alert tone="danger" message="Could not save contract." /> : null}
        <Button isLoading={mutation.isPending}>Save Contract</Button>
      </form>
    </Card>
  );
}
