import { motion } from 'framer-motion';
import { FaShoppingBasket, FaUsers, FaAward, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './about.css';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const categories = [
    { name: "Men's Fashion", items: "Clothing, Footwear, Accessories" },
    { name: "Women's Fashion", items: "Apparel, Jewelry, Handbags" },
    { name: "Kids Collection", items: "Toys, Clothing, School Supplies" },
    { name: "Laptops", items: "Gaming, Business, Student Laptops" },
    { name: "Mobiles", items: "Smartphones, Accessories, Tablets" },
    { name: "Grocery", items: "Daily Essentials, Snacks, Beverages" }
  ];

  return (
    <div className="qb-about-container">
      {/* Hero Section with Dark Background */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="qb-hero-about"
      >
        <div className="qb-hero-overlay"></div>
        <div className="qb-hero-content">
          <motion.h1 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="qb-hero-title"
          >
            Welcome to <span className="qb-brand-name">SwiftKart</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="qb-hero-subtitle"
          >
            Your one-stop shop for all your needs
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="qb-story-section"
      >
        <motion.div variants={fadeInUp} className="qb-section-header">
          <h2>Our Story</h2>
          <div className="qb-divider-about"></div>
        </motion.div>
        <motion.div variants={fadeInUp} className="qb-story-content">
          <p>
            Founded in 2023, SwiftKart began as a small local store with a big vision - to make shopping 
            convenient, fast, and enjoyable for everyone. Today, we've grown into a leading ecommerce 
            platform serving thousands of happy customers nationwide.
          </p>
          <p>
            Our name reflects our mission - to get your shopping done quickly, with everything you need in one 
            basket. From fashion to electronics to daily essentials, we've got you covered.
          </p>
        </motion.div>
      </motion.section>

      {/* What We Offer */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="qb-offer-section"
      >
        <motion.div variants={fadeInUp} className="qb-section-header">
          <h2>What We Offer</h2>
          <div className="qb-divider-about"></div>
        </motion.div>
        <motion.div variants={fadeInUp} className="qb-categories-grid">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="qb-category-card"
            >
              <h3>{category.name}</h3>
              <p>{category.items}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="qb-choose-section"
      >
        <motion.div variants={fadeInUp} className="qb-section-header">
          <h2>Why Choose SwiftKart</h2>
          <div className="qb-divider-about"></div>
        </motion.div>
        <div className="qb-features-grid">
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="qb-feature-card"
          >
            <div className="qb-feature-icon">
              <FaShoppingBasket size={30} />
            </div>
            <h3>Wide Selection</h3>
            <p>Over 10,000 products across all categories</p>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="qb-feature-card"
          >
            <div className="qb-feature-icon">
              <FaUsers size={30} />
            </div>
            <h3>Customer Focus</h3>
            <p>24/7 support and easy return policy</p>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="qb-feature-card"
          >
            <div className="qb-feature-icon">
              <FaAward size={30} />
            </div>
            <h3>Quality Assurance</h3>
            <p>All products verified for quality and authenticity</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="qb-contact-section"
      >
        <motion.div variants={fadeInUp} className="qb-section-header">
          <h2>Get In Touch</h2>
          <div className="qb-divider-about"></div>
        </motion.div>
        <div className="qb-contact-grid">
          <motion.div variants={fadeInUp} className="qb-contact-card">
            <div className="qb-contact-icon-about">
              <FaMapMarkerAlt size={25} />
            </div>
            <h3>Our Location</h3>
            <p>123 Shopping Street, Ecommerce City</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="qb-contact-card">
            <div className="qb-contact-icon-about">
              <FaPhone size={25} />
            </div>
            <h3>Call Us</h3>
            <p>+1 (234) 567-8900</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="qb-contact-card">
            <div className="qb-contact-icon-about">
              <FaEnvelope size={25} />
            </div>
            <h3>Email Us</h3>
            <p>support@SwiftKart.com</p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;