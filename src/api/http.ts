import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { CommonResponse, TokenPair } from "@/types/api";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/auth/tokenStorage";

const baseURL = import.meta.env.REACT_APP_VITE_API_BASE_URL ?? "http://localhost:8000";

export const publicHttp = axios.create({ baseURL });
export const http = axios.create({ baseURL });

let refreshPromise: Promise<TokenPair> | null = null;

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetriableConfig | undefined;
    const unauthorized = error.response?.status === 401;

    if (!original || !unauthorized || original._retry || original.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    original._retry = true;
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = publicHttp
          .post<CommonResponse<TokenPair>>("/auth/refresh", { refresh_token: refreshToken })
          .then((res) => res.data.data)
          .finally(() => {
            refreshPromise = null;
          });
      }
      const next = await refreshPromise;
      setTokens(next);
      original.headers.Authorization = `Bearer ${next.access_token}`;
      return http(original);
    } catch (refreshError) {
      clearTokens();
      return Promise.reject(refreshError);
    }
  },
);

