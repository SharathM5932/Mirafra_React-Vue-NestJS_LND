import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productSlice';
import { AppDispatch, RootState } from '../../app/store';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../cart/cartSlice';
import Toast from '../../components/Toast';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const [toastMsg, setToastMsg] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.cat)))];


  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.cat === selectedCategory);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (filteredProducts.length === 0) return <p>No products found in this category.</p>;

  return (
    <>
      {/* Category Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-dropdown"
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="product-container">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p._id}
            id={p._id ?? ''}
            name={p.name}
            price={p.price}
            desc=''
            // desc={p.desc}
            pimg={p.pimg ?? ''}
            onAddToCart={() => {
              if (!user?.emailid) {
                alert("Please login first.");
                return;
              }

              dispatch(
                addToCart({
                  uid: user.emailid,
                  pid: p._id ?? '',
                  name: p.name,
                  price: p.price,
                  pimg: p.pimg ?? '',
                  qty: 1,
                })
              ).then(() => {
                setToastMsg('✅ Product added to cart');
              });
            }}
            onBuyNow={() => navigate(`/products/${p._id}`)}
            onImageClick={() => navigate(`/products/${p._id}`)}
          />
        ))}
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
    </>
  );
};

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  desc: string;
  pimg: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onImageClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  desc,
  pimg,
  onAddToCart,
  onBuyNow,
  onImageClick,
}) => (
  <div className="product-card" style={{ cursor: 'pointer' }}>
    <img
      src={`http://localhost:3002/prodimgs/${pimg}`}
      alt={name}
      className="product-image"
      onClick={(e) => {
        e.stopPropagation();
        onImageClick();
      }}
    />
    <div className="product-info">
      <h3 className="product-name">{name}</h3>
      <p className="product-price">₹{price}</p>
      <p className="product-desc">{desc}</p>
      <button className="buy-btn" onClick={(e) => { e.stopPropagation(); onAddToCart(); }}>
        Add to cart
      </button>
      <button className="buy-btn" onClick={(e) => { e.stopPropagation(); onBuyNow(); }}>
        View Details
      </button>
    </div>
  </div>
);

export default ProductList;
