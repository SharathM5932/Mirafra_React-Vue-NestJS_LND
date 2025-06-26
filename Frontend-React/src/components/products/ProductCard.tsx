import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../App";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  compactMode?: boolean;
}

const ProductCard = ({ product, compactMode = false }: ProductCardProps) => {
  const { addToCart, addToWishlist, isInWishlist } = useContext(AppContext);

  const renderRatingStars = () => {
    if (compactMode) return null;

    const rating = product.rating || { rate: 0, count: 0 };
    const stars: React.ReactElement[] = [];
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }

    return (
      <div className="rating">
        {stars}
        <span className="review-count">({rating.count})</span>
      </div>
    );
  };

  return (
    <div className={`product-card ${compactMode ? "compact" : ""}`}>
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        {!compactMode && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToWishlist(product);
            }}
            className={`wishlist-button ${
              isInWishlist(product._id) ? "active" : ""
            }`}
            aria-label={
              isInWishlist(product._id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            {isInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>

      <div className="details">
        <h3 className="title">{product.title}</h3>
        {renderRatingStars()}
        <div className="price-section">
          <span className="price">${product.price.toFixed(2)}</span>
          <button
            className="cart-button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            aria-label="Add to cart"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;