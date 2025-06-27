import React from "react";
import { useWishlist } from "./wishlistContext";
import { Product } from "../../types/Product";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/WomenProducts.css"; // Reuse existing product card styles

const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Navbar />
      <div className="women-products">
        <h2>Your Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <div className="cart-grid">
            {wishlist.map((product: Product) => (
              product && product._id && product.name ? (
                <div key={product._id} className="cart-card">
                  <img
                    src={
                      product.pimg
                        ? `http://localhost:3002/prodimgs/${product.pimg}`
                        : "https://via.placeholder.com/150" // fallback image
                    }
                    alt={product.name}
                    className="cart-img"
                  />
                  <div className="cart-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ₹{product.price}</p>
                    <p>Category: {product.cat}</p>
                    <p>Brand: {product.brand}</p>
                    <p>Color: {product.color}</p>
                  </div>
                  <div className="card-buttons">
                    <button
                      className="add-btn"
                      onClick={() => removeFromWishlist(product._id)}
                      style={{ backgroundColor: "#ff4d4f" }}
                    >
                      Remove ❌
                    </button>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
