import './Footer.css';
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
    FaPinterest,
    FaYoutube
} from 'react-icons/fa';

const Footer = () => {
    return (
        <section className="footer">
            <div className="footer-row">
                <div className="footer-col">
                    <h4>Company</h4>
                    <ul className="links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        {/* <li><a href="#">Press</a></li> */}
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Shop</h4>
                    <ul className="links">
                        <li><a href="#">All Products</a></li>
                        {/* <li><a href="#">New Arrivals</a></li> */}
                        <li><a href="#">Best Sellers</a></li>
                        <li><a href="#">Deals & Offers</a></li>
                        <li><a href="#">Gift Cards</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul className="links">
                        <li><a href="#">Help Center</a></li>
                        {/* <li><a href="#">Shipping Info</a></li> */}
                        <li><a href="#">Returns & Exchanges</a></li>
                        {/* <li><a href="#">Order Tracking</a></li> */}
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Payment Options</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Newsletter</h4>
                    <p>
                        {/* Subscribe for updates on new products, special offers, and exclusive discounts. */}
                        Subscribe for updates.
                    </p>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email" required />
                        <button type="submit">SUBSCRIBE</button>
                    </form>
                    <div className="icons">
                        <FaFacebookF />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaInstagram />
                        <FaPinterest />
                        <FaYoutube />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
