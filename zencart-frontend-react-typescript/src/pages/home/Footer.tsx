import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="enhanced-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">ZenCart</h3>
          <p className="footer-description">
            Your trusted destination for premium electronics and technology
            products. Quality guaranteed, customer satisfaction prioritized.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/deals">Special Deals</Link>
            </li>
            <li>
              <Link to="/brands">Brands</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Customer Service</h4>
          <ul className="footer-links">
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/support">Support Center</Link>
            </li>
            <li>
              <Link to="/returns">Returns & Exchanges</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping Info</Link>
            </li>
            <li>
              <Link to="/warranty">Warranty</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Account</h4>
          <ul className="footer-links">
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Create Account</Link>
            </li>
            <li>
              <Link to="/profile">My Account</Link>
            </li>
            <li>
              <Link to="/orders">Order History</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            © 2025 ZenCart.com, Inc. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
