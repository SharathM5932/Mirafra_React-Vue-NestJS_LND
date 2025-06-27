import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { getProductsAPI } from "../api/product/getProductApi";
import { ProductPayload } from "../../types/product";
import { addToCart } from "../cart/CartSlice";
import { Link } from "react-router-dom";
import "../../styles/ProductList.css";

const Vegetables: React.FC = () => {
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

  const vegetables = products.filter(
    (product) => product.category.toLowerCase() === "vegetable"
  );

  return (
    <div className="container" style={{ marginTop:" 100px"}} >
      {/* <h2 >Vegetables</h2> */}
      {loading ? (
        <div className="loader"></div> 
      ) : (
        <div className="product-container">
          {vegetables.length > 0 ? (
            vegetables.map((product) => (
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
            <p style={{ textAlign: "center" }}>No vegetables found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Vegetables;
