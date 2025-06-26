import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';
import Footer from './components/Footer';
import AddProduct from './features/products/AddProduct';
import ProductList from './features/products/ProductList';
import ProductDetail from './features/products/ProductDetail';
import Cart from './features/cart/Cart';
import Logout from './components/Logout';
import ResetPasswordLink from './features/auth/ResetPasswordLink';
import ResetPassword from './features/auth/ResetPassword';
import Home from './components/Home';
import OrderCreate from './features/payment/OrderCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import TransactionPage from './features/payment/TransactionPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/addproducts" element={<AddProduct/>} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset-password-link" element={<ResetPasswordLink/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/ordercreate" element={<OrderCreate />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path='/contactus' element={<ContactUs/>}/>
        <Route path='/transactions' element={<TransactionPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
