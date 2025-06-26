import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FiLock, FiArrowRight } from 'react-icons/fi';
import './auth.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { resetPassword } from '../features/api/authApi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';

const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/\d/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    trigger
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          await dispatch(resetPassword({ token, newPassword: '' })).unwrap();
          setValidToken(true);
        } catch (err) {
          toast.error('Invalid or expired token');
          navigate('/forgot-password');
        }
      } else {
        toast.error('No token provided');
        navigate('/forgot-password');
      }
    };

    verifyToken();
  }, [token, navigate, dispatch]);

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    setLoading(true);
    try {
      const result = await dispatch(resetPassword({ 
        token: token || '', 
        newPassword: data.password 
      })).unwrap();
      
      toast.success(result.message || 'Password updated successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password. Please try again.');
      console.error('Reset password error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="auth-card"
        >
          <div className="auth-header">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="auth-title"
            >
              Invalid Token
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="auth-subtitle"
            >
              The reset link is invalid or has expired.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="auth-footer"
          >
            <p>
              <Link to="/forgot-password" className="auth-link">
                Request a new reset link
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="auth-card"
      >
        <div className="auth-header">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="auth-title"
          >
            Reset Password
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="auth-subtitle"
          >
            Enter your new password
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="New Password"
              className={`auth-input ${errors.password ? 'invalid' : ''}`}
              {...register('password', {
                onChange: () => trigger(['password', 'confirmPassword'])
              })}
            />
          </div>
          {errors.password && (
            <p className="auth-error-message">{errors.password.message}</p>
          )}

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm New Password"
              className={`auth-input ${errors.confirmPassword ? 'invalid' : ''}`}
              {...register('confirmPassword', {
                onChange: () => trigger('confirmPassword')
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="auth-error-message">{errors.confirmPassword.message}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="auth-button"
            disabled={!isDirty || !isValid || loading}
          >
            {loading ? "Resetting..." : "Reset Password"}{" "}
            <FiArrowRight className="button-icon" />
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="auth-footer"
        >
          <p>
            <Link to="/login" className="auth-link">
              Back to login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;