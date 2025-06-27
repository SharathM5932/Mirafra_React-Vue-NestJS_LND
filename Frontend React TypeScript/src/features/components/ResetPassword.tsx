import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../styles/Signin.css'
import { toast } from "react-toastify";


const ResetPassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token = new URLSearchParams(location.search).get("token");

  const { register, handleSubmit, formState: { errors } } = useForm<{
    password: string;
  }>();

  const onSubmit = async (data: { password: string }) => {
    setLoading(true); // Set loading to true before request
    try {
      await axios.post("http://localhost:3000/auth/reset-password", {
        password: data.password,
        token,
      });
      toast.success("Password reset successful");
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="body">
      <div className="login-container">
        <h2 className="login">Reset Password</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input"
            type="password"
            placeholder="New Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? (
              <div className="signin-loader"></div>
            ) : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
