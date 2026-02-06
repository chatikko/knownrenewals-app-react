import { Card } from "@/components/primitives/Card";

export function LoadingState() {
  return (
    <Card>
      <div className="space-y-sm">
        <div className="h-4 w-1/3 animate-pulse rounded bg-background" />
        <div className="h-4 w-full animate-pulse rounded bg-background" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-background" />
      </div>
    </Card>
  );
}

export function ErrorState({ message }: { message?: string }) {
  return <Card className="text-danger">{message ?? "Request failed."}</Card>;
}

export function EmptyState({ message }: { message: string }) {
  return <Card className="text-text-secondary">{message}</Card>;
}
