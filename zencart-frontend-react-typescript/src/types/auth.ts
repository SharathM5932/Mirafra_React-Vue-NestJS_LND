import type { ReactNode } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  token: string | null;
}

export interface AuthPayload {
  token: string;
  userId: string;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  isRouteNeededAuth?: boolean;
}
