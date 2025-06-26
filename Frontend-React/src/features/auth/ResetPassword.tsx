import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./ResetPassword.css"
type ResetPasswordForm = {
    token: string;
    password: string;
    confirmPassword: string;
};

const ResetPassword: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordForm>();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Extract token from URL

    const onSubmit = async (data: ResetPasswordForm) => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:3000/auth/reset-password', {
                token: data.token,
                newPassword: data.password
            });

            setMessage(response.data.msg || 'Password reset successful.');
            setTimeout(() => navigate('/signin'), 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-form-container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label>Reset Token</label>
                <input type="text" {...register('token', { required: 'Reset token is required' })} />
                {errors.token && <p className="error-msg">{errors.token.message}</p>}

                <label>New Password</label>
                <input type="password" {...register('password', { required: 'Password is required' })} />
                {errors.password && <p className="error-msg">{errors.password.message}</p>}

                <label>Confirm Password</label>
                <input
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Confirm password is required',
                        validate: (value) => value === watch('password') || 'Passwords do not match',
                    })}
                />
                {errors.confirmPassword && <p className="error-msg">{errors.confirmPassword.message}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>

                {message && <p className="success-msg">{message}</p>}
                {error && <p className="error-msg">{error}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
