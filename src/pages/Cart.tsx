// src/pages/Cart.tsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, total, itemCount } = useCart();

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h2>Your Cart ({itemCount} items)</h2>
      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/" style={{ color: "#007bff" }}>Go shopping</Link>
        </>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "1rem",
                padding: "1rem",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <h4>{item.title}</h4>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <h3>Total Price: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
