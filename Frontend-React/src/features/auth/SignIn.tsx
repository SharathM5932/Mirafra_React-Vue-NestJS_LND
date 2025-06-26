// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../app/store";
// import './Signin.css';
// import { useForm } from "react-hook-form";
// import { signInSchema, SignInSchemaType } from "./signInSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { signInAPIs } from "../apis/signInApis";
// import { useNavigate } from "react-router-dom";

// const SignIn: React.FC = () => {
//     const navigator = useNavigate();
//     const dispatch = useDispatch<AppDispatch>();
//     const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
//     const [emailid, setEmailid] = useState("");
//     const [pwd, setPwd] = useState("");



//     const handleSignIn = async (data: SignInSchemaType) => {
//         const { emailid, pwd } = data;

//         try {
//             const response = await dispatch(signInAPIs({ emailid, pwd })).unwrap();

//             // Store in localStorage
//             localStorage.setItem(
//                 'auth',
//                 JSON.stringify({
//                     _id: response._id,
//                     name: response.name,
//                     role: response.role, // if you're returning it from backend
//                     token: response.token,
//                     emailid: response.email,
//                     uid: response.email
//                 })
//             );

//             // alert("SignIn Successful");
//             navigator('/');
//         } catch {
//             alert("SignIn Unsuccessful");
//         }
//     };


//     const {
//         register,
//         handleSubmit,
//         formState: {
//             errors
//         }
//     } = useForm<SignInSchemaType>({
//         resolver: zodResolver(signInSchema)
//     })

//     return (
//         <>
//             <form className="auth-form" onSubmit={handleSubmit(handleSignIn)}>
//                 <h2>Sign In</h2>
//                 <label>Email</label>
//                 {errors.emailid && <p style={{ color: "red" }}>{errors.emailid.message}</p>}


//                 <input type="email" {...register("emailid")} />
//                 <label>Password</label>
//                 {errors.pwd && <p style={{ color: "red" }}>{errors.pwd.message}</p>}


//                 <input type="password" {...register("pwd")} />
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Signing in..." : "Sign In"}
//                 </button>
//                 <p style={{ textAlign: 'right', margin: '10px 0' }}>
//                     <a href="/reset-password-link" style={{ textDecoration: 'underline', color: '#007bff' }}>
//                         Forgot Password?
//                     </a>
//                 </p>
//                 {isAuthenticated && <p className="success-msg">Signin successful</p>}
//                 {error && !isAuthenticated && <p className="error-msg">{error}</p>}
//             </form>


//         </>
//     );
// };

// export default SignIn;





import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import './Signin.css';
import { useForm } from "react-hook-form";
import { signInSchema, SignInSchemaType } from "./signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAPIs } from "../apis/signInApis";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox"; // import dialog

const SignIn: React.FC = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const handleSignIn = async (data: SignInSchemaType) => {
        const { emailid, pwd } = data;

        try {
            const response = await dispatch(signInAPIs({ emailid, pwd })).unwrap();

            localStorage.setItem(
                'auth',
                JSON.stringify({
                    _id: response._id,
                    name: response.name,
                    role: response.role,
                    token: response.token,
                    emailid: response.email,
                    uid: response.email
                })
            );

            setDialogMessage("SignIn Successful");
            setDialogVisible(true);

            setTimeout(() => {
                setDialogVisible(false);
                navigator('/');
            }, 2000);
        } catch {
            setDialogMessage("SignIn Unsuccessful");
            setDialogVisible(true);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignInSchemaType>({
        resolver: zodResolver(signInSchema)
    });

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit(handleSignIn)}>
                <h2>Sign In</h2>
                <label>Email</label>
                {errors.emailid && <p style={{ color: "red" }}>{errors.emailid.message}</p>}
                <input type="email" {...register("emailid")} />
                <label>Password</label>
                {errors.pwd && <p style={{ color: "red" }}>{errors.pwd.message}</p>}
                <input type="password" {...register("pwd")} />
                <button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
                <p style={{ textAlign: 'right', margin: '10px 0' }}>
                    <a href="/reset-password-link" style={{ textDecoration: 'underline', color: '#007bff' }}>
                        Forgot Password?
                    </a>
                </p>
                {isAuthenticated && <p className="success-msg">Signin successful</p>}
                {error && !isAuthenticated && <p className="error-msg">{error}</p>}
            </form>

            <DialogBox
                visible={dialogVisible}
                message={dialogMessage}
                onClose={() => setDialogVisible(false)}
            />
        </>
    );
};

export default SignIn;
