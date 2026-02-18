import { createBrowserRouter, Navigate } from "react-router-dom";
import { articles } from "@/content/articles";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { AdminRoute } from "@/components/routing/AdminRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { VerifyEmailPage } from "@/pages/auth/VerifyEmailPage";
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
import { ExcelVsSoftwarePage } from "@/pages/marketing/ExcelVsSoftwarePage";
import { FeaturesPage } from "@/pages/marketing/FeaturesPage";
import { SlackRenewalAlertsPage } from "@/pages/marketing/SlackRenewalAlertsPage";
import { SlackVsEmailRemindersPage } from "@/pages/marketing/SlackVsEmailRemindersPage";
import { FreeTemplatePage } from "@/pages/marketing/FreeTemplatePage";
import { ErrorPage } from "@/pages/ErrorPage";
import { DashboardPage } from "@/pages/app/DashboardPage";
import { ContractsPage } from "@/pages/app/ContractsPage";
import { AddContractPage } from "@/pages/app/AddContractPage";
import { ContractDetailPage } from "@/pages/app/ContractDetailPage";
import { BillingPage } from "@/pages/app/BillingPage";
import { TeamPage } from "@/pages/app/TeamPage";
import { SlackIntegrationPage } from "@/pages/app/SlackIntegrationPage";
import { AdminUsersPage } from "@/pages/admin/AdminUsersPage";
import { AdminAccountsPage } from "@/pages/admin/AdminAccountsPage";
import { AdminContractsPage } from "@/pages/admin/AdminContractsPage";
import { AdminAuthEventsPage } from "@/pages/admin/AdminAuthEventsPage";
import { AdminBillingEventsPage } from "@/pages/admin/AdminBillingEventsPage";
import { AdminLeadMagnetPage } from "@/pages/admin/AdminLeadMagnetPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
  { path: "/renewal-tracking-software", element: <PillarPage />, errorElement: <ErrorPage /> },
  { path: "/subscription-renewal-tracker", element: <SubscriptionTrackerPage />, errorElement: <ErrorPage /> },
  {
    path: "/contract-renewal-management-software",
    element: <ContractManagementPage />,
    errorElement: <ErrorPage />,
  },
  { path: "/saas-renewal-management", element: <SaasRenewalPage />, errorElement: <ErrorPage /> },
  { path: "/renewal-reminder-software", element: <RenewalReminderSoftwarePage />, errorElement: <ErrorPage /> },
  { path: "/contract-reminder-system", element: <ContractReminderSystemPage />, errorElement: <ErrorPage /> },
  { path: "/renewal-management-platform", element: <RenewalManagementPlatformPage />, errorElement: <ErrorPage /> },
  {
    path: "/best-subscription-renewal-software",
    element: <BestSubscriptionRenewalSoftwarePage />,
    errorElement: <ErrorPage />,
  },
  { path: "/renewal-tracking-software-pricing", element: <PricingPage />, errorElement: <ErrorPage /> },
  { path: "/renewal-tracking-software-features", element: <FeaturesPage />, errorElement: <ErrorPage /> },
  {
    path: "/excel-vs-renewal-tracking-software",
    element: <ExcelVsSoftwarePage />,
    errorElement: <ErrorPage />,
  },
  { path: "/slack-renewal-alerts", element: <SlackRenewalAlertsPage />, errorElement: <ErrorPage /> },
  { path: "/slack-alerts-vs-email-reminders", element: <SlackVsEmailRemindersPage />, errorElement: <ErrorPage /> },
  { path: "/free-renewal-tracking-spreadsheet-template", element: <FreeTemplatePage />, errorElement: <ErrorPage /> },
  { path: "/blog", element: <BlogPage />, errorElement: <ErrorPage /> },
  ...articles.map((article) => ({
    path: `/blog/${article.slug}`,
    element: <BlogArticlePage article={article} />,
    errorElement: <ErrorPage />,
  })),
  { path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
  { path: "/signup", element: <SignupPage />, errorElement: <ErrorPage /> },
  { path: "/verify-email", element: <VerifyEmailPage />, errorElement: <ErrorPage /> },
  { path: "/privacy-policy", element: <PrivacyPolicyPage />, errorElement: <ErrorPage /> },
  { path: "/terms-of-service", element: <TermsOfServicePage />, errorElement: <ErrorPage /> },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AppShell />,
        errorElement: <ErrorPage />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "contracts", element: <ContractsPage /> },
          { path: "contracts/new", element: <AddContractPage /> },
          { path: "contracts/:id", element: <ContractDetailPage /> },
          { path: "billing", element: <BillingPage /> },
          { path: "integrations/slack", element: <SlackIntegrationPage /> },
          { path: "team", element: <TeamPage /> },
          { path: "teams", element: <Navigate to="/team" replace /> },
          {
            element: <AdminRoute />,
            children: [
              { path: "admin/users", element: <AdminUsersPage /> },
              { path: "admin/accounts", element: <AdminAccountsPage /> },
              { path: "admin/contracts", element: <AdminContractsPage /> },
              { path: "admin/auth-events", element: <AdminAuthEventsPage /> },
              { path: "admin/billing-events", element: <AdminBillingEventsPage /> },
              { path: "admin/lead-magnets", element: <AdminLeadMagnetPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);
