import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import store from "../app/store";
import { logout } from "../features/auth/authSlice";

// Reuseable axios instance for user-service
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_USER_SERVICE as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// It handle the errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const status = error.response.status;

      //  Show a toast error message, from the API
      toast.error(
        (error.response.data as { error?: string })?.error ||
          "Something went wrong. Please try to login again.",
        { duration: 3000 }
      );

      // If it's Rx 401  (authorization), it redirected to login page and call logout() dispatch function
      if (status === 401) {
        store.dispatch(logout());
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
