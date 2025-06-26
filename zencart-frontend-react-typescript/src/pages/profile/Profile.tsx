import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, type FC } from "react";
import { motion } from "framer-motion";

import axiosInstance from "../../utils/axiosInstance";
import ProfileCard from "./ProfileCard";
import { setUser } from "../../features/user/userSlice";
import { logout } from "../../features/auth/authSlice";
import Loading from "../../utils/Loading";

import "../../style/profile.css";

const Profile: FC = () => {
  const [isCardVisible, setIsCardVisible] = useState(true);
  const userId = useSelector((state: any) => state.auth.userId) as
    | string
    | undefined;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Making the the API req. for user details using react query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is missing");
      const response = await axiosInstance.get(`/profile/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);

  // Formatting the custom date format
  const formatDate = (date?: string | number | Date): string =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : "N/A";

  useEffect(() => {
    setIsCardVisible(location.pathname === "/profile");
  }, [location.pathname]);

  const profileCard = [
    {
      title: "Your Account Details",
      description: "View name, email, mobile number, etc.",
      path: "/profile/account",
    },
    {
      title: "Your Address",
      description: "Manage address for orders",
      path: "/profile/address",
    },
    {
      title: "Your Orders",
      description: "Check your order details",
      path: "/orders",
    },
    {
      title: "Contact Us",
      description: "Reach our customer support",
      path: "/profile/contactus",
    },
  ];

  //framer motion animation states
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  //framer motion animation states
  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  //framer motion animation states
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.section
      className="profile_container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <h1 className="profile_title">Manage Your Profile</h1>

      {!isLoading && !isError && (
        <p className="profile_sub_heading">
          You joined on <strong>{formatDate(data?.data.createdAt)}</strong> &
          last updated your profile on{" "}
          <strong>{formatDate(data?.data.modifiedAt)}</strong>
        </p>
      )}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loading />
        </motion.div>
      )}

      {isError && (
        <motion.h1
          className="error_msg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <strong>Something went wrong...</strong>
        </motion.h1>
      )}

      {!isLoading && !isError && isCardVisible && (
        <motion.div
          className="profile_card_container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {profileCard.map((profile, idx) => (
            <Link to={profile.path} key={idx}>
              <motion.div variants={cardVariants} layout>
                <ProfileCard
                  title={profile.title}
                  description={profile.description}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}

      <Outlet />

      {isCardVisible && (
        <motion.div
          className="logout_btn"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            className="btn"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Profile;
