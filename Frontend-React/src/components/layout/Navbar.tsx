import { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaShoppingCart,
  FaEllipsisV,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { AppContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { signOut } from "../../features/auth/authSlice";
import "./styles.css";

interface Product {
  id: number;
  category: string;
}

interface MenuItem {
  label: string;
  path: string;
  onClick?: () => void;
}

const Navbar = () => {
  const { cartItemsCount, wishlistItems, addToWishlist, isInWishlist } =
    useContext(AppContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { isAuthenticated, username, email } = useSelector((state: RootState) => state.auth);

  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isThreeDotsOpen, setIsThreeDotsOpen] = useState(false);
  const [isWishlistDropdownOpen, setIsWishlistDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [categories, setCategories] = useState<string[]>([]);

  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const threeDotsRef = useRef<HTMLDivElement>(null);
  const wishlistDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/db.json");
        const data: Product[] = await response.json();

        const uniqueCategories = Array.from(
          new Set(
            data
              .map((product) => product.category)
              .filter(
                (category): category is string => typeof category === "string"
              )
              .map((category) =>
                category
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              )
          )
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        threeDotsRef.current &&
        !threeDotsRef.current.contains(event.target as Node)
      ) {
        setIsThreeDotsOpen(false);
      }
      if (
        wishlistDropdownRef.current &&
        !wishlistDropdownRef.current.contains(event.target as Node)
      ) {
        setIsWishlistDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(
          searchQuery
        )}&category=${encodeURIComponent(selectedCategory)}`
      );
      setSearchQuery("");
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  // Dynamic user menu items based on authentication status
  const userMenuItems: MenuItem[] = isAuthenticated
    ? [
        { label: `Hi, ${username || email?.split('@')[0] || 'User'}`, path: "/profile" },
        // { label: "My Profile", path: "/profile" },
        { label: "Orders", path: "/orders" },
        { label: "Wishlist", path: "/wishlist" },
        { label: "Sign Out", path: "#", onClick: handleSignOut }
      ]
    : [
        { label: "Sign Up", path: "/register" },
        { label: "Login", path: "/login" },
        { label: "Track Order", path: "/orders" },
        { label: "Wishlist", path: "/wishlist" }
      ];

  const threeDotsMenuItems: MenuItem[] = [
    { label: "Services", path: "/services" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" },
    // { label: "Become a Seller", path: "/seller" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">SwiftKart</Link>
        </div>

        {/* Right Side Navigation */}
        <div className="nav-right">
          {/* Wishlist Dropdown */}
          <div
            className="wishlist-dropdown-container"
            ref={wishlistDropdownRef}
          >
            <button
              className="wishlist-button2"
              onClick={() => setIsWishlistDropdownOpen(!isWishlistDropdownOpen)}
              aria-expanded={isWishlistDropdownOpen}
              aria-label="Wishlist"
            >
              {wishlistItems.length > 0 ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart />
              )}
              {wishlistItems.length > 0 && (
                <span className="wishlist-count">{wishlistItems.length}</span>
              )}
            </button>

            {isWishlistDropdownOpen && (
              <div className="wishlist-dropdown">
                {wishlistItems.length > 0 ? (
                  <>
                    <h4 className="dropdown-header">Your Wishlist</h4>
                    <div className="wishlist-items">
                      {wishlistItems.slice(0, 5).map((item) => (
                        <div key={item.id} className="wishlist-item">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="wishlist-item-image"
                          />
                          <div className="wishlist-item-details">
                            <Link
                              to={`/products/${item.id}`}
                              className="wishlist-item-title"
                              onClick={() => setIsWishlistDropdownOpen(false)}
                            >
                              {item.title.substring(0, 30)}...
                            </Link>
                            <span className="wishlist-item-price">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addToWishlist(item);
                            }}
                            className="wishlist-remove-btn"
                            aria-label="Remove from wishlist"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    {wishlistItems.length > 5 && (
                      <Link
                        to="/wishlist"
                        className="view-all-link"
                        onClick={() => setIsWishlistDropdownOpen(false)}
                      >
                        View all ({wishlistItems.length})
                      </Link>
                    )}
                  </>
                ) : (
                  <div className="empty-wishlist">
                    <FaRegHeart className="empty-icon" />
                    <p>Your wishlist is empty</p>
                    <Link
                      to="/products"
                      className="browse-link"
                      onClick={() => setIsWishlistDropdownOpen(false)}
                    >
                      Browse products
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="cart-button1" aria-label="Shopping cart">
            <FaShoppingCart />
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </Link>

          {/* User Dropdown */}
          <div className="user-dropdown-container" ref={userDropdownRef}>
            <button
              className="user-button"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              aria-expanded={isUserDropdownOpen}
              aria-label="User menu"
            >
              <FaUser />
              <span className="user-text">
                {isAuthenticated ? (username || email?.split('@')[0] || 'Account') : 'Login'}
              </span>
            </button>

            {isUserDropdownOpen && (
              <div className="user-dropdown">
                {userMenuItems.map((item) => (
                  item.onClick ? (
                    <button
                      key={item.label}
                      className="dropdown-item"
                      onClick={item.onClick}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="dropdown-item"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Three Dots Menu */}
          <div className="three-dots-container" ref={threeDotsRef}>
            <button
              className="three-dots-button"
              onClick={() => setIsThreeDotsOpen(!isThreeDotsOpen)}
              aria-expanded={isThreeDotsOpen}
              aria-label="More options"
            >
              <FaEllipsisV />
            </button>
            {isThreeDotsOpen && (
              <div className="three-dots-dropdown">
                {threeDotsMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="dropdown-item"
                    onClick={() => setIsThreeDotsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;