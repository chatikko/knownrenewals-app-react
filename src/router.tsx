import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { AdminRoute } from "@/components/routing/AdminRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage";
import { VerifyEmailPage } from "@/pages/auth/VerifyEmailPage";
import { LandingPage } from "@/pages/marketing/LandingPage";
import { PrivacyPolicyPage } from "@/pages/marketing/PrivacyPolicyPage";
import { TermsOfServicePage } from "@/pages/marketing/TermsOfServicePage";
import { ErrorPage } from "@/pages/ErrorPage";
import { DashboardPage } from "@/pages/app/DashboardPage";
import { ContractsPage } from "@/pages/app/ContractsPage";
import { AddContractPage } from "@/pages/app/AddContractPage";
import { ContractDetailPage } from "@/pages/app/ContractDetailPage";
import { BillingPage } from "@/pages/app/BillingPage";
import { TeamPage } from "@/pages/app/TeamPage";
import { AdminUsersPage } from "@/pages/admin/AdminUsersPage";
import { AdminAccountsPage } from "@/pages/admin/AdminAccountsPage";
import { AdminContractsPage } from "@/pages/admin/AdminContractsPage";
import { AdminAuthEventsPage } from "@/pages/admin/AdminAuthEventsPage";
import { AdminBillingEventsPage } from "@/pages/admin/AdminBillingEventsPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage />, errorElement: <ErrorPage /> },
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
            ],
          },
        ],
      },
    ],
  },
  { path: "/landing", element: <LandingPage />, errorElement: <ErrorPage /> },
  { path: "*", element: <ErrorPage /> },
]);
