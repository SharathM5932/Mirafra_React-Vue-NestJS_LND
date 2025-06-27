import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import '../../styles/Signin.css'

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotPasswordType = z.infer<typeof schema>;

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ForgotPasswordType) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/auth/forgot-password", data);
      toast.success("Reset link sent to your email");
    } catch (error) {
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="login-container">
        <h2 className="login">Forgot Password</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? (
              <div className="signin-loader"></div>
            ) : "Send Reset link"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
