import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../App';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { Product } from '../types';
import './wishlist.css';

const Wishlist = () => {
  const { 
    wishlistItems, 
    addToWishlist, 
    addToCart
  } = useContext(AppContext);

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    addToWishlist(product);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="qb-wishlist-container">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="qb-wishlist-title"
      >
        Your Wishlist
      </motion.h1>
      
      {wishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="qb-empty-wishlist"
        >
          <div className="qb-empty-icon">
            <FiHeart size={48} />
          </div>
          <h3 className="qb-empty-title">Your wishlist is empty</h3>
          <p className="qb-empty-text">Start adding products to your wishlist</p>
          <Link 
            to="/products" 
            className="qb-empty-btn"
          >
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="qb-wishlist-header"
          >
            <p className="qb-wishlist-count">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </motion.div>

          <div className="qb-wishlist-grid">
            <AnimatePresence>
              {wishlistItems.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="qb-wishlist-item"
                >
                  <div className="qb-product-image-container">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="qb-product-image"
                    />
                  </div>
                  <div className="qb-product-details">
                    <h3 className="qb-product-title">{product.title}</h3>
                    <p className="qb-product-price">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="qb-wishlist-actions">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      className="qb-move-to-cart-btn"
                    >
                      <FiShoppingCart size={16} />
                      <span>Move to Cart</span>
                    </button>
                    <button
                      onClick={() => addToWishlist(product)}
                      className="qb-remove-btn"
                    >
                      <FiTrash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;