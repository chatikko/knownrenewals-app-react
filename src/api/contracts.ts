import { http } from "@/api/http";
import type { CommonResponse, Contract, ListResponse } from "@/types/api";

export const contractsApi = {
  list: async () => {
    const res = await http.get<ListResponse<Contract>>("/contracts");
    return res.data;
  },
  create: async (payload: {
    vendor_name: string;
    renewal_type?: string;
    external_contract_id?: string;
    category?: string;
    renewal_name?: string;
    contract_name?: string;
    start_date?: string;
    renewal_date: string;
    billing_frequency?: string;
    contract_value?: number;
    annualized_value?: number;
    auto_renew?: boolean;
    notice_period_days?: number;
    owner_email?: string;
    notes?: string;
  }) => {
    const res = await http.post<CommonResponse<Contract>>("/contracts", payload);
    return res.data.data;
  },
  get: async (id: string) => {
    const res = await http.get<CommonResponse<Contract>>(`/contracts/${id}`);
    return res.data.data;
  },
  update: async (id: string, payload: Partial<{
    vendor_name: string;
    renewal_type: string;
    external_contract_id: string;
    category: string;
    renewal_name: string;
    contract_name: string;
    start_date: string;
    renewal_date: string;
    billing_frequency: string;
    contract_value: number;
    annualized_value: number;
    auto_renew: boolean;
    notice_period_days: number;
    owner_email: string;
    notes: string;
    status: "safe" | "soon" | "risk";
  }>) => {
    const res = await http.put<CommonResponse<Contract>>(`/contracts/${id}`, payload);
    return res.data.data;
  },
  remove: async (id: string) => {
    const res = await http.delete<CommonResponse<null>>(`/contracts/${id}`);
    return res.data;
  },
};
