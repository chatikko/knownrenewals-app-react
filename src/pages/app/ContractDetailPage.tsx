import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contractsApi } from "@/api/contracts";
import { Alert } from "@/components/primitives/Alert";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { Input } from "@/components/primitives/Input";
import { Modal } from "@/components/primitives/Modal";
import { LoadingState, ErrorState } from "@/components/QueryState";
import { formatDate, toDateInputValue } from "@/lib/format";

export function ContractDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showDelete, setShowDelete] = useState(false);

  const query = useQuery({ queryKey: ["contracts", id], queryFn: () => contractsApi.get(id!), enabled: Boolean(id) });

  const update = useMutation({
    mutationFn: (payload: { renewal_date: string; notice_period_days: number }) => contractsApi.update(id!, payload),
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
  const defaults = { renewal_date: toDateInputValue(c.renewal_date), notice_period_days: String(c.notice_period_days) };

  return (
    <div className="space-y-lg">
      <Card className="space-y-sm">
        <h1 className="text-h1">{c.vendor_name}</h1>
        <p className="text-text-secondary">Renewal Date: {formatDate(c.renewal_date)}</p>
        <p className="text-text-secondary">Notice Deadline: {formatDate(c.notice_deadline)}</p>
        <Badge status={c.status} />
      </Card>

      <Card>
        <h2 className="mb-md text-h2">Edit Contract</h2>
        <form className="space-y-md" onSubmit={(e) => {
          e.preventDefault();
          update.reset();
          const fd = new FormData(e.currentTarget);
          update.mutate({ renewal_date: String(fd.get("renewal_date")), notice_period_days: Number(fd.get("notice_period_days")) });
        }}>
          <Input required label="Renewal Date" name="renewal_date" type="date" defaultValue={defaults.renewal_date} />
          <Input required label="Notice Period (days)" name="notice_period_days" type="number" defaultValue={defaults.notice_period_days} />
          {update.isSuccess ? <Alert tone="success" message="Contract updated successfully." /> : null}
          {update.isError ? <Alert tone="danger" message="Failed to update contract." /> : null}
          <div className="flex gap-sm">
            <Button isLoading={update.isPending}>Save</Button>
            <Button type="button" variant="danger" onClick={() => setShowDelete(true)}>Delete Contract</Button>
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
