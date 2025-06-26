import { useSelector } from 'react-redux';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { RootState } from '../app/store';

const Navbar = () => {
  // const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, name, role } = useSelector((state: RootState) => state.auth);
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo"><Link to="/">MyStore</Link></div>

      {/* Center Links */}
      <div className="navbar-center">
        <Link to="/products">
          <button className="nav-btn">Products</button>
        </Link>
        {isAuthenticated && role === 'admin' && (
          <Link to="/addproducts">
            <button className="nav-btn">Add Products</button>
          </Link>
        )}
        <Link to="/aboutus">
          <button className="nav-btn">About Us</button>
        </Link>
        <Link to="/contactus">
          <button className="nav-btn">Contact Us</button>
        </Link>

        {isAuthenticated && (
        <Link to="/transactions">
          <button className="nav-btn">Transctions</button>
        </Link>
        )}
        </div>



      <div className="navbar-auth">
      {!isAuthenticated && (
        <button className="auth-btn">
          <Link to="/signin" >Login</Link>
        </button>
        )}
        {!isAuthenticated && (
        <button className="auth-btn">
          <Link to="/signup">Register</Link>
        </button>
        )}
        {isAuthenticated && (
        <button className="auth-btn">
          <Link to="/cart">Cart</Link>
        </button>
        )}
        {isAuthenticated && (
          <>
            <span className="user-greeting">Hi, {name}</span>
            <Link to="/logout"><button className="auth-btn">Logout</button></Link>
          </>
        )}



        {/* <button className="auth-btn">
          <Link to="/logout">Logout</Link>
        </button> */}
        {/* <Link to="/logout"><button className="auth-btn">Logout</button></Link> */}

        {/* {isAuthenticated && (
          <>
            <span style={{ color: 'white', marginRight: '10px' }}>Hi, {name}</span>
            <Link to="/logout"><button className="auth-btn">Logout</button></Link>
          </>
        )} */}

      </div>
    </nav>
  );
};

export default Navbar;
