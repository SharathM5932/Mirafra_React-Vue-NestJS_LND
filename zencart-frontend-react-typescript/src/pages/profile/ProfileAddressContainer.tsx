import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { motion } from "framer-motion";

import axiosInstance from "../../utils/axiosInstance";
import AddressCard from "./AddressCard";
import { setAddress } from "../../features/user/userSlice";
import Loading from "../../utils/Loading";
import type { Address } from "../../types/user";

import "../../style/profileAddressContainer.css";

// framer motion animation states
const fadeInVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ProfileAddressContainer = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.user.address) as Address[];
  const userId = useSelector((state: any) => state.auth.userId) as string;

  // Making the req. for address
  const { data, isLoading, isError } = useQuery({
    queryKey: ["addresses", userId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      if (!id) throw new Error("User ID is missing");
      const response = await axiosInstance.get(`/profile/address/${id}`);
      return response.data;
    },
    enabled: Boolean(userId),
  });

  // setting the address state in the redux
  useEffect(() => {
    if (data?.data) {
      dispatch(setAddress(data.data));
    }
  }, [data, dispatch]);

  return (
    <motion.section
      className="address_container"
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
    >
      <motion.h1 variants={fadeInVariant}>Your Addresses</motion.h1>

      {isLoading && <Loading />}
      {isError && (
        <motion.p className="error_msg" variants={fadeInVariant}>
          Failed to load addresses. Please try again.
        </motion.p>
      )}

      <motion.div className="address_cards" variants={fadeInVariant}>
        <Link
          className="add_address_icon"
          to="/profile/addaddress"
          aria-label="Add new address"
        >
          +
        </Link>

        {address && address.length > 0
          ? address.map((addr) => <AddressCard key={addr._id} {...addr} />)
          : !isLoading && (
              <motion.strong
                className="no_address_box"
                variants={fadeInVariant}
              >
                No Address Found
              </motion.strong>
            )}
      </motion.div>
    </motion.section>
  );
};

export default ProfileAddressContainer;
