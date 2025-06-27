import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks"
import { getProductsAPI } from "../api/product/getProductApi";
import { ProductPayload } from "../../types/product";
import { addToCart } from "../cart/CartSlice";
import { useLocation } from "react-router-dom";
import "../../styles/ProductList.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const email = useAppSelector((state) => state.auth.email);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    dispatch(getProductsAPI());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleAddToCart = (product: ProductPayload) => {
    dispatch(
      addToCart({
        email: email || null,
        item: {
          _id: product._id!,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: typeof product.imageUrl === "string" ? product.imageUrl : "",
        },
      })
    );

    toast.success(
      <div>
        Product added to cart!
        <button
          style={{
            marginLeft: '10px',
            padding: '4px 8px',
            backgroundColor: "green",
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/cart')}
        >
          Go to Cart
        </button>
      </div>,
      { position: 'bottom-left', autoClose: 2000 }
    );
  };

  const filteredProducts = useMemo(() =>
    products.filter(p => p.name.toLowerCase().includes(searchQuery)),
    [products, searchQuery]
  );
  console.log(filteredProducts)


  return (
    <div className="container">
      {loading  ? (
        <div className="loader"></div>
      ) : (
        <div className="product-container">

          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div className="product-card" key={p._id}>
                <img src={`http://localhost:3002/${p.imageUrl}`} alt={p.name} />

                <div className="product-info">
                  <h4>{p.name}</h4>
                  <p>₹{p.price}</p>
                </div>
                <div className="product-actions">
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(p)}
                    disabled={loading}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No products found</p>
          )}
        </div>
      )}
    </div>
  );

};

export default ProductList;