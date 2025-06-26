import { motion } from "framer-motion";

// It's a fallback UI, it will render when application went wrong
export const ErrorFallback = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#b00020",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h1>Something went wrong</h1>
        <p>We’re working on fixing it. Please try again later.</p>
      </motion.div>
    </div>
  );
};
