import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaApple, FaGooglePlay } from 'react-icons/fa';
import { IoMdLaptop, IoMdPhonePortrait } from 'react-icons/io';
import { GiClothes, GiFruitBowl } from 'react-icons/gi';
import { MdChildCare } from 'react-icons/md';
import './styles.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>Subscribe to our Newsletter</h3>
            <p>Get the latest updates on new products and upcoming sales</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </div>
          
          <div className="footer-app">
            <div className="app-buttons">
              <button className="app-store">
                <FaApple className="app-icon" />
                <div className="app-text">
                  <span>Download on the</span>
                  <span>App Store</span>
                </div>
              </button>
              <button className="play-store">
                <FaGooglePlay className="app-icon" />
                <div className="app-text">
                  <span>Get it on</span>
                  <span>Google Play</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-middle">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li>
                <GiClothes className="category-icon" />
                <a href="/products/men">Men's Fashion</a>
              </li>
              <li>
                <GiClothes className="category-icon" />
                <a href="/products/women">Women's Fashion</a>
              </li>
              <li>
                <MdChildCare className="category-icon" />
                <a href="/products/kids">Kids</a>
              </li>
              <li>
                <IoMdLaptop className="category-icon" />
                <a href="/products/laptop">Laptop</a>
              </li>
              <li>
                <IoMdPhonePortrait className="category-icon" />
                <a href="/products/smartphone">Smartphone</a>
              </li>
              <li>
                <GiFruitBowl className="category-icon" />
                <a href="/products/grocery">Grocery</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQs</a></li>
              <li><a href="/shipping">Shipping Policy</a></li>
              <li><a href="/returns">Returns & Exchanges</a></li>
              <li><a href="/size-guide">Size Guide</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>About Us</h4>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <FaPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>support@shopeasy.com</span>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Main Street, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} ShopEasy. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;