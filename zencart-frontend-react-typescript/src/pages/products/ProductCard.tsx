import type { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import axiosInstanceProducts from "../../utils/axiosInstanceProducts";
import axiosInstanceOrder from "../../utils/axiosInstanceOrder";
import { setCartCount } from "../../features/cart/cartCount.ts";

import "../../style/productCard.css";

// types
interface ProductProps {
  _id: string;
  images: string[];
  description: string;
  price: number;
  stock: number;
  title: string;
  [key: string]: any; // For extra props passed via `state`
}

const ProductCard: FC<ProductProps> = (props) => {
  const { _id, images, description, price, stock, title } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const userCurrentRole = useSelector(
    (state: any) => state.userRole.userCurrentRole
  );
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const userId = useSelector((state: any) => state.auth.userId);

  // Delete product mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstanceProducts.delete(
        `/myproducts/deleteproduct/${id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.message || "Product deleted successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again. (frontend)";
      toast.error(errorMessage, { duration: 3000 });
    },
  });

  // Add to cart mutation
  const { mutate: addToCart, isPending: isAddToCart } = useMutation({
    mutationFn: async (cartDetails: { userId: string; productId: string }) => {
      const response = await axiosInstanceOrder.post("/addtocart", cartDetails);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setCartCount(data.cartCount));
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success(data.message || "Product added to cart!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add to cart. Please try again.";
      toast.error(errorMessage, { duration: 3000 });
    },
  });

  return (
    <article className="product_card">
      <div className="product_card_image">
        <img src={images[0]} alt={`Product image for ${title}`} />
      </div>

      <div className="product_card_details">
        <h1 className="product_card_title">{title}</h1>
        <p className="product_card_description">{description}</p>

        <div className="product_info">
          <h3 className="product_card_price">Price: ${price}</h3>
          {isAuthenticated && stock > 0 && (
            <h3 className="stock">Stock: {stock}</h3>
          )}
          <h3 className="stock">{stock > 0 ? "In stock" : "Out of stock"}</h3>
        </div>

        {isAuthenticated && userCurrentRole === "buyer" ? (
          <div className="product_btn">
            <button
              className="btn"
              onClick={() =>
                !isAuthenticated
                  ? navigate("/login")
                  : stock === 0
                  ? toast.error("Out of Stock – Check back soon!")
                  : navigate(`/product/buyproduct/${_id}`, { state: props })
              }
            >
              Buy
            </button>
            <button
              className="btn"
              onClick={() =>
                !isAuthenticated
                  ? navigate("/login")
                  : stock === 0
                  ? toast.error("Sorry, this item can’t be added right now.")
                  : addToCart({ userId, productId: _id })
              }
            >
              {isAddToCart ? "Adding" : "Add to Cart"}
            </button>
          </div>
        ) : isAuthenticated && userCurrentRole === "seller" ? (
          <div className="product_btn">
            <button
              className="btn"
              onClick={() =>
                navigate(`/product/updateproduct/${_id}`, {
                  state: props,
                })
              }
            >
              Edit
            </button>
            <button className="btn" onClick={() => mutate(_id)}>
              {isPending ? "Deleting" : "Delete"}
            </button>
          </div>
        ) : (
          <div className="product_btn">
            <button
              className="btn"
              onClick={() => (!isAuthenticated ? navigate("/login") : null)}
            >
              Buy
            </button>
            <button
              className="btn"
              onClick={() => (!isAuthenticated ? navigate("/login") : null)}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
