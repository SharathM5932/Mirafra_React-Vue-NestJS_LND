import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import './ResetPassword.css';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';


const resetSchema = z.object({
    emailid: z.string().email("Enter a valid email"),
});
type ResetFormData = z.infer<typeof resetSchema>;

const ResetPasswordLink: React.FC = () => {
        const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ResetFormData>({ resolver: zodResolver(resetSchema) });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: ResetFormData) => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post(`http://127.0.0.1:3000/auth/forgot-password`, {
                emailid: data.emailid
            });
            setMessage(res.data.msg || 'Reset link sent to your email.');
            navigate("/reset-password")
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Reset Password</h2>

            <label>Email Address</label>
            {errors.emailid && <p style={{ color: 'red' }}>{errors.emailid.message}</p>}
            <input type="email" {...register("emailid")} placeholder="Enter your email" />

            <button type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {message && <p className="success-msg">{message}</p>}
            {error && <p className="error-msg">{error}</p>}
        </form>
    );
};

export default ResetPasswordLink;
