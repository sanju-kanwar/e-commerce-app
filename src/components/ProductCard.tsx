// src/components/ProductCard.tsx
import { Link } from "react-router-dom";
import type { Product } from "../types";

const ProductCard = ({ product }: { product: Product }) => (
  <div style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    width: 220,
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "white"
  }}>
    <img
      src={product.image}
      alt={product.title}
      style={{ height: 150, objectFit: "contain", marginBottom: "1rem" }}
    />
    <h3 style={{ fontSize: "1rem", height: "2.5rem", overflow: "hidden" }}>
      {product.title}
    </h3>
    <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
    <Link to={`/product/${product.id}`}>
      <button style={{
        marginTop: "0.5rem",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "5px",
        cursor: "pointer"
      }}>
        View Details
      </button>
    </Link>
  </div>
);


export default ProductCard;
