import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiShoppingBag, FiHeart, FiMapPin, FiSettings, FiLogOut, FiEdit, FiPlus, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './profile.css';

type Address = {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};

type Order = {
  id: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
  });
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Work',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false,
    },
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      date: '2023-05-15',
      status: 'Delivered',
      total: 125.99,
      items: [
        {
          id: 1,
          name: "Men's Hooded Sweatshirt",
          price: 22.5,
          quantity: 2,
          image: 'https://m.media-amazon.com/images/I/61J80jFIkHL._AC_UY1100_.jpg',
        },
        {
          id: 2,
          name: "Wireless Headphones",
          price: 59.99,
          quantity: 1,
          image: 'https://example.com/headphones.jpg',
        },
      ],
    },
    {
      id: 1002,
      date: '2023-06-20',
      status: 'Shipped',
      total: 45.5,
      items: [
        {
          id: 3,
          name: "Running Shoes",
          price: 45.5,
          quantity: 1,
          image: 'https://example.com/shoes.jpg',
        },
      ],
    },
  ]);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
  });

  const toggleOrderExpand = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically send the updated data to your backend
  };

  const handleAddAddress = () => {
    const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
    const updatedAddresses = [...addresses, { ...newAddress, id: newId }];
    
    // If this is set as default, update all others to not be default
    if (newAddress.isDefault) {
      updatedAddresses.forEach(addr => {
        if (addr.id !== newId) addr.isDefault = false;
      });
    }
    
    setAddresses(updatedAddresses);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false,
    });
    setShowAddressForm(false);
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="profile-user-card"
        >
          <div className="profile-avatar">
            <FiUser size={24} />
          </div>
          <div className="profile-user-info">
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
        </motion.div>

        <nav className="profile-nav">
          <motion.button
            whileHover={{ x: 5 }}
            className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser className="mr-2" /> Profile
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FiShoppingBag className="mr-2" /> Orders
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            className={`profile-nav-item ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <FiMapPin className="mr-2" /> Addresses
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            className={`profile-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <FiHeart className="mr-2" /> Wishlist
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            className="profile-nav-item"
          >
            <FiSettings className="mr-2" /> Settings
          </motion.button>
          <motion.button
            whileHover={{ x: 5 }}
            className="profile-nav-item text-red-500"
          >
            <FiLogOut className="mr-2" /> Logout
          </motion.button>
        </nav>
      </div>

      <div className="profile-content">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="profile-section"
            >
              <div className="profile-section-header">
                <h2>Personal Information</h2>
                {isEditing ? (
                  <button 
                    onClick={handleSaveProfile}
                    className="save-profile-btn"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button 
                    onClick={handleEditProfile}
                    className="edit-profile-btn"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </button>
                )}
              </div>

              <div className="profile-details">
                <div className="profile-detail-item">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{userData.name}</p>
                  )}
                </div>
                <div className="profile-detail-item">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{userData.email}</p>
                  )}
                </div>
                <div className="profile-detail-item">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="profile-input"
                    />
                  ) : (
                    <p>{userData.phone}</p>
                  )}
                </div>
                <div className="profile-detail-item">
                  <label>Member Since</label>
                  <p>{userData.joinDate}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="profile-section"
            >
              <h2>Order History</h2>
              {orders.length === 0 ? (
                <div className="empty-orders">
                  <FiShoppingBag size={48} className="text-gray-400" />
                  <p>You haven't placed any orders yet</p>
                  <button className="shop-now-btn">Shop Now</button>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header" onClick={() => toggleOrderExpand(order.id)}>
                        <div className="order-id">Order #{order.id}</div>
                        <div className="order-date">{new Date(order.date).toLocaleDateString()}</div>
                        <div className={`order-status ${getStatusColor(order.status)}`}>
                          {order.status}
                        </div>
                        <div className="order-total">${order.total.toFixed(2)}</div>
                        <div className="order-toggle">
                          {expandedOrder === order.id ? <FiChevronUp /> : <FiChevronDown />}
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedOrder === order.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="order-details"
                          >
                            <div className="order-items">
                              {order.items.map(item => (
                                <div key={item.id} className="order-item">
                                  <img src={item.image} alt={item.name} className="order-item-image" />
                                  <div className="order-item-info">
                                    <h4>{item.name}</h4>
                                    <p>${item.price.toFixed(2)} × {item.quantity}</p>
                                  </div>
                                  <div className="order-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="order-actions">
                              <button className="order-action-btn">Track Order</button>
                              <button className="order-action-btn">Reorder</button>
                              <button className="order-action-btn">Return</button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'addresses' && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="profile-section"
            >
              <div className="addresses-header">
                <h2>Saved Addresses</h2>
                <button 
                  onClick={() => setShowAddressForm(true)}
                  className="add-address-btn"
                >
                  <FiPlus className="mr-1" /> Add New Address
                </button>
              </div>

              <AnimatePresence>
                {showAddressForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="address-form-container"
                  >
                    <h3>Add New Address</h3>
                    <div className="address-form">
                      <div className="form-group">
                        <label>Address Name (e.g., Home, Work)</label>
                        <input
                          type="text"
                          value={newAddress.name}
                          onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                          placeholder="Home"
                        />
                      </div>
                      <div className="form-group">
                        <label>Street Address</label>
                        <input
                          type="text"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                            placeholder="New York"
                          />
                        </div>
                        <div className="form-group">
                          <label>State</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                            placeholder="NY"
                          />
                        </div>
                        <div className="form-group">
                          <label>ZIP Code</label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                            placeholder="10001"
                          />
                        </div>
                      </div>
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          id="defaultAddress"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({...newAddress, isDefault: e.target.checked})}
                        />
                        <label htmlFor="defaultAddress">Set as default address</label>
                      </div>
                      <div className="form-actions">
                        <button 
                          onClick={() => setShowAddressForm(false)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleAddAddress}
                          className="save-btn"
                          disabled={!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode}
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {addresses.length === 0 ? (
                <div className="empty-addresses">
                  <FiMapPin size={48} className="text-gray-400" />
                  <p>You haven't saved any addresses yet</p>
                </div>
              ) : (
                <div className="addresses-grid">
                  {addresses.map(address => (
                    <motion.div
                      key={address.id}
                      whileHover={{ y: -5 }}
                      className={`address-card ${address.isDefault ? 'default' : ''}`}
                    >
                      <div className="address-header">
                        <h3>{address.name}</h3>
                        {address.isDefault && (
                          <span className="default-badge">Default</span>
                        )}
                      </div>
                      <p>{address.street}</p>
                      <p>{address.city}, {address.state} {address.zipCode}</p>
                      <div className="address-actions">
                        {!address.isDefault && (
                          <button 
                            onClick={() => setDefaultAddress(address.id)}
                            className="set-default-btn"
                          >
                            Set as Default
                          </button>
                        )}
                        <button 
                          onClick={() => deleteAddress(address.id)}
                          className="delete-address-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="profile-section"
            >
              <h2>Your Wishlist</h2>
              {/* You would integrate your existing Wishlist component here */}
              <div className="wishlist-integration">
                <p>This would display your existing wishlist items</p>
                <button className="view-wishlist-btn">View Full Wishlist</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;