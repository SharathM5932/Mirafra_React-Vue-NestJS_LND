import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";

import "../style/pageNotFound.css";

// Rotating messages (one after the another) for UX dynamic
const messages = [
  "Looks like you took a wrong turn.",
  "Let's get you back on track.",
];

const PageNotFound: React.FC = () => {
  const [index, setIndex] = useState(0);
  // every four second it will change the message
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="page_found_container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      style={{ textAlign: "center" }}
    >
      {/* it's a custom icons from lucid react */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{ marginBottom: "1rem" }}
      >
        <AlertCircle size={64} color="#d9534f" />
      </motion.div>
      <h1>404!</h1>

      {/*Rotating messages for UX dynamic*/}
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          {messages[index]}
        </motion.h2>
      </AnimatePresence>

      {/* Buttons to navigate into home page and login page */}
      <div className="page_found_btn" style={{ marginTop: "1rem" }}>
        <Link to="/" className="btn" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/login" className="btn">
          Login
        </Link>
      </div>
    </motion.section>
  );
};

export default PageNotFound;
