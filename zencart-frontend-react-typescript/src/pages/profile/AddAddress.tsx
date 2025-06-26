import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";

import axiosInstance from "../../utils/axiosInstance";

import "../../style/addAddress.css";

import addressImage from "../../assets/images/undraw_delivery-address.svg";

// validation schema for add address form
const schema = z.object({
  country: z.string(),
  fullName: z.string(),
  addressLineOne: z.string(),
  addressLineTwo: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  phoneNumber: z.string(),
});

type FormData = z.infer<typeof schema>;

const AddAddress = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // send a post request to add address
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      console.log(data);
      const response = await axiosInstance.post("/profile/address/add", {
        userId: userId,
        ...data,
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userData", userId]);
      toast.success(data.message || "Address added successfully!", {
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
    <>
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
            <h1>Add a new address</h1>
            <p>Manage your shipping address easily</p>
          </motion.div>

          <motion.div className="merge_field" variants={fadeInVariant}>
            <div className="input_fullname field">
              <label htmlFor="fullname">Full Name:</label>
              <input type="text" name="fullname" {...register("fullName")} />
            </div>

            <div className="input_phone_number field">
              <label htmlFor="phone_number">Phone number:</label>
              <input
                type="text"
                name="phone_number"
                {...register("phoneNumber")}
              />
            </div>
          </motion.div>

          <motion.div
            className="input_address_line_one field"
            variants={fadeInVariant}
          >
            <label htmlFor="address_line_one">Address line 1:</label>
            <input
              type="text"
              className="address_line_1"
              name="address_line_one"
              placeholder="Street address, P.O. box, company name, c/o"
              {...register("addressLineOne")}
            />
          </motion.div>

          <motion.div
            className="input_address_line_two field"
            variants={fadeInVariant}
          >
            <label htmlFor="address_line_two">Address line 2:</label>
            <input
              type="text"
              className="address_line_2"
              name="address_line_two"
              placeholder="Apartment, suite, unit, building, floor, etc."
              {...register("addressLineTwo")}
            />
          </motion.div>

          <motion.div className="merge_field" variants={fadeInVariant}>
            <div className="input_city field">
              <label htmlFor="city">City</label>
              <input type="text" name="city" {...register("city")} />
            </div>

            <div className="input_state field">
              <label htmlFor="state">State</label>
              <input type="text" name="state" {...register("state")} />
            </div>
          </motion.div>

          <motion.div className="merge_field" variants={fadeInVariant}>
            <div className="input_pincode field">
              <label htmlFor="pincode">PIN Code:</label>
              <input type="text" name="pincode" {...register("pincode")} />
            </div>

            <div className="input_country field">
              <label htmlFor="country">Country:</label>
              <input type="text" name="country" {...register("country")} />
            </div>
          </motion.div>

          <motion.div
            className="submit_btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeInVariant}
          >
            <button className="btn" type="submit" disabled={isPending}>
              {isPending ? "Loading..." : "Add address"}
            </button>
          </motion.div>
        </motion.form>
      </section>
    </>
  );
};

export default AddAddress;
