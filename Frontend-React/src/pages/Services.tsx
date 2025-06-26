import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaExchangeAlt,
  FaHeadset,
  FaShieldAlt,
  FaTags,
  FaGift,
} from "react-icons/fa";
import "./services.css";

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const services = [
    {
      icon: <FaShippingFast size={40} />,
      title: "Fast Shipping",
      description:
        "Get your products delivered within 2-3 business days with our premium shipping service.",
    },
    {
      icon: <FaExchangeAlt size={40} />,
      title: "Easy Returns",
      description:
        "Not satisfied? Return within 30 days for a full refund, no questions asked.",
    },
    {
      icon: <FaHeadset size={40} />,
      title: "24/7 Support",
      description:
        "Our customer service team is available around the clock to assist you.",
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Secure Payments",
      description:
        "Shop with confidence using our 256-bit SSL encrypted payment gateway.",
    },
    {
      icon: <FaTags size={40} />,
      title: "Daily Deals",
      description:
        "Check our daily deals section for exclusive discounts on premium products.",
    },
    {
      icon: <FaGift size={40} />,
      title: "Gift Wrapping",
      description:
        "Add a personal touch with our free gift wrapping service for special occasions.",
    },
  ];

  return (
    <div className="services-page">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-section2"
      >
        <div className="hero-content">
          <h1 className="hero-title">Our Premium Services</h1>
          <p className="hero-subtitle">
            Enhancing your shopping experience with exceptional services
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="services-grid"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
            className="service-card"
          >
            <div className="icon-wrapper">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="cta-section"
      >
        <h2 className="cta-title">Have Questions About Our Services?</h2>
        <p className="cta-text">
          Our customer support team is ready to help you with any inquiries.
        </p>
        <button className="cta-button">Contact Us</button>
      </motion.div>
    </div>
  );
};

export default Services;
