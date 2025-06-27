import { Routes, Route } from "react-router-dom";
import SignIn from "./features/auth/Signin";
import Signup from "./features/auth/Signup";
import ProductList from "./features/product/ProductList";
import Header from "./features/components/Header";
import CartPersistor from "./features/cart/CartPersistor";
import CartPage from "./features/cart/CartPage";
import Hero from "./features/components/Hero";
import Footer from "./features/components/Footer";
import Vegetables from "./features/product/Vegetables";
import Fruits from "./features/product/Fruits";
import OrdersPage from "./features/components/OrdersPage";
import ForgotPassword from "./features/components/ForgotPassword";
import ResetPassword from "./features/components/ResetPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowTransactions from "./features/paypal-client/ShowTransactions";
import StoreTransaction from "./features/paypal-client/StoreTransaction";
import About from "./features/components/AboutUs";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/products"
          element={
            <>
              <Hero />
              <ProductList />
            </>
          }
        />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<StoreTransaction />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About/>}></Route>
        <Route path="/transactions" element={<ShowTransactions />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
      <CartPersistor />
      <Footer />
    </>
  );
}

export default App;
