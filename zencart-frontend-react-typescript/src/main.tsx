import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from "./app/store.ts";

import App from "./App";
import Home from "./pages/home/Home.tsx";

import Login from "./pages/auth/Login.tsx";
import Signup from "./pages/auth/Signup.tsx";
import Profile from "./pages/profile/Profile.tsx";
import PageNotFound from "./utils/PageNotFound";
import ContactUs from "./pages/profile/ContactUs.tsx";
import AddAddress from "./pages/profile/AddAddress.tsx";
import UpdateAddress from "./pages/profile/UpdateAddress.tsx";
import ProfileAddressCard from "./pages/profile/ProfileAccountCard";
import ProfileAccountContainer from "./pages/profile/ProfileAddressContainer";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import AddProduct from "./pages/products/AddProducts.tsx";
import UpdateProducts from "./pages/products/UpdateProducts.tsx";
import Products from "./pages/products/Products.tsx";
import MyProducts from "./pages/products/MyProducts.tsx";
import Cart from "./pages/order/Cart.tsx";
import Orders from "./pages/order/Orders.tsx";
import BuyProduct from "./pages/order/BuyProduct.tsx";
import { ErrorFallback } from "./utils/ErrorFallback.tsx";

import "./index.css";

const queryClient = new QueryClient();

// Routes with protected routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Fallback UI or Error boundary
    errorElement: <ErrorFallback />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/products", element: <Products /> },
      {
        path: "/login",
        element: (
          <ProtectedRoute isRouteNeededAuth={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <ProtectedRoute isRouteNeededAuth={false}>
            <Signup />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myproducts",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <MyProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/addproducts",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/updateproduct/:id",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <UpdateProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          { path: "/profile/address", element: <ProfileAccountContainer /> },
          { path: "/profile/addaddress", element: <AddAddress /> },
          { path: "/profile/updateaddress/:id", element: <UpdateAddress /> },
          { path: "/profile/account", element: <ProfileAddressCard /> },
          { path: "/profile/contactus", element: <ContactUs /> },
        ],
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/buyproduct/:id",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <BuyProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoute isRouteNeededAuth={true}>
            <PaymentPage />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
