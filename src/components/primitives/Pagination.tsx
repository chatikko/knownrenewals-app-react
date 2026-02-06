import { Button } from "@/components/primitives/Button";

export function Pagination({ skip, limit, total, onChange }: { skip: number; limit: number; total: number; onChange: (nextSkip: number) => void }) {
  const page = Math.floor(skip / limit) + 1;
  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="flex items-center justify-between gap-md">
      <span className="text-small text-text-secondary">Page {page} of {pages}</span>
      <div className="flex gap-sm">
        <Button variant="secondary" disabled={skip === 0} onClick={() => onChange(Math.max(0, skip - limit))}>Previous</Button>
        <Button variant="secondary" disabled={skip + limit >= total} onClick={() => onChange(skip + limit)}>Next</Button>
      </div>
    </div>
  );
}
