import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { adminApi } from "@/api/admin";
import { useAuth } from "@/auth/AuthProvider";
import { LoadingState } from "@/components/QueryState";

export function AdminRoute() {
  const { isAuthenticated } = useAuth();
  const probe = useQuery({
    queryKey: ["admin", "guard"],
    queryFn: () => adminApi.users.list(0, 1),
    enabled: isAuthenticated,
    retry: false,
  });

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (probe.isLoading) return <LoadingState />;
  if (probe.isError) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
