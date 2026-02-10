import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "@/router";
import { SsgRoutes, marketingPaths } from "@/routes/ssg-routes";
import { AuthProvider } from "@/auth/AuthProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import "@/styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const rootEl = document.getElementById("root");
const pathname =
  typeof window !== "undefined"
    ? (window.location.pathname.replace(/\/+$/, "") || "/")
    : "/";
const isMarketingRoute = marketingPaths.has(pathname);

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <Providers>
        {isMarketingRoute ? (
          <BrowserRouter>
            <SsgRoutes />
          </BrowserRouter>
        ) : (
          <RouterProvider router={router} />
        )}
      </Providers>
    </React.StrictMode>,
  );
}
