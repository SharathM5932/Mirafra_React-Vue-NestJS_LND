import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiUser, FiArrowRight } from "react-icons/fi";
import "./auth.css";
import { useDispatch, useSelector } from "react-redux";
import { signUpAPI } from "../features/api/authApi";
import { RootState, AppDispatch } from "../app/store";
import { clearAuthMessage } from "../features/auth/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpSchemaType } from "../features/auth/signUpSchema";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state: RootState) => state.auth);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    dispatch(clearAuthMessage());
    return () => {
      dispatch(clearAuthMessage());
    };
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    try {
      dispatch(clearAuthMessage());
      await dispatch(
        signUpAPI({
          username: data.username,
          email: data.email,
          password: data.password,
        })
      ).unwrap();
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/login?registered=true&email=${encodeURIComponent(data.email)}`);
        reset();
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
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
              Registration Successful!
            </motion.h2>
          </div>
        )}

        <div className="auth-header">
          <motion.h1 className="auth-title">Create Account</motion.h1>
          <motion.p className="auth-subtitle">Join us to start shopping</motion.p>
        </div>

        <motion.form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              className={`auth-input ${errors.username ? "invalid" : ""}`}
              {...register("username")}
            />
          </div>
          {errors.username && <p className="auth-error-message">{errors.username.message}</p>}

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

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              className={`auth-input ${errors.confirmPassword ? "invalid" : ""}`}
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="auth-error-message">{errors.confirmPassword.message}</p>
          )}

          <div className="terms-agreement">
            <label>
              <input type="checkbox" required />
              <span>I agree to the <Link to="/terms">Terms & Conditions</Link></span>
            </label>
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
                Signing up...
              </span>
            ) : (
              <>
                Register
                <FiArrowRight className="button-icon" />
              </>
            )}
          </motion.button>
        </motion.form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link" onClick={() => dispatch(clearAuthMessage())}>
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;