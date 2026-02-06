import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/api/auth";
import { Alert } from "@/components/primitives/Alert";
import { Card } from "@/components/primitives/Card";
import { Input } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";

const schema = z.object({ token: z.string().min(1) });
type Form = z.infer<typeof schema>;

export function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = useMemo(() => params.get("token") ?? "", [params]);
  const form = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { token },
  });
  const mutation = useMutation({ mutationFn: authApi.verifyEmail });

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-lg">
      <div className="absolute right-lg top-lg">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <h1 className="mb-lg text-center text-h1">Verify Email</h1>
        <form className="space-y-md" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Input required label="Verification Token" {...form.register("token")} error={form.formState.errors.token?.message} />
          {mutation.isSuccess ? <Alert tone="success" message="Email verified. You can now log in." /> : null}
          {mutation.isError ? <Alert tone="danger" message="Verification failed." /> : null}
          <Button className="w-full" isLoading={mutation.isPending}>Verify Email</Button>
        </form>
      </Card>
    </div>
  );
}
