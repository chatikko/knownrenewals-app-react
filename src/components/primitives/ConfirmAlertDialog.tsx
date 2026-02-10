import type { ReactNode } from "react";
import { Modal } from "@/components/primitives/Modal";
import { Button } from "@/components/primitives/Button";
import { Alert } from "@/components/primitives/Alert";

type Tone = "info" | "warning" | "danger";

export function ConfirmAlertDialog({
  open,
  title,
  message,
  tone = "info",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading,
  onConfirm,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  message: string;
  tone?: Tone;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button variant={tone === "danger" ? "danger" : "primary"} onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <Alert tone={tone === "danger" ? "danger" : tone === "warning" ? "warning" : "info"} message={message} />
      {children}
    </Modal>
  );
}
