import HeroSection from "./HeroSection";
import HeroSectionReverse from "./HeroSectionReverse";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer";

import iphone14pro1 from "../../assets/images/iphone14pro1.jpg";
import thinkpad from "../../assets/images/thinkpad-x1-carbon-4.jpg";
import LeftHorizontalScroll from "./LeftHorizontalScroll";

import "../../style/home.css";

const Home = () => {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="iPhone 14 Pro"
        subtitle="The iPhone 14 Pro features a 6.1-inch Super Retina XDR display, A16 Bionic chip, Dynamic Island for interactive notifications, a 48MP main camera with advanced low-light performance"
        link="/products"
        image={iphone14pro1}
      />

      {/* Brand Logo Section */}
      <div className="brand_logo">
        <h1>Brands You Trust, Products You Love</h1>
      </div>

      {/* Horizontal Scroll Section */}
      <LeftHorizontalScroll />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Enhanced Footer */}
      <Footer />
    </main>
  );
};

export default Home;
