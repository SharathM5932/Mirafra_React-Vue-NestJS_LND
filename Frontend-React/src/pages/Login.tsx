import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { signInAPI } from "../features/api/authApi";
import { RootState, AppDispatch } from "../app/store";
import { clearAuthMessage } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../features/auth/signUpSchema";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get('email');
  const registered = searchParams.get('registered') === 'true';
  const [showSuccess, setShowSuccess] = useState(false);

  const { loading, error, isAuthenticated, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(clearAuthMessage());
    
    if (isAuthenticated) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isAuthenticated, navigate, dispatch, registered]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: registeredEmail || "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await dispatch(signInAPI(data)).unwrap();
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-card"
      >
        {showSuccess && (
          <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ color: '#22c55e' }}
            >
              Login Successful!
            </motion.h2>
          </div>
        )}

        <div className="auth-header">
          <motion.h1 className="auth-title">Welcome Back</motion.h1>
          <motion.p className="auth-subtitle">
            {registered ? "Registration successful! Please log in" : "Login to access your account"}
          </motion.p>
        </div>

        <motion.form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              className={`auth-input ${errors.email ? "invalid" : ""}`}
              {...register("email")}
            />
          </div>
          {errors.email && <p className="auth-error-message">{errors.email.message}</p>}

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              className={`auth-input ${errors.password ? "invalid" : ""}`}
              {...register("password")}
            />
          </div>
          {errors.password && <p className="auth-error-message">{errors.password.message}</p>}

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          {message && <div className="auth-message">{message}</div>}
          {error && <div className="auth-error">{error}</div>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="auth-button"
            disabled={!isDirty || !isValid || loading}
          >
            {loading ? (
              <span className="button-loading">
                <span className="spinner"></span>
                Signing in...
              </span>
            ) : (
              <>
                Login
                <FiArrowRight className="button-icon" />
              </>
            )}
          </motion.button>
        </motion.form>

        <div className="auth-footer">
          <p>
            Not registered yet?{" "}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;