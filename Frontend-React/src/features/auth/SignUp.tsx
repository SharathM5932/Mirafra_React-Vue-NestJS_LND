import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { signUpAPI } from "../apis/signUpApi";
import './Signup.css';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpSchema, SignUpSchemaType } from "./signUpSchema";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../components/DialogBox";

const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const navigator = useNavigate();

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema)
    });

    const handleSignUp = async (data: SignUpSchemaType) => {
        const { emailid, name, phno, pwd } = data;

        try {
            await dispatch(signUpAPI({ emailid, name, phno, pwd })).unwrap();
            setDialogMessage("SignUp Successful");
            setDialogVisible(true);
            setTimeout(() => {
                setDialogVisible(false);
                navigator('/');
            }, 1000);
        } catch {
            setDialogMessage("SignUp Unsuccessful");
            setDialogVisible(true);
        }
    };

    return (
        <>
            <form className="auth-form" onSubmit={handleSubmit(handleSignUp)}>
                <h2>Sign Up</h2>

                <label>Email</label>
                <input type="text" {...register('emailid')} />
                {errors.emailid && <p style={{ color: "red" }}>{errors.emailid.message}</p>}

                <label>Name</label>
                <input type="text" {...register('name')} />
                {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

                <label>Phone Number</label>
                <input type="text" {...register('phno')} />
                {errors.phno && <p style={{ color: "red" }}>{errors.phno.message}</p>}

                <label>Password</label>
                <input type="password" {...register('pwd')} />
                {errors.pwd && <p style={{ color: "red" }}>{errors.pwd.message}</p>}

                <label>Confirm Password</label>
                <input type="password" {...register('confirmPassword')} />
                {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                {isAuthenticated && <p className="success-msg">Signup successful</p>}
                {/* {error && !isAuthenticated && <p className="error-msg">{error}</p>} */}
            </form>

            <DialogBox
                visible={dialogVisible}
                message={dialogMessage}
                onClose={() => setDialogVisible(false)}
            />
        </>
    );
};

export default SignUp;
