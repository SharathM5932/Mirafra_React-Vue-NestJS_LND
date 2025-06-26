import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../types/auth";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isRouteNeededAuth = true,
}) => {
  // Accessing the user auth state from redux store
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) =>
      state.auth.isAuthenticated
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Checking the cases for routes
  // if user not authenticated and routed state == false then navigate to Login page
  // if user authenticated and routed state == true then navigate to Home page
  // it render only whenever the user auth state and routes changes
  useEffect(() => {
    if (isRouteNeededAuth && !isAuthenticated) {
      navigate("/login");
    } else if (!isRouteNeededAuth && isAuthenticated) {
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [navigate, isRouteNeededAuth, isAuthenticated]);

  return loading ? <>Loading...</> : <>{children}</>;
};

export default ProtectedRoute;
