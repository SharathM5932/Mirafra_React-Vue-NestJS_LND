export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  email: string | null;
  role: string | null;
}