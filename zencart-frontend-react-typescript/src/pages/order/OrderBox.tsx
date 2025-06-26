import { motion } from "framer-motion";

import "../../style/orderbox.css";

interface ShippingAddress {
  fullName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNumber: string;
}

interface Product {
  images: string[];
  title: string;
  quantity: number;
  totalPrice: number;
}

interface OrderBoxProps {
  orderId: string;
  orderPlacedDate: string | Date;
  products: Product[];
  shippingAddress: ShippingAddress;
}

// framer motion animation states
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const OrderBox: React.FC<OrderBoxProps> = ({
  orderId,
  orderPlacedDate,
  products,
  shippingAddress,
}) => {
  // Formatting the date
  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  return (
    <motion.div
      className="order_box"
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
    >
      <div className="order_box_header">
        <p>
          <strong>Order ID:</strong> #{orderId}
        </p>
        <p>
          <strong>Placed on:</strong> {formatDate(orderPlacedDate)}
        </p>
      </div>

      <div className="products_in_order">
        {products.map((product, idx) => (
          <div key={idx} className="product_in_order">
            <img
              src={product.images[0]}
              alt={product.title}
              className="order_product_image"
            />
            <div className="product_details">
              <div className="product_details_1">
                <strong>{product.title}</strong>
                <strong>Quantity: {product.quantity}</strong>
                <strong>Price: ₹{product.totalPrice}</strong>
              </div>
              <div className="shipping_address">
                <strong>Shipping Address: </strong>
                <p>
                  {shippingAddress.fullName}, {shippingAddress.addressLineOne},{" "}
                  {shippingAddress.addressLineTwo}, {shippingAddress.city},{" "}
                  {shippingAddress.state}, {shippingAddress.pincode},{" "}
                  {shippingAddress.country}
                </p>
                <p>Phone: {shippingAddress.phoneNumber}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OrderBox;
