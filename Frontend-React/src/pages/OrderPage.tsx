import { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiPackage,
  FiTruck,
  FiHome,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiTrash2,
  FiAlertCircle,
  FiSearch,
} from "react-icons/fi";
import { AppContext } from "../App";
import "./order.css";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  estimatedDelivery: string;
  paymentStatus: string;
  email?: string;
}

const OrderPage = () => {
  const location = useLocation();
  const { cartItems, cartTotal } = useContext(AppContext);
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3010/payment/allTransactions`);
        if (!response.ok) {
          throw new Error("Failed to fetch order history");
        }
        
        const data = await response.json();
        if (data && Array.isArray(data)) {
          const orders: Order[] = [];
          
          data.forEach(user => {
            if (user.transactions && Array.isArray(user.transactions)) {
              user.transactions.forEach((transaction: any) => {
                orders.push({
                  id: transaction.orderId,
                  items: transaction.items || [],
                  total: transaction.amount,
                  date: new Date(transaction.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  estimatedDelivery: new Date(
                    new Date(transaction.date).getTime() + 5 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                  paymentStatus: transaction.status,
                  email: user.emailid
                });
              });
            }
          });
          
          setAllOrders(orders);
          setFilteredOrders(orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load order history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  useEffect(() => {
    if ((location.state?.cartItems || cartItems.length > 0) && !loading) {
      const itemsToUse = location.state?.cartItems || cartItems;
      const totalToUse = location.state?.cartTotal || cartTotal;

      if (location.state?.orderId && !allOrders.some(order => order.id === location.state.orderId)) {
        const newOrder: Order = {
          id: location.state.orderId,
          items: itemsToUse.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total: totalToUse,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          estimatedDelivery: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
          ).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          paymentStatus: "success",
        };

        setAllOrders(prev => [newOrder, ...prev]);
        setFilteredOrders(prev => [newOrder, ...prev]);
      }
    }
  }, [location.state, cartItems, cartTotal, loading, allOrders]);

  const handleSearch = () => {
    if (!searchEmail.trim()) {
      setFilteredOrders(allOrders);
      setSearchActive(false);
      return;
    }

    const filtered = allOrders.filter(order => 
      order.email?.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredOrders(filtered);
    setSearchActive(true);
  };

  const clearSearch = () => {
    setSearchEmail("");
    setFilteredOrders(allOrders);
    setSearchActive(false);
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const deleteOrder = (orderId: string) => {
    const updatedOrders = allOrders.filter(order => order.id !== orderId);
    setAllOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
  };

  if (loading) {
    return (
      <div className="order-empty">
        <div className="order-loading-spinner"></div>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-empty">
        <FiAlertCircle size={48} className="order-error-icon" />
        <h2>{error}</h2>
        <button 
          onClick={() => window.location.reload()}
          className="order-retry-btn"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="order-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="order-history"
      >
        <div className="order-header">
          <h2>Order History</h2>
          <div className="order-search">
            <div className="search-input-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchEmail && (
                <button 
                  className="clear-search-btn"
                  onClick={clearSearch}
                >
                  &times;
                </button>
              )}
            </div>
            <button 
              className="search-btn"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {searchActive && (
          <div className="search-results-info">
            Showing {filteredOrders.length} results for "{searchEmail}"
            <button onClick={clearSearch} className="clear-results-btn">
              Clear search
            </button>
          </div>
        )}

        {filteredOrders.length === 0 ? (
          <div className="no-results">
            <h3>No orders found</h3>
            {searchActive ? (
              <p>No orders match your search criteria.</p>
            ) : (
              <p>It seems you haven't placed any orders yet.</p>
            )}
            <Link to="/products" className="order-shop-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="history-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="history-item">
                <div
                  className="history-item-header"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  <div className="history-item-info">
                    <span className="history-order-id">Order #{order.id}</span>
                    {order.email && (
                      <span className="history-order-email">{order.email}</span>
                    )}
                    <span className="history-order-date">{order.date}</span>
                    <span className={`history-payment-status ${order.paymentStatus}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <div className="history-item-total">
                    ${order.total.toFixed(2)}
                  </div>
                  <div className="history-item-actions">
                    <button
                      className="history-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteOrder(order.id);
                      }}
                      aria-label="Delete order"
                    >
                      <FiTrash2 />
                    </button>
                    <div className="history-item-toggle">
                      {expandedOrderId === order.id ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrderId === order.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="history-item-details"
                    >
                      <div className="order-detail-meta">
                        <div>
                          <strong>Order Date:</strong> {order.date}
                        </div>
                        <div>
                          <strong>Estimated Delivery:</strong>{" "}
                          {order.estimatedDelivery}
                        </div>
                        <div>
                          <strong>Payment Status:</strong>{" "}
                          <span className={`status-badge ${order.paymentStatus}`}>
                            {order.paymentStatus}
                          </span>
                        </div>
                        {order.email && (
                          <div>
                            <strong>Email:</strong> {order.email}
                          </div>
                        )}
                      </div>
                      <div className="order-items">
                        {order.items.length > 0 ? (
                          order.items.map((item) => (
                            <div key={item.id} className="order-item">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="order-item-image"
                              />
                              <div className="order-item-details">
                                <h4>{item.title}</h4>
                                <p>Quantity: {item.quantity}</p>
                              </div>
                              <div className="order-item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-items-message">
                            No item details available
                          </div>
                        )}
                      </div>
                      <div className="order-total">
                        <h4>Total</h4>
                        <h4>${order.total.toFixed(2)}</h4>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {filteredOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="order-actions"
        >
          <Link to="/products" className="order-back-btn">
            Continue Shopping
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default OrderPage;