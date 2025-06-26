import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <PayPalScriptProvider
    options={{
      clientId:
        "AcPQAV0-zyFxMXGJFgr7bsYuNKntZkwJy0tMVjxuGygUSCa-i9J6XAn9ynusX-2iMHagKTDl_u7JKxnr",
      currency: "USD",
      intent: "capture",
      components: "buttons",
    }}
  >
    <React.StrictMode>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </React.StrictMode>
  </PayPalScriptProvider>
);
