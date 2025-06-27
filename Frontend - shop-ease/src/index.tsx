import React from "react";
import ReactDOM from "react-dom/client"
import {Provider} from "react-redux"
import  { store} from "./app/store"
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import { WishlistProvider } from "./features/wishlist/wishlistContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      
        <React.StrictMode>
    <BrowserRouter>
    <WishlistProvider>
      <App />
      </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>

    </Provider>
)
