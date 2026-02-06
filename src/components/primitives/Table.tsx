import type { ReactNode } from "react";

type Column<T> = { key: string; header: string; render: (item: T) => ReactNode };

export function Table<T>({ columns, items, rowKey }: { columns: Column<T>[]; items: T[]; rowKey: (item: T) => string }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="min-w-full border-collapse text-left [font-family:Inter,sans-serif]">
        <thead className="sticky top-0 bg-background">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-lg py-sm text-small font-semibold uppercase tracking-wider text-text-secondary">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={rowKey(item)} className="border-t border-border transition-all duration-150 hover:bg-background hover:shadow-sm">
              {columns.map((col) => <td key={col.key} className="px-lg py-md align-middle text-body text-text-primary">{col.render(item)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
