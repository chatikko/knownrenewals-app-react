import { useRoutes, type RouteObject } from "react-router-dom";
import { articles } from "@/content/articles";
import { SeoSync } from "@/seo/SeoSync";
import { LandingPage } from "@/pages/marketing/LandingPage";
import { PrivacyPolicyPage } from "@/pages/marketing/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/pages/marketing/TermsOfServicePage";
import { BlogPage } from "@/pages/marketing/BlogPage";
import { BlogArticlePage } from "@/pages/marketing/BlogArticlePage";
import { PillarPage } from "@/pages/marketing/PillarPage";
import { SubscriptionTrackerPage } from "@/pages/marketing/SubscriptionTrackerPage";
import { ContractManagementPage } from "@/pages/marketing/ContractManagementPage";
import { SaasRenewalPage } from "@/pages/marketing/SaasRenewalPage";
import { RenewalReminderSoftwarePage } from "@/pages/marketing/RenewalReminderSoftwarePage";
import { ContractReminderSystemPage } from "@/pages/marketing/ContractReminderSystemPage";
import { RenewalManagementPlatformPage } from "@/pages/marketing/RenewalManagementPlatformPage";
import { BestSubscriptionRenewalSoftwarePage } from "@/pages/marketing/BestSubscriptionRenewalSoftwarePage";
import { PricingPage } from "@/pages/marketing/PricingPage";
import { FeaturesPage } from "@/pages/marketing/FeaturesPage";
import { ExcelVsSoftwarePage } from "@/pages/marketing/ExcelVsSoftwarePage";
import { SlackRenewalAlertsPage } from "@/pages/marketing/SlackRenewalAlertsPage";
import { SlackVsEmailRemindersPage } from "@/pages/marketing/SlackVsEmailRemindersPage";
import { FreeTemplatePage } from "@/pages/marketing/FreeTemplatePage";

const baseMarketingRoutes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/renewal-tracking-software", element: <PillarPage /> },
  { path: "/subscription-renewal-tracker", element: <SubscriptionTrackerPage /> },
  { path: "/contract-renewal-management-software", element: <ContractManagementPage /> },
  { path: "/saas-renewal-management", element: <SaasRenewalPage /> },
  { path: "/renewal-reminder-software", element: <RenewalReminderSoftwarePage /> },
  { path: "/contract-reminder-system", element: <ContractReminderSystemPage /> },
  { path: "/renewal-management-platform", element: <RenewalManagementPlatformPage /> },
  { path: "/best-subscription-renewal-software", element: <BestSubscriptionRenewalSoftwarePage /> },
  { path: "/renewal-tracking-software-pricing", element: <PricingPage /> },
  { path: "/renewal-tracking-software-features", element: <FeaturesPage /> },
  { path: "/excel-vs-renewal-tracking-software", element: <ExcelVsSoftwarePage /> },
  { path: "/slack-renewal-alerts", element: <SlackRenewalAlertsPage /> },
  { path: "/slack-alerts-vs-email-reminders", element: <SlackVsEmailRemindersPage /> },
  { path: "/free-renewal-tracking-spreadsheet-template", element: <FreeTemplatePage /> },
  { path: "/blog", element: <BlogPage /> },
  ...articles.map((article) => ({
    path: `/blog/${article.slug}`,
    element: <BlogArticlePage article={article} />,
  })),
  { path: "/privacy-policy", element: <PrivacyPolicyPage /> },
  { path: "/terms-of-service", element: <TermsOfServicePage /> },
];

export const marketingRoutes: RouteObject[] = baseMarketingRoutes;

export const marketingPaths = new Set(marketingRoutes.map((route) => route.path));

export function SsgRoutes() {
  const element = useRoutes(marketingRoutes);
  return (
    <>
      <SeoSync />
      {element}
    </>
  );
}
