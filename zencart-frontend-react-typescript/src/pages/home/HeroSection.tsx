import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import type { HeroSectionProps } from "../../types/home";

import "../../style/heroSection.css";

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  link,
  image,
}) => {
  return (
    <motion.section
      className="hero_section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div
        className="hero_content"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to={link} className="hero_link">
            Explore
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero_image"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <img src={image} alt={title} />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
