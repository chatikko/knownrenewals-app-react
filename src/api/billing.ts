import { http } from "@/api/http";
import type { BillingStatus, CommonResponse } from "@/types/api";

export const billingApi = {
  status: async () => {
    const res = await http.get<CommonResponse<BillingStatus>>("/billing/status");
    return res.data.data;
  },
  checkout: async (payload: { plan: "monthly" | "yearly"; success_url: string; cancel_url: string }) => {
    const res = await http.post<CommonResponse<{ url: string }>>("/billing/checkout-session", payload);
    return res.data.data;
  },
};
