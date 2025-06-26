import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import type { ContactFormData } from "../../types/user";

import "../../style/contactus.css";

import contactUs from "../../assets/images/undraw_contact-us.svg";

// validation for the contact us form
const schema = z.object({
  email: z.string().email("Invalid email format"),
  description: z
    .string()
    .min(30, "Min 30 characters allowed")
    .max(60, "Max 60 characters allowed"),
});

// framer motion animation states
const fadeInVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ContactUs = () => {
  const emailId = useSelector((state: any) => state.user.user.email);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: emailId },
  });

  // handling the error, and display using toast notification
  useEffect(() => {
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.description) {
      toast.error(errors.description.message);
    }
  }, [errors]);

  // on form submit Handler
  const onSubmit = (data: ContactFormData) => {
    toast.success("Thank you for reaching out! We'll get back to you soon.");
  };

  return (
    <section className="contactus_container">
      <motion.div
        className="contactus_image"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <img src={contactUs} alt="Contact Us" />
      </motion.div>

      <motion.div
        className="contactus_form"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="contactus_form">
          <motion.div className="contactus_title" variants={fadeInVariant}>
            <h1>Contact Us</h1>
            <p>Reach out to us for any help or inquiries.</p>
          </motion.div>

          <motion.div className="input_email field" variants={fadeInVariant}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email")}
              disabled={true}
              placeholder="Enter your email"
            />
          </motion.div>

          <motion.div
            className="input_description field"
            variants={fadeInVariant}
          >
            <label htmlFor="description">Description</label>
            <textarea
              {...register("description")}
              placeholder="Enter your message (max 60 characters)"
            />
          </motion.div>

          <motion.div
            className="submit_btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInVariant}
          >
            <button type="submit" disabled={isSubmitting} className="btn">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactUs;
