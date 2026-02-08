import { Link } from "react-router-dom";
import axios from "axios";
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

const schema = z.object({
  account_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(12),
});
type Form = z.infer<typeof schema>;

export function SignupPage() {
  const form = useForm<Form>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { account_name: "", email: "", password: "" },
  });
  const mutation = useMutation({ mutationFn: authApi.signup });
  const resendMutation = useMutation({ mutationFn: authApi.resendVerification });
  const emailForResend = form.watch("email");
  const signupErrorMessage = mutation.isError && axios.isAxiosError<{ detail?: string }>(mutation.error)
    ? mutation.error.response?.data?.detail ?? "Signup failed."
    : "Signup failed.";
  const resendErrorMessage = resendMutation.isError && axios.isAxiosError<{ detail?: string }>(resendMutation.error)
    ? resendMutation.error.response?.data?.detail ?? "Could not resend verification email."
    : "Could not resend verification email.";

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-lg">
      <div className="absolute right-lg top-lg">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <h1 className="mb-lg text-center text-h1">Create Account</h1>
        <form className="space-y-md" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Input required label="Account Name" {...form.register("account_name")} error={form.formState.errors.account_name?.message} />
          <Input required label="Email" type="email" {...form.register("email")} error={form.formState.errors.email?.message} />
          <Input required label="Password" type="password" {...form.register("password")} error={form.formState.errors.password?.message} />
          {mutation.isSuccess ? <Alert tone="success" message={mutation.data.data?.message ?? "Signup successful."} /> : null}
          {mutation.isError ? <Alert tone="danger" message={signupErrorMessage} /> : null}
          {mutation.isError ? (
            <div className="space-y-sm">
              <Alert tone="info" message="Didn't get the verification email? You can resend it." />
              {resendMutation.isSuccess ? (
                <Alert tone="success" message={resendMutation.data.data?.message ?? "Verification email sent."} />
              ) : null}
              {resendMutation.isError ? <Alert tone="danger" message={resendErrorMessage} /> : null}
              <Button
                type="button"
                className="w-full"
                isLoading={resendMutation.isPending}
                disabled={!emailForResend}
                onClick={() => resendMutation.mutate({ email: emailForResend })}
              >
                Resend Verification Email
              </Button>
            </div>
          ) : null}
          <Button className="w-full" isLoading={mutation.isPending}>Create Account</Button>
        </form>
        <p className="mt-md text-center text-small text-text-secondary">
          <Link className="text-primary" to="/login">Already have an account? Login</Link>
        </p>
      </Card>
    </div>
  );
}
