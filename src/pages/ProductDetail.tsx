// src/pages/ProductDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>← Back to Home</Link>
      <div style={{ textAlign: "center" }}>
        <img src={product.image} alt={product.title} style={{ height: 200, margin: "1rem auto" }} />
      </div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>${product.price}</h3>
      <button
        onClick={() => addToCart(product)}
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "0.7rem 1.4rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        ➕ Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
