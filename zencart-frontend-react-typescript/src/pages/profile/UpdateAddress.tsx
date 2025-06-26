import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";

import axiosInstance from "../../utils/axiosInstance";
import type { AddressFormData } from "../../types/user";

import "../../style/addAddress.css";

import addressImage from "../../assets/images/undraw_delivery-address.svg";

// Define schema for address form validation
const schema = z.object({
  country: z.string().min(1, "Country is required"),
  fullName: z.string().min(1, "Full name is required"),
  addressLineOne: z.string().min(1, "Address Line 1 is required"),
  addressLineTwo: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "PIN code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

const UpdateAddress = () => {
  const { id } = useParams<{ id: string }>(); // Address ID from URL
  const { state: addressData } = useLocation();
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.auth.userId) as string;
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: zodResolver(schema),
    defaultValues: addressData || {},
  });

  // Making the post req. for address
  const { mutate } = useMutation({
    mutationFn: async (data: AddressFormData) => {
      const response = await axiosInstance.put(
        `/profile/address/update/${id}`,
        {
          userId,
          ...data,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["addresses", userId]);
      toast.success(data.message || "Address updated successfully", {
        duration: 3000,
      });
      navigate("/profile/address");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage, { duration: 3000 });
    },
  });

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
    <section className="add_address_container">
      <motion.div
        className="address_image"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <img src={addressImage} alt="Address Image" />
      </motion.div>

      <motion.form
        className="add_address_form"
        onSubmit={handleSubmit((data) => mutate(data))}
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <motion.div className="address_title" variants={fadeInVariant}>
          <h1>Update Address</h1>
          <p>Manage your shipping address easily</p>
        </motion.div>

        <motion.div className="merge_field" variants={fadeInVariant}>
          <div className="input_fullname field">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" {...register("fullName")} />
            {errors.fullName && (
              <p className="error_msg">{errors.fullName.message}</p>
            )}
          </div>

          <div className="input_phone_number field">
            <label htmlFor="phoneNumber">Phone number</label>
            <input type="text" {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="error_msg">{errors.phoneNumber.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="input_address_line_one field"
          variants={fadeInVariant}
        >
          <label htmlFor="addressLineOne">Address line 1</label>
          <input type="text" {...register("addressLineOne")} />
          {errors.addressLineOne && (
            <p className="error_msg">{errors.addressLineOne.message}</p>
          )}
        </motion.div>

        <motion.div
          className="input_address_line_two field"
          variants={fadeInVariant}
        >
          <label htmlFor="addressLineTwo">Address line 2</label>
          <input type="text" {...register("addressLineTwo")} />
        </motion.div>

        <motion.div className="merge_field" variants={fadeInVariant}>
          <div className="input_city field">
            <label htmlFor="city">City</label>
            <input type="text" {...register("city")} />
            {errors.city && <p className="error_msg">{errors.city.message}</p>}
          </div>

          <div className="input_state field">
            <label htmlFor="state">State</label>
            <input type="text" {...register("state")} />
            {errors.state && (
              <p className="error_msg">{errors.state.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div className="merge_field" variants={fadeInVariant}>
          <div className="input_pincode field">
            <label htmlFor="pincode">PIN Code</label>
            <input type="text" {...register("pincode")} />
            {errors.pincode && (
              <p className="error_msg">{errors.pincode.message}</p>
            )}
          </div>

          <div className="input_country field">
            <label htmlFor="country">Country</label>
            <input type="text" {...register("country")} />
            {errors.country && (
              <p className="error_msg">{errors.country.message}</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className="submit_btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={fadeInVariant}
        >
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Address"}
          </button>
        </motion.div>
      </motion.form>
    </section>
  );
};

export default UpdateAddress;
