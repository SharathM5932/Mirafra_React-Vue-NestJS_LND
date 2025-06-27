import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { fetchProducts } from '../product/ProductSlice';
import { useCart } from '../Cart/cartContext';
import { useWishlist } from '../wishlist/wishlistContext'; // ✅ Add wishlist
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/WomenProducts.css';
import { Product } from '../../types/Product';

const ChildrenProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // ✅ Wishlist context

  const [priceFilter, setPriceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterByPrice = (product: Product) => {
    const price = product.price || 0;
    if (priceFilter === 'below200') return price < 200;
    if (priceFilter === '200to400') return price >= 200 && price <= 400;
    if (priceFilter === 'above400') return price > 400;
    return true;
  };

  const childrenProducts = products
    .filter((product) => product.cat?.toLowerCase() === 'children')
    .filter(filterByPrice)
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      id: product._id ?? '',
      quantity: 1,
    });
    alert(`Added ${product.name} to cart`);
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((item) => item._id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isWishlisted(product._id ?? '')) {
      removeFromWishlist(product._id ?? '');
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      <Navbar />
      <div className="women-products">
        <h2>Children Products</h2>

        {/* 🔍 Search Input */}
        <div className="filter-section search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 💰 Price Filter */}
        <div className="filter-section">
          <label>Filter by Price:</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="price-select"
          >
            <option value="all">All</option>
            <option value="below200">Below ₹200</option>
            <option value="200to400">₹200 - ₹400</option>
            <option value="above400">Above ₹400</option>
          </select>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <div className="cart-grid">
          {childrenProducts.length > 0 ? (
            childrenProducts.map((product) => (
              <div key={product._id} className="cart-card">
                <img
                  src={`http://localhost:3002/prodimgs/${product.pimg}`}
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
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <span
                    className="wishlist-icon"
                    onClick={() => toggleWishlist(product)}
                    title={isWishlisted(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    style={{
                      color: isWishlisted(product._id) ? 'red' : 'gray',
                      fontSize: '20px',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                  >
                    {isWishlisted(product._id) ? '❤️' : '🤍'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No children products found matching your criteria.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ChildrenProductList;
