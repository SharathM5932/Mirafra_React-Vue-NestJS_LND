import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import type { User } from "../../types/user";

import "../../style/profileAccountCard.css";

// framer motion animation states
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ProfileAccountCard = () => {
  const user = useSelector((state: any) => state.user.user) as User;

  return (
    <motion.section
      className="account_container"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <table className="account_table">
        <tbody>
          <tr>
            <td>Account ID</td>
            <td>{user?._id || "—"}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{user?.fullName || "—"}</td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>{user?.email || "—"}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{user?.mobileNumber || "Update Now"}</td>
          </tr>
          <tr>
            <td>Account Access To</td>
            <td>
              {user?.role?.length
                ? user.role
                    .map((role) => role.charAt(0).toUpperCase() + role.slice(1))
                    .join(", ")
                : "—"}
            </td>
          </tr>
        </tbody>
      </table>
    </motion.section>
  );
};

export default ProfileAccountCard;
