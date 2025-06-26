import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Loading from "../../utils/Loading";
import axiosInstanceOrder from "../../utils/axiosInstanceOrder";
import axiosInstance from "../../utils/axiosInstance";
import { setCartCount } from "../../features/cart/cartCount.ts";
import AddressSelect from "./AddressSelect";
import type { RootState } from "../../app/store.ts";

import "../../style/cart.css";

interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  sellerId: string;
  cartId: string;
}

interface Address {
  _id: string;
  [key: string]: any;
}

interface OrderDataWithTransaction {
  product: {
    productId: string;
    selectedQuantity: number;
    totalPrice: number;
  };
  sellerId: string;
  userId: string;
  shippingAddress: string | null;
  transactionId?: string;
  paymentStatus?: string;
  paymentDetails?: any;
}

// PayPal configuration
const initialOptions = {
  "client-id": import.meta.env.VITE_API_PAYPAL_CLIENT_ID as string,
  currency: "USD",
  intent: "capture",
  environment: "sandbox",
};

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [shippingAddressId, setShippingAddressId] = useState<string | null>(
    null
  );
  const [showPayPal, setShowPayPal] = useState<boolean>(false);
  const [orderDataWithTransactions, setOrderDataWithTransactions] = useState<
    OrderDataWithTransaction[] | null
  >(null);
  const queryClient = useQueryClient();
  const paypalRef = useRef<HTMLDivElement>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Making the get for cart
  const {
    data: cartProd,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey as [string, string];
      const response = await axiosInstanceOrder.get(`/addtocart/${id}`);
      return response.data;
    },
    enabled: !!userId,
  });

  const cartProducts: Product[] = cartProd?.data || [];

  // setting the initial product quantity to 1
  useEffect(() => {
    if (cartProducts.length > 0) {
      const initialQuantities: Record<string, number> = {};
      cartProducts.forEach((product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [cartProducts]);

  useEffect(() => {
    dispatch(setCartCount(cartProducts.length));
  }, [cartProducts, dispatch]);

  // Making  the req for Deleting the product from cart
  const { mutate: deleteCartProduct } = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      const response = await axiosInstanceOrder.delete(
        `/addtocart/delete/${id}`
      );
      return response.data;
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries(["cart"]);
      toast.success(data.message || "Product removed from cart successfully", {
        duration: 3000,
      });
      setDeletingId(null);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Error removing product from cart",
        { duration: 3000 }
      );
      setDeletingId(null);
    },
  });

  // Making the GET for address
  const { data, isLoading, isError } = useQuery({
    queryKey: ["addressess", userId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/profile/address/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  const handleQuantityChange = (productId: string, selectedQty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: selectedQty,
    }));
  };

  const totalPrice = cartProducts.reduce((acc, product) => {
    const qty = quantities[product._id] || 1;
    return acc + product.price * qty;
  }, 0);

  // Final order submission with transaction ID
  const { mutate: submitFinalOrders, isPending: isSubmittingOrders } =
    useMutation({
      mutationFn: async (ordersData: OrderDataWithTransaction[]) => {
        const orderRequests = ordersData.map((orderData) =>
          axiosInstanceOrder.post(`/order/buy/${userId}`, { data: orderData })
        );

        const responses = await Promise.all(orderRequests);

        // Delete all cart items after successful order placement
        const deleteResponse = await axiosInstanceOrder.delete(
          `/cart/deleteall/${userId}`
        );

        return {
          orderResponses: responses,
          deleteResponse: deleteResponse.data,
        };
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
        dispatch(setCartCount(0));
        toast.success("All orders placed successfully!", {
          duration: 3000,
        });
        navigate("/payment", {
          state: {
            orderId: data.orderResponses[0]?.data?.orderId,
            transactionId: orderDataWithTransactions?.[0]?.transactionId,
            multipleOrders: true,
          },
        });
      },
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ||
          error?.message ||
          "Order submission failed.";
        toast.error(msg, { duration: 3000 });
      },
    });

  // PayPal order creation
  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toFixed(2),
            currency_code: "USD",
          },
          description: `Cart checkout - ${cartProducts.length} items`,
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
        brand_name: "Your Store",
      },
    });
  };

  // PayPal approval handler
  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();

      if (details.status === "COMPLETED") {
        // Create order data for each product in cart
        const finalOrdersData: OrderDataWithTransaction[] = cartProducts.map(
          (product) => {
            const qty = quantities[product._id] || 1;
            return {
              product: {
                productId: product._id,
                selectedQuantity: qty,
                totalPrice: product.price * qty,
              },
              sellerId: product.sellerId,
              userId: userId,
              shippingAddress: shippingAddressId,
              transactionId: details.id,
              paymentStatus: details.status,
              paymentDetails: {
                paypalOrderId: details.id,
                payerId: details.payer?.payer_id,
                amount: details.purchase_units?.[0]?.amount,
                createTime: details.create_time,
              },
            };
          }
        );

        setOrderDataWithTransactions(finalOrdersData);
        toast.success("Payment completed successfully!");
        submitFinalOrders(finalOrdersData);
      } else {
        throw new Error(`Unexpected payment status: ${details.status}`);
      }
    } catch (error) {
      toast.error(`Payment failed: ${error.message}`);
      setShowPayPal(false);
    }
  };

  // Error handler
  const handleError = (error) => {
    toast.error("Payment error occurred. Please try again.");
    setShowPayPal(false);
  };

  // Cancel handler
  const handleCancel = (data) => {
    toast.info(
      "Payment was cancelled. Click 'Proceed to Checkout' to try again."
    );
    setShowPayPal(false);
  };

  // Handle proceed to checkout button click
  const handleProceedToCheckout = () => {
    if (!shippingAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (totalPrice <= 0) {
      toast.error("Invalid order amount");
      return;
    }

    setShowPayPal(true);
    toast.info("Complete your payment using PayPal below");

    // Auto-scroll to PayPal section after a short delay
    setTimeout(() => {
      paypalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  if (isPending) return <Loading />;
  if (error instanceof Error)
    return <p className="error_msg">Error fetching cart: {error.message}</p>;

  // framer motion animation states
  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <motion.section
        className="cart"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <motion.div className="cart_header" variants={fadeInUp}>
          <h1>Shopping Cart</h1>
          {cartProducts.length > 0 ? (
            <motion.p variants={fadeInUp}>
              Almost there! Complete your purchase now.
            </motion.p>
          ) : (
            <motion.p variants={fadeInUp}>
              Your cart is waiting for something awesome!
            </motion.p>
          )}
        </motion.div>

        {cartProducts.length === 0 ? (
          <div className="cart_status">
            <motion.div
              className="empty_cart_wrapper"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 20px",
                borderRadius: "16px",
                backgroundColor: "#fafafa",
                color: "#333",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <PiShoppingCartSimpleLight
                size={80}
                color="#b0b0b0"
                style={{ marginBottom: "20px" }}
              />
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  marginBottom: "10px",
                }}
              >
                Your cart is empty
              </h2>
              <p style={{ fontSize: "1rem", maxWidth: "400px", color: "#555" }}>
                But not for long! Browse products and start adding your
                favorites.
              </p>
            </motion.div>
          </div>
        ) : (
          <>
            <motion.div className="cart_table" variants={fadeInUp}>
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price $</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((product) => (
                    <motion.tr key={product._id} variants={fadeInUp}>
                      <td>{product.title}</td>
                      <td>
                        <select
                          name="stock"
                          id="stock"
                          value={quantities[product._id] || 1}
                          onChange={(e) =>
                            handleQuantityChange(
                              product._id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {Array.from({ length: product.stock }).map(
                            (_, idx) => (
                              <option value={idx + 1} key={idx}>
                                {idx + 1}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                      <td>
                        ${" "}
                        {(
                          product.price * (quantities[product._id] || 1)
                        ).toLocaleString()}
                      </td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => deleteCartProduct(product.cartId)}
                          disabled={deletingId === product.cartId}
                        >
                          {deletingId === product.cartId
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            <motion.p className="cart_address" variants={fadeInUp}>
              <strong>Select Shipping Address</strong>
            </motion.p>
            <motion.div
              className="select_address_box cart_address_container"
              variants={fadeInUp}
            >
              {isLoading && <Loading />}
              {isError && (
                <motion.p className="error_msg" variants={fadeInUp}>
                  Failed to load addresses. Please try again.
                </motion.p>
              )}
              {data?.data?.length > 0 ? (
                data.data.map((address: Address) => (
                  <motion.div key={address._id} variants={fadeInUp}>
                    <AddressSelect
                      address={address}
                      isSelected={shippingAddressId === address._id}
                      onSelect={() => setShippingAddressId(address._id)}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div className="no_address" variants={fadeInUp}>
                  <p className="error_msg">No address found.</p>
                  <button
                    className="btn"
                    onClick={() => navigate("/profile/addaddress")}
                  >
                    Add Address
                  </button>
                </motion.div>
              )}
            </motion.div>

            <motion.div className="cart_total" variants={fadeInUp}>
              <div className="order_summary">
                <h3>Total: $ {totalPrice.toFixed(2)}</h3>
                <h3>Items: {cartProducts.length}</h3>
                {orderDataWithTransactions?.[0]?.transactionId && (
                  <p className="transaction_id">
                    Transaction ID: {orderDataWithTransactions[0].transactionId}
                  </p>
                )}
              </div>

              {!showPayPal ? (
                <button
                  className="btn checkout_btn"
                  onClick={handleProceedToCheckout}
                  disabled={
                    cartProducts.length === 0 ||
                    !shippingAddressId ||
                    totalPrice <= 0
                  }
                >
                  Proceed to Checkout
                </button>
              ) : (
                <motion.div
                  ref={paypalRef}
                  className="paypal_container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: "100%",
                    maxWidth: "none",
                    margin: "20px 0",
                    padding: "20px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <h3 style={{ textAlign: "center", marginBottom: "15px" }}>
                    Complete Your Payment
                  </h3>
                  <p
                    className="payment_amount"
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Amount: ${totalPrice.toFixed(2)}
                  </p>

                  {isSubmittingOrders ? (
                    <div
                      className="processing_payment"
                      style={{ textAlign: "center" }}
                    >
                      <Loading />
                      <p>Processing your orders...</p>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "500px",
                          margin: "0 auto",
                        }}
                      >
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                            color: "blue",
                            shape: "rect",
                            label: "paypal",
                            height: 50,
                          }}
                          createOrder={handleCreateOrder}
                          onApprove={handleApprove}
                          onError={handleError}
                          onCancel={handleCancel}
                          disabled={isSubmittingOrders}
                          forceReRender={[totalPrice]}
                        />
                      </div>
                    </>
                  )}

                  <button
                    className="btn btn_backk"
                    onClick={() => setShowPayPal(false)}
                    disabled={isSubmittingOrders}
                  >
                    Back to Cart
                  </button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </motion.section>
    </PayPalScriptProvider>
  );
};

export default Cart;
