import { BadgeCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import type { LocationState } from "../types/order";

import "../style/paymentPage.css";

// Framer motion animation state
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Lucid icon animation state
const iconAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    color: ["#28a745", "#2ecc71", "#28a745"],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const PaymentPage: React.FC = () => {
  const { state } = useLocation() as { state: LocationState };

  // Extract orderId and transactionId from location state
  const orderId = state?.orderId;
  const transactionId = state?.transactionId;

  return (
    <motion.div
      className="payment_container"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <motion.div className="payment_logo" variants={fadeInUp}>
        <motion.div
          {...iconAnimation}
          style={{
            display: "inline-block",
            color: "#28a745",
            marginBottom: "20px",
          }}
        >
          <BadgeCheck size={80} />
        </motion.div>
      </motion.div>
      <motion.h1 variants={fadeInUp}>
        Order Confirmed. Payment Complete!
      </motion.h1>
      <motion.p variants={fadeInUp}>
        Thank you for your purchase! Your order has been successfully processed.
      </motion.p>
      <motion.h3 className="transaction_id" variants={fadeInUp}>
        Transaction Id: {transactionId}
      </motion.h3>
      <motion.div className="payment_btn" variants={fadeInUp}>
        <Link to="/orders" className="btn">
          View Order History
        </Link>
        <Link to="/products" className="btn">
          Explore More Products
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default PaymentPage;
