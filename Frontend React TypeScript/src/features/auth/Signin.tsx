import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAPI } from "../api/auth/loginApi";
import { AppDispatch, RootState } from "../../app/store";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema, loginSchemaType } from "./LoginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCartFromLocalStorage, mergeGuestCartWithUserCart } from "../cart/CartSlice";
import { toast } from "react-toastify";

const SignIn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

  const handleSignIn = async (data: loginSchemaType) => {
    const { email, password } = data;
    try {
      await dispatch(signInAPI({ email, password })).unwrap();

      // Merging guest cart with user cart 
      const guestCart = getCartFromLocalStorage(null);
      if (guestCart.length > 0) {
        await dispatch(mergeGuestCartWithUserCart({ email, guestCart }));
      }

      localStorage.setItem("email", email);
      toast.success("Login successful!");
      navigate("/products");
    } catch {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2 className="login">Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit(handleSignIn)}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <div className="signin-loader"></div> : "Sign In"}
          </button>

          {error && <p className="error-msg">{error}</p>}
        </form>

        <p className="bottom-text">
          Don't have an account? <Link to="/" className="signup-link">Signup</Link>
        </p>
        <p className="bottom-text">
          <Link to="/forgot-password" className="signup-link">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
