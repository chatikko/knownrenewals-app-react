import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import type { TokenPair } from "@/types/api";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/auth/tokenStorage";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (tokens: TokenPair) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState<string | null>(() => getAccessToken());

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: Boolean(accessToken && getRefreshToken()),
    login: (tokens) => {
      setTokens(tokens);
      setAccessToken(tokens.access_token);
    },
    logout: () => {
      clearTokens();
      setAccessToken(null);
    },
  }), [accessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
