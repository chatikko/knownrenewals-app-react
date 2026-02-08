import { useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
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
const resendSchema = z.object({ email: z.string().email() });
type Form = z.infer<typeof schema>;
type ResendForm = z.infer<typeof resendSchema>;

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
  const resendForm = useForm<ResendForm>({
    resolver: zodResolver(resendSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { email: "" },
  });
  const resendMutation = useMutation({ mutationFn: authApi.resendVerification });
  const hasQueryToken = token.length > 0;
  const hasAutoSubmitted = useRef(false);
  const verifyErrorMessage = mutation.isError && axios.isAxiosError<{ detail?: string }>(mutation.error)
    ? mutation.error.response?.data?.detail ?? "Verification failed."
    : "Verification failed.";
  const resendErrorMessage = resendMutation.isError && axios.isAxiosError<{ detail?: string }>(resendMutation.error)
    ? resendMutation.error.response?.data?.detail ?? "Could not resend verification email."
    : "Could not resend verification email.";

  useEffect(() => {
    if (!hasQueryToken || hasAutoSubmitted.current || mutation.isPending || mutation.isSuccess) return;
    hasAutoSubmitted.current = true;
    mutation.mutate({ token });
  }, [hasQueryToken, mutation, token]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-lg">
      <div className="absolute right-lg top-lg">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <h1 className="mb-lg text-center text-h1">Verify Email</h1>
        {hasQueryToken ? (
          <div className="space-y-md">
            {mutation.isPending ? <Alert tone="info" message="Verifying your email..." /> : null}
            {mutation.isSuccess ? <Alert tone="success" message="Email verified. You can now log in." /> : null}
            {mutation.isError ? <Alert tone="danger" message={verifyErrorMessage} /> : null}
            <p className="text-center text-small text-text-secondary">
              <Link className="text-primary" to="/login">Go to login</Link>
            </p>
          </div>
        ) : null}
        <form className="space-y-md" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Input required label="Verification Token" {...form.register("token")} error={form.formState.errors.token?.message} />
          <Button className="w-full" isLoading={mutation.isPending}>Verify Email</Button>
        </form>
        <div className="mt-md border-t border-border pt-md">
          <p className="mb-sm text-small text-text-secondary">Didn&apos;t receive the email? Resend verification.</p>
          <form className="space-y-md" onSubmit={resendForm.handleSubmit((values) => resendMutation.mutate(values))}>
            <Input required label="Email" type="email" {...resendForm.register("email")} error={resendForm.formState.errors.email?.message} />
            {resendMutation.isSuccess ? (
              <Alert tone="success" message={resendMutation.data.data?.message ?? "Verification email sent."} />
            ) : null}
            {resendMutation.isError ? <Alert tone="danger" message={resendErrorMessage} /> : null}
            <Button className="w-full" type="submit" isLoading={resendMutation.isPending}>Resend Verification Email</Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
