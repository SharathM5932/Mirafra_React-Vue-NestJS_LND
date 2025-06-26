import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { signup } from "../../features/auth/authSlice.ts";
import axiosInstance from "../../utils/axiosInstance";
import axiosInstanceProducts from "../../utils/axiosInstanceProducts";

import loginImage from "../../assets/images/undraw_in-the-zone.svg";

// Zod schema definition
const schema = z.object({
  fullName: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  mobileNumber: z.string().optional(),
});

// Type inference from schema
type SignupFormInputs = z.infer<typeof schema>;

const Signup: React.FC = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<SignupFormInputs>({
    resolver: zodResolver(schema),
  });

  // React Query mutation for user register
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupFormInputs) => {
      console.log(data);
      const response = await axiosInstance.post("/auth/signup", data);
      return response.data;
    },
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.token);
      axiosInstance.defaults.headers.common["x-auth-token"] = data.token;
      axiosInstanceProducts.defaults.headers.common["x-auth-token"] =
        data.token;

      dispatch(signup({ token: data.token, userId: data.data.user_id }));

      toast.success(data.message || "Signup successful! Redirecting...", {
        duration: 3000,
      });

      // Navigate is handled by protected routes
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage, { duration: 3000 });
    },
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
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
    <section
      className="signup_container login_container"
      style={{ padding: "30px 60px" }}
    >
      <motion.div
        className="login_design"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <img src={loginImage} className="login_image" alt="signup_image" />
      </motion.div>

      <motion.div
        className="login_box"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <h1>Signup</h1>
        <p>Join now to buy and sell</p>

        <motion.form
          className="login_fields"
          onSubmit={handleSubmit(onSubmit)}
          initial="hidden"
          animate="visible"
          variants={fadeInVariant}
        >
          <motion.div className="input_fullname field" variants={fadeInVariant}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" {...register("fullName")} />
          </motion.div>

          <motion.div className="input_email field" variants={fadeInVariant}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="example@example.com"
              {...register("email")}
            />
          </motion.div>

          <motion.div className="input_phone field" variants={fadeInVariant}>
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              {...register("mobileNumber")}
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
              {isPending ? "Loading..." : "Signup"}
            </button>
          </motion.div>
        </motion.form>

        <div className="login_link">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Signup;
