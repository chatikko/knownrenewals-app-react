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

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

function applyRobotsMeta(pathname: string) {
  if (typeof document === "undefined") return;
  const normalized = normalizePathname(pathname);
  const isMarketingRoute = marketingPaths.has(normalized);
  const robotsValue = isMarketingRoute ? "index, follow" : "noindex, nofollow";

  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement("meta");
    robotsMeta.setAttribute("name", "robots");
    document.head.appendChild(robotsMeta);
  }
  robotsMeta.setAttribute("content", robotsValue);
}

function installRobotsNavigationHooks() {
  if (typeof window === "undefined") return;

  const update = () => applyRobotsMeta(window.location.pathname);
  update();

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function pushState(data: unknown, unused: string, url?: string | URL | null) {
    originalPushState.call(window.history, data, unused, url);
    update();
  };

  window.history.replaceState = function replaceState(data: unknown, unused: string, url?: string | URL | null) {
    originalReplaceState.call(window.history, data, unused, url);
    update();
  };

  window.addEventListener("popstate", update);
}

const rootEl = document.getElementById("root");
if (rootEl) {
  // Avoid hydrating mismatched pre-rendered markup on non-SSG routes
  rootEl.innerHTML = "";
}
const pathname =
  typeof window !== "undefined"
    ? normalizePathname(window.location.pathname)
    : "/";
const isMarketingRoute = marketingPaths.has(pathname);

installRobotsNavigationHooks();

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
