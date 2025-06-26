import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../app/store.ts";
import { toggleUserRole } from "../features/user/userRoleSlice.ts";
import type { NavbarItem } from "../types/navbar.ts";

import "../style/navbar.css";

const Navbar = () => {
  //   throw new Error("Testing the error boundary by crashing the application");
  const dispatch = useDispatch<AppDispatch>();

  // Access the current user data, role, and cart count from the Redux store
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userCurrentRole = useSelector(
    (state: RootState) => state.userRole.userCurrentRole
  );
  const cartCount = useSelector(
    (state: RootState) => state.cartCount.cartCount
  );

  // Navbar items with role-based access
  const navbarItems: NavbarItem[] = [
    { name: "Home", path: "/", authStatus: true, role: true },
    {
      name: "Products",
      path: "/products",
      authStatus: true,
      role: userCurrentRole === "buyer" || !isAuthenticated,
    },
    {
      name: "Login",
      path: "/login",
      authStatus: !isAuthenticated,
      role: !isAuthenticated,
    },
    {
      name: "Signup",
      path: "/signup",
      authStatus: !isAuthenticated,
      role: !isAuthenticated,
    },
    {
      name: "My Products",
      path: "/myproducts",
      authStatus: isAuthenticated,
      role: userCurrentRole === "seller",
    },
    {
      name: "Add Product",
      path: "/product/addproducts",
      authStatus: isAuthenticated,
      role: userCurrentRole === "seller",
    },
    {
      name: "Cart",
      path: "/cart",
      authStatus: isAuthenticated,
      role: userCurrentRole === "buyer",
    },
    {
      name: "Orders",
      path: "/orders",
      authStatus: isAuthenticated,
      role: userCurrentRole === "buyer",
    },
    {
      name: "Profile",
      path: "/profile",
      authStatus: isAuthenticated,
      role: true,
    },
  ];

  return (
    <header className="navbar">
      <div className="zencart_title">
        <Link to="/">
          <h1 className="navbar_heading">ZenCart</h1>
        </Link>
        <p>
          {isAuthenticated
            ? userCurrentRole === "buyer"
              ? "Buyer"
              : "Seller"
            : null}
        </p>
      </div>

      {/* Toggle the role from seller to buyer and vise-versa */}
      {isAuthenticated && (
        <div className="user_role_switch">
          <button className="btn" onClick={() => dispatch(toggleUserRole())}>
            Switch to {userCurrentRole === "buyer" ? "Seller" : "Buyer"}
          </button>
        </div>
      )}

      {/* Render the navbar based navbar list items */}
      <nav className="navbar_links">
        {navbarItems.map(({ name, path, authStatus, role }, idx) =>
          authStatus && role ? (
            name === "Cart" ? (
              <NavLink to={path} key={idx} className="navbar_cart">
                {name} <span className="cart_count">{cartCount}</span>
              </NavLink>
            ) : (
              <NavLink to={path} key={idx}>
                {name}
              </NavLink>
            )
          ) : null
        )}
      </nav>
    </header>
  );
};

export default Navbar;
