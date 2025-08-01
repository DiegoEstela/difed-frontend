import type { JSX } from "react";
import { useAuth } from "../../hook/auth/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) return <Navigate to="/login" />;

  return children;
};
