import { useRoutes, type RouteObject } from "react-router-dom";
import { LandingPage } from "@/pages/marketing/LandingPage";
import { PrivacyPolicyPage } from "@/pages/marketing/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/pages/marketing/TermsOfServicePage";
import { BlogPage } from "@/pages/marketing/BlogPage";
import { PillarPage } from "@/pages/marketing/PillarPage";
import { SubscriptionTrackerPage } from "@/pages/marketing/SubscriptionTrackerPage";
import { ContractManagementPage } from "@/pages/marketing/ContractManagementPage";
import { SaasRenewalPage } from "@/pages/marketing/SaasRenewalPage";
import { PricingPage } from "@/pages/marketing/PricingPage";
import { ExcelVsSoftwarePage } from "@/pages/marketing/ExcelVsSoftwarePage";

export const marketingRoutes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/renewal-tracking-software", element: <PillarPage /> },
  { path: "/subscription-renewal-tracker", element: <SubscriptionTrackerPage /> },
  { path: "/contract-renewal-management-software", element: <ContractManagementPage /> },
  { path: "/saas-renewal-management", element: <SaasRenewalPage /> },
  { path: "/renewal-tracking-software-pricing", element: <PricingPage /> },
  { path: "/excel-vs-renewal-tracking-software", element: <ExcelVsSoftwarePage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { path: "/terms-of-service", element: <TermsOfServicePage /> },
];

export const marketingPaths = new Set(marketingRoutes.map((route) => route.path));

export function SsgRoutes() {
  return useRoutes(marketingRoutes);
}
