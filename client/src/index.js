import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ItemContextProvider } from "./context/itemContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";

const rootDom = document.getElementById("root");
if (rootDom) {
  const root = ReactDOM.createRoot(rootDom);
  root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <CartContextProvider>
          <ItemContextProvider>
            <App />
          </ItemContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  );
}
