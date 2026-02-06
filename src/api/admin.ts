import { http } from "@/api/http";
import type {
  AdminAccount,
  AdminAuthEvent,
  AdminBillingEvent,
  AdminContract,
  AdminUser,
  CommonResponse,
  ListResponse,
} from "@/types/api";

const withPage = (skip: number, limit: number) => ({ params: { skip, limit } });

export const adminApi = {
  users: {
    list: async (skip: number, limit: number) => {
      const res = await http.get<ListResponse<AdminUser>>("/admin/users", withPage(skip, limit));
      return res.data;
    },
    update: async (userId: string, payload: Partial<Pick<AdminUser, "is_active" | "is_email_verified" | "is_admin">>) => {
      const res = await http.patch<CommonResponse<AdminUser>>(`/admin/users/${userId}`, payload);
      return res.data.data;
    },
  },
  accounts: {
    list: async (skip: number, limit: number) => {
      const res = await http.get<ListResponse<AdminAccount>>("/admin/accounts", withPage(skip, limit));
      return res.data;
    },
    update: async (accountId: string, payload: { plan?: "monthly" | "yearly"; status?: "inactive" | "trialing" | "active" | "past_due" | "canceled" }) => {
      const res = await http.patch<CommonResponse<AdminAccount>>(`/admin/accounts/${accountId}`, payload);
      return res.data.data;
    },
  },
  contracts: {
    list: async (skip: number, limit: number) => {
      const res = await http.get<ListResponse<AdminContract>>("/admin/contracts", withPage(skip, limit));
      return res.data;
    },
    update: async (contractId: string, payload: { status?: "safe" | "soon" | "risk" }) => {
      const res = await http.patch<CommonResponse<AdminContract>>(`/admin/contracts/${contractId}`, payload);
      return res.data.data;
    },
  },
  authEvents: {
    list: async (skip: number, limit: number) => {
      const res = await http.get<ListResponse<AdminAuthEvent>>("/admin/auth-events", withPage(skip, limit));
      return res.data;
    },
  },
  billingEvents: {
    list: async (skip: number, limit: number) => {
      const res = await http.get<ListResponse<AdminBillingEvent>>("/admin/billing-events", withPage(skip, limit));
      return res.data;
    },
  },
};
