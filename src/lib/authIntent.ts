export const TEMPLATE_ONBOARDING_SOURCE = "template";
export const TEMPLATE_IMPORT_ONBOARDING_PATH = "/contracts?onboarding=import-template";

const AUTH_INTENT_NEXT_KEY = "kr_auth_intent_next";
const AUTH_INTENT_SOURCE_KEY = "kr_auth_intent_source";
const APP_ORIGIN = "https://knowrenewals.com";

type AuthIntent = {
  nextPath: string | null;
  source: string | null;
};

export function sanitizeNextPath(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed || !trimmed.startsWith("/") || trimmed.startsWith("//") || /\s/.test(trimmed)) return null;

  try {
    const parsed = new URL(trimmed, APP_ORIGIN);
    if (parsed.origin !== APP_ORIGIN) return null;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return null;
  }
}

export function buildAuthPath(basePath: "/signup" | "/login", source: string | null, nextPath: string | null): string {
  const params = new URLSearchParams();
  const safeNext = sanitizeNextPath(nextPath);
  if (source) params.set("from", source);
  if (safeNext) params.set("next", safeNext);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function storeAuthIntent(nextPath: string | null, source: string | null): void {
  if (typeof window === "undefined") return;
  const safeNext = sanitizeNextPath(nextPath);
  if (safeNext) {
    window.sessionStorage.setItem(AUTH_INTENT_NEXT_KEY, safeNext);
  } else {
    window.sessionStorage.removeItem(AUTH_INTENT_NEXT_KEY);
  }

  if (source) {
    window.sessionStorage.setItem(AUTH_INTENT_SOURCE_KEY, source);
  } else {
    window.sessionStorage.removeItem(AUTH_INTENT_SOURCE_KEY);
  }
}

export function getAuthIntent(): AuthIntent {
  if (typeof window === "undefined") {
    return { nextPath: null, source: null };
  }
  const nextPath = sanitizeNextPath(window.sessionStorage.getItem(AUTH_INTENT_NEXT_KEY));
  const source = window.sessionStorage.getItem(AUTH_INTENT_SOURCE_KEY);
  return { nextPath, source };
}

export function clearAuthIntent(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(AUTH_INTENT_NEXT_KEY);
  window.sessionStorage.removeItem(AUTH_INTENT_SOURCE_KEY);
}
