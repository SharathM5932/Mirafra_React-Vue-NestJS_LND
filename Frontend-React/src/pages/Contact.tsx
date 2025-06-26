import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaClock, FaHeadset } from 'react-icons/fa';
import './contact.css';

const Contact = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

  return (
    <div className="qb-contact-container">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="qb-contact-hero"
      >
        <div className="qb-hero-overlay"></div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="qb-hero-content"
        >
          <motion.h1 variants={slideUp} className="qb-hero-title">
            Contact <span>SwiftKart</span>
          </motion.h1>
          <motion.p variants={slideUp} className="qb-hero-subtitle">
            We'd love to hear from you! Reach out anytime.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Contact Info */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="qb-contact-info-section"
      >
        <motion.div variants={fadeIn} className="qb-section-header">
          <h2>Get In Touch</h2>
          <div className="qb-divider"></div>
        </motion.div>

        <div className="qb-contact-methods">
          <motion.div 
            variants={slideUp}
            whileHover={{ y: -5 }}
            className="qb-contact-card"
          >
            <div className="qb-contact-icon">
              <FaMapMarkerAlt size={24} />
            </div>
            <h3>Our Location</h3>
            <p>123 Shopping Street, Ecommerce City</p>
          </motion.div>

          <motion.div 
            variants={slideUp}
            whileHover={{ y: -5 }}
            className="qb-contact-card"
          >
            <div className="qb-contact-icon">
              <FaPhone size={24} />
            </div>
            <h3>Call Us</h3>
            <p>+1 (234) 567-8900</p>
            <p>Mon-Fri: 9am-6pm</p>
          </motion.div>

          <motion.div 
            variants={slideUp}
            whileHover={{ y: -5 }}
            className="qb-contact-card"
          >
            <div className="qb-contact-icon">
              <FaEnvelope size={24} />
            </div>
            <h3>Email Us</h3>
            <p>support@SwiftKart.com</p>
            <p>Response within 24 hours</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="qb-contact-form-section"
      >
        <motion.div variants={fadeIn} className="qb-section-header">
          <h2>Send Us a Message</h2>
          <div className="qb-divider"></div>
        </motion.div>

        <motion.form 
          variants={staggerContainer}
          className="qb-contact-form"
        >
          <motion.div variants={slideUp} className="qb-form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" placeholder="John Doe" />
          </motion.div>

          <motion.div variants={slideUp} className="qb-form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="john@example.com" />
          </motion.div>

          <motion.div variants={slideUp} className="qb-form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="How can we help?" />
          </motion.div>

          <motion.div variants={slideUp} className="qb-form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" rows={5} placeholder="Type your message here..."></textarea>
          </motion.div>

          <motion.button
            variants={slideUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="qb-submit-btn"
          >
            Send Message <FaPaperPlane />
          </motion.button>
        </motion.form>
      </motion.section>

      {/* Support Info */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        variants={staggerContainer}
        viewport={{ once: true }}
        className="qb-support-section"
      >
        <motion.div variants={fadeIn} className="qb-section-header">
          <h2>Customer Support</h2>
          <div className="qb-divider"></div>
        </motion.div>

        <div className="qb-support-content">
          <motion.div 
            variants={slideUp}
            className="qb-support-card"
          >
            <div className="qb-support-icon">
              <FaHeadset size={32} />
            </div>
            <h3>24/7 Support</h3>
            <p>Our customer service team is available around the clock to assist you with any questions or concerns.</p>
          </motion.div>

          <motion.div 
            variants={slideUp}
            className="qb-support-card"
          >
            <div className="qb-support-icon">
              <FaClock size={32} />
            </div>
            <h3>Quick Response</h3>
            <p>We typically respond to all inquiries within 2 hours during business hours.</p>
          </motion.div>
        </div>
      </motion.section><br/>
    </div>
  );
};

export default Contact;