import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "@/components/primitives/Button";

export function Modal({ open, title, onClose, footer, children }: PropsWithChildren<{ open: boolean; title: string; onClose: () => void; footer?: ReactNode }>) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-lg transition-opacity duration-150">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface p-xl shadow-card transition-all duration-150">
        <div className="mb-lg flex items-center justify-between">
          <h2 className="text-h2">{title}</h2>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        <div className="space-y-md">{children}</div>
        {footer ? <div className="mt-lg flex justify-end gap-sm">{footer}</div> : null}
      </div>
    </div>
  );
}
