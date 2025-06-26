import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import Loading from "../../utils/Loading";
import OrderBox from "./OrderBox";
import axiosInstanceOrder from "../../utils/axiosInstanceOrder";

import "../../style/orders.css";

interface RootState {
  auth: {
    userId: string;
  };
}

interface Order {
  orderId: string;
  orderPlacedDate: string;
  products: any[];
  shippingAddress: any;
}

const Orders: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Making the GET req. for all orders done by the user
  const {
    data: ordersData,
    isError,
    isPending,
  } = useQuery<{ data: Order[] }>({
    queryKey: ["orders", userId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const response = await axiosInstanceOrder.get(`/order/${id}`);
      return response.data;
    },
    enabled: !!userId,
  });

  // framer motion animation states
  const fadeInVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="orders_container">
      <motion.div
        className="order_headers"
        initial="hidden"
        animate="visible"
        variants={fadeInVariant}
      >
        <h1>Orders History</h1>
        <p>A quick look back at everything you’ve ordered</p>
      </motion.div>

      {isPending && <Loading />}
      {isError && (
        <p className="error_msg">Something went wrong fetching your orders.</p>
      )}

      <div className="order_box_container">
        {ordersData?.data?.length === 0 && (
          <p className="no_order error_msg">
            Empty for now, but not for long! Time to discover something great.
          </p>
        )}

        {ordersData?.data?.map((order) => (
          <OrderBox key={order.orderId} {...order} />
        ))}
      </div>
    </section>
  );
};

export default Orders;
