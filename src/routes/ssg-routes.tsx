import { useRoutes, type RouteObject } from "react-router-dom";
import { LandingPage } from "@/pages/marketing/LandingPage";
import { PrivacyPolicyPage } from "@/pages/marketing/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/pages/marketing/TermsOfServicePage";

export const marketingRoutes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { path: "/terms-of-service", element: <TermsOfServicePage /> },
];

export const marketingPaths = new Set(marketingRoutes.map((route) => route.path));

export function SsgRoutes() {
  return useRoutes(marketingRoutes);
}
