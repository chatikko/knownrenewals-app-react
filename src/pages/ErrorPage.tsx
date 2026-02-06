import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred while loading this page.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = typeof error.data === "string" ? error.data : message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg rounded-lg border border-border bg-surface p-8">
        <h1 className="text-h1">{title}</h1>
        <p className="mt-3 text-body text-text-secondary">{message}</p>
        <div className="mt-6">
          <Link className="text-primary hover:underline" to="/">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
