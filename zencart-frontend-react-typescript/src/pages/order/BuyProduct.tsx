import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import axiosInstance from "../../utils/axiosInstance";
import axiosInstanceOrder from "../../utils/axiosInstanceOrder";
import Loading from "../../utils/Loading";
import AddressSelect from "./AddressSelect";
import SelectedProduct from "./SelectedProduct";

import "../../style/buyProduct.css";

interface Address {
  _id: string;
  fullName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNumber: string;
}

interface ProductData {
  _id: string;
  sellerId: string;
  price: number;
  name?: string;
  [key: string]: any;
}

interface RootState {
  auth: {
    userId: string;
  };
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

const BuyProduct = () => {
  const navigate = useNavigate();
  const { state: buyProductData } = useLocation() as { state: ProductData };
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(buyProductData.price);
  const [showPayPal, setShowPayPal] = useState<boolean>(false);
  const [orderDataWithTransaction, setOrderDataWithTransaction] =
    useState<OrderDataWithTransaction | null>(null);
  const queryClient = useQueryClient();
  const paypalRef = useRef<HTMLDivElement>(null);

  const baseOrderData = {
    product: {
      productId: buyProductData._id,
      selectedQuantity,
      totalPrice,
    },
    sellerId: buyProductData.sellerId,
    userId,
    shippingAddress: selectedAddressId,
  };

  // Fetch user addresses
  const { data, isLoading, isError } = useQuery({
    queryKey: ["addresses", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is missing");
      const response = await axiosInstance.get(`/profile/address/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  // Final order submission with transaction ID
  const { mutate: submitFinalOrder, isPending: isSubmittingOrder } =
    useMutation({
      mutationFn: async (orderData: OrderDataWithTransaction) => {
        const response = await axiosInstanceOrder.post(`/order/buy/${userId}`, {
          data: orderData,
        });
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["products"]);
        toast.success(data.message || "Order placed successfully!", {
          duration: 3000,
        });
        navigate("/payment", {
          state: {
            orderId: data.orderId,
            transactionId: orderDataWithTransaction?.transactionId,
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
          description: `${
            buyProductData.name || "Product"
          } x${selectedQuantity}`,
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
        const finalOrderData: OrderDataWithTransaction = {
          ...baseOrderData,
          transactionId: details.id,
          paymentStatus: details.status,
          paymentDetails: {
            paypalOrderId: details.id,
            payerId: details.payer?.payer_id,
            amount: details.purchase_units?.[0]?.amount,
            createTime: details.create_time,
          },
        };

        setOrderDataWithTransaction(finalOrderData);
        toast.success("Payment completed successfully!");
        submitFinalOrder(finalOrderData);
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
    toast.info("Payment was cancelled. Click 'Proceed to Pay' to try again.");
    setShowPayPal(false);
  };

  // Handle proceed to pay button click
  const handleProceedToPay = () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
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

  // framer motion animation states
  const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <motion.section
        className="buy_product_container"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <motion.h1 variants={fadeInUp}>Buying Product</motion.h1>
        <motion.p variants={fadeInUp}>
          Great choice! Get ready to enjoy your purchase.
        </motion.p>

        <motion.div className="product_box" variants={fadeInUp}>
          <h1>Select a Quantity</h1>
          <SelectedProduct
            buyProductData={buyProductData}
            setSelectedQuantity={setSelectedQuantity}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        </motion.div>

        <motion.div className="select_address" variants={fadeInUp}>
          <div className="select_address_header">
            <h1>Select Shipping Address</h1>
            <button
              className="btn"
              onClick={() => navigate("/profile/addaddress")}
            >
              +
            </button>
          </div>

          <div className="select_address_box">
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
                    isSelected={selectedAddressId === address._id}
                    onSelect={() => setSelectedAddressId(address._id)}
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
          </div>
        </motion.div>

        <motion.div className="final_stage" variants={fadeInUp}>
          <div className="order_summary">
            <p>
              <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
            </p>
            <p>Quantity: {selectedQuantity}</p>
            {orderDataWithTransaction?.transactionId && (
              <p className="transaction_id">
                Transaction ID: {orderDataWithTransaction.transactionId}
              </p>
            )}
          </div>

          {!showPayPal ? (
            <button
              className="btn btn_proceed_pay"
              onClick={handleProceedToPay}
              disabled={!selectedAddressId || totalPrice <= 0}
            >
              Proceed to Pay
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

              {isSubmittingOrder ? (
                <div
                  className="processing_payment"
                  style={{ textAlign: "center" }}
                >
                  <Loading />
                  <p>Processing your order...</p>
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
                      disabled={isSubmittingOrder}
                      forceReRender={[totalPrice]}
                    />
                  </div>
                </>
              )}

              <button
                className="btn btn_back"
                onClick={() => setShowPayPal(false)}
                disabled={isSubmittingOrder}
              >
                Back to Order Details
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    </PayPalScriptProvider>
  );
};

export default BuyProduct;
