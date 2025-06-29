// src/components/Header.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { itemCount } = useCart();
  return (
    <header style={{
      padding: "1rem 2rem",
      background: "#007bff",
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "1.5rem" }}>
        🛍️ MyShop
      </Link>
      <Link to="/cart" style={{ color: "white", textDecoration: "none", fontSize: "1.2rem" }}>
        🛒 Cart ({itemCount})
      </Link>
    </header>
  );
};

export default Header;
