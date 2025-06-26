import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import './auth.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { forgotPassword } from '../features/api/authApi';

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    setIsLoading(true);
    try {
      const result = await dispatch(forgotPassword(data)).unwrap();
      toast.success(result.message || 'Reset link sent successfully', { 
        position: 'top-center',
        autoClose: 3000
      });
      setEmailSent(true);
    } catch (err: any) {
      const errorMessage = err.message || 'Error sending reset link';
      toast.error(errorMessage, { 
        position: 'top-center',
        autoClose: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-card"
        >
          <div className="auth-header">
            <FiCheckCircle className="auth-icon-success" size={48} />
            <h1 className="auth-title">Check Your Email</h1>
            <p className="auth-subtitle">
              We've sent a password reset link to your email address.
              <br />
              Please check your inbox and follow the instructions.
            </p>
          </div>

          <div className="auth-footer">
            <p>
              Didn't receive the email?{' '}
              <button 
                onClick={() => {
                  setEmailSent(false);
                  toast.info('Please try again', { position: 'top-center' });
                }}
                className="auth-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Try again
              </button>
              <br />
              Check your spam folder if you don't see it in your inbox.
            </p>
            <p>
              Remember your password?{' '}
              <Link to="/login" className="auth-link">
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
      >
        <div className="auth-header">
          <h1 className="auth-title">Forgot Password</h1>
          <p className="auth-subtitle">Enter your email to receive a reset link</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Email Address"
              className={`auth-input ${errors.email ? 'invalid' : ''}`}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="auth-error-message">{errors.email.message}</p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-loading">
                <span className="spinner"></span>
                Sending...
              </span>
            ) : (
              <>
                Send Reset Link
                <FiArrowRight className="button-icon" />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="auth-link">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;