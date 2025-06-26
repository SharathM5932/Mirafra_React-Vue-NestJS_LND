import ReactDOM from "react-dom/client"
import { Provider } from "react-redux";
import { store } from "./app/store"
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PayPalScriptProvider options={
        {
            "clientId": "AfK320XXGfxKZlrQA2eAe-cATuQc3t8a-0xSJWBoEf-vfiZDiXVdsJ_DVCuy2pNPqn6B6__j83z6B7Zr",
            "currency": "USD"
        }
    }>
        <Provider store={store}>
            <App />
        </Provider>
    </PayPalScriptProvider>
)