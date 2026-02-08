import { publicHttp } from "@/api/http";
import type { CommonResponse, TokenPair } from "@/types/api";

export const authApi = {
  signup: async (payload: { email: string; password: string; account_name: string }) => {
    const res = await publicHttp.post<CommonResponse<{ message: string }>>("/auth/signup", payload);
    return res.data;
  },
  login: async (payload: { email: string; password: string }) => {
    const res = await publicHttp.post<CommonResponse<TokenPair>>("/auth/login", payload);
    return res.data.data;
  },
  verifyEmail: async (payload: { token: string }) => {
    const res = await publicHttp.post<CommonResponse<{ message: string }>>("/auth/verify-email", payload);
    return res.data;
  },
  resendVerification: async (payload: { email: string }) => {
    const res = await publicHttp.post<CommonResponse<{ message: string }>>("/auth/resend-verification", payload);
    return res.data;
  },
};
