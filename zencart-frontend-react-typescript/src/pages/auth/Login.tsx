import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { login } from "../../features/auth/authSlice.ts";
import axiosInstance from "../../utils/axiosInstance";
import axiosInstanceProducts from "../../utils/axiosInstanceProducts";

import "../../style/login.css";

import loginImage from "../../assets/images/undraw_in-the-zone.svg";

// Validation schema for login form
const schema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(1).optional(),
});

// Infer TypeScript type from Zod schema
type LoginFormInputs = z.infer<typeof schema>;

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
  });

  // React Query mutation for user login
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      axiosInstance.defaults.headers.common["x-auth-token"] = data.token;
      axiosInstanceProducts.defaults.headers.common["x-auth-token"] =
        data.token;

      dispatch(login({ token: data.token, userId: data.data }));

      toast.success(data.message || "Login successful! Redirecting...", {
        duration: 3000,
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage, { duration: 3000 });
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    mutate(data);
  };

  // framer motion animation states
  const fadeInVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="login_container">
      <motion.div
        className="login_design"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <img src={loginImage} className="login_image" alt="login_image" />
      </motion.div>

      <motion.div
        className="login_box"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <h1>Login</h1>
        <p>Securely access your account</p>

        <motion.form
          className="login_fields"
          onSubmit={handleSubmit(onSubmit)}
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
        >
          <motion.div className="input_email field" variants={fadeInVariant}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="example@example.com"
              {...register("email")}
            />
          </motion.div>

          <motion.div className="input_password field" variants={fadeInVariant}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} />
          </motion.div>

          <motion.div
            className="submit_btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInVariant}
          >
            <button className="btn" type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </button>
          </motion.div>
        </motion.form>

        <div className="signup_link">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
