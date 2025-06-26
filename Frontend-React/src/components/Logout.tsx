import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../features/auth/authSlice";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear Redux
        dispatch(signOut());
        // Clear localStorage
        localStorage.removeItem('auth');
        // Redirect
        navigate('/signin');
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
