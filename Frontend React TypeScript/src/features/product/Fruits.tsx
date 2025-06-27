import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { getProductsAPI } from "../api/product/getProductApi";
import { ProductPayload } from "../../types/product";
import { addToCart } from "../cart/CartSlice";
import { Link } from "react-router-dom";
import "../../styles/ProductList.css";

const Fruits: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const email = useAppSelector((state) => state.auth.email);

  useEffect(() => {
    dispatch(getProductsAPI());
  }, [dispatch]);

  const handleAddToCart = (product: ProductPayload) => {
    if (!email) {
      alert("Please login to add products to the cart.");
      return;
    }

    dispatch(
      addToCart({
        email,
        item: {
          _id: product._id!,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: typeof product.imageUrl === "string" ? product.imageUrl : "",
        },
      })
    );
  };

  const fruits = products.filter(
    (product) => product.category.toLowerCase() === "fruit"
  );

  return (
    <div className="container" style={{ marginTop: " 100px" }}>
      {loading ? (
         <div className="loader"></div> 
      ) : (
        <div className="product-container">
          {fruits.length > 0 ? (
            fruits.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={`http://localhost:3002/${product.imageUrl}`} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>₹{product.price}</p>
                </div>
                <div className="product-actions">
                  <Link to="/products">
                    <button
                      className="add-to-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No fruits found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Fruits;
