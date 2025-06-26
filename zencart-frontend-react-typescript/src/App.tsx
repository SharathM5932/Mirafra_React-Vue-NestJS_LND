import { useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Toaster, toast } from "sonner";

import axiosInstance from "./utils/axiosInstance.ts";
import axiosInstanceProducts from "./utils/axiosInstanceProducts.ts";
import { login, logout } from "./features/auth/authSlice.ts";
import type { AppDispatch } from "./app/store.ts";

import Navbar from "./pages/Navbar.tsx";

import "./App.css";

function App(): ReactNode {
  const dispatch = useDispatch<AppDispatch>();

  // For persistence authentication, when user refresh the page it make the API request for refresh token
  useEffect(() => {
    const verifyToken = async (): Promise<void> => {
      // first it will checks the localstorage, if not directly -> logout()
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(logout());
      } else {
        // otherwise we attach the token to axios header for verify the token
        try {
          const response = await axiosInstance.get<{
            token: string;
            message?: string;
            data: string;
          }>("/auth/verify-token", {
            headers: { "x-auth-token": token },
          });

          dispatch(
            login({
              token: response.data.token,
              userId: response.data.data,
            })
          );

          toast.success(
            response.data?.message || "Refresh token verified successfully!",
            { duration: 3000 }
          );

          axiosInstance.defaults.headers.common["x-auth-token"] =
            response.data.token;
          axiosInstanceProducts.defaults.headers.common["x-auth-token"] =
            response.data.token;
        } catch (error: any) {
          // if expired, navigate to logout()
          toast.error(
            error?.response?.data?.message ||
              "Token has expired. Please try to login again..."
          );
          dispatch(logout());
        }
      }
    };

    verifyToken();
  }, [dispatch]);

  return (
    <>
      {/* Globally toast notification enable */}
      <Toaster position="bottom-left" richColors />
      <div className="app">
        <Navbar />
        <main className="main"></main>
        {/* For child route render */}
        <Outlet />
      </div>
    </>
  );
}

export default App;
