// src/main.tsx

import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(

    <CartProvider>
      <App />
      <ToastContainer position="top-center" autoClose={1500} />
    </CartProvider>
  
);
