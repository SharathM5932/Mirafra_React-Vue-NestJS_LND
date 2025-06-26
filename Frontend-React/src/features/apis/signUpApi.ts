// Importing createAsyncThunk from Redux Toolkit to handle asynchronous logic in Redux actions
import { createAsyncThunk } from "@reduxjs/toolkit";
//axois is used to connect to the api's
import axios from "axios";
    
// Creating an asynchronous thunk for user registration (sign-up)
export const signUpAPI = createAsyncThunk(
    // The action type string. Used to identify this action in reducers and middleware.
    'auth/register',
    // The payload creator function which takes user credentials and handles API call
    async (credetials: { emailid: string, name: string, phno: string, pwd: string }, thunkAPI) => {
        try {
            // Attempt to send a POST request to the /auth/register API endpoint
            const response = await axios.post('http://localhost:3000/auth/register', credetials)
            // If successful, return the response data which will be available in the fulfilled action
            return response.data
        } catch (error: any) {
            // If an error occurs, reject the thunk with a custom error message (fallback provided if msg is undefined)
            return thunkAPI.rejectWithValue(error.response?.data?.msg || 'registered failed')
        }
    }
)






// Explanation
// createAsyncThunk: A utility from Redux Toolkit that simplifies writing async logic (e.g., API calls). It automatically dispatches pending, fulfilled, and rejected actions.
// Input credetials: An object containing user details: emailid, name, phno, and pwd.
// Axios POST request: Sends the user data to http://localhost:3000/auth/register for registration.
// thunkAPI.rejectWithValue: Allows passing a custom error message to the reducer if the request fails.