import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { placeOrderFromCart } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const {
    cartItems = [],
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    loadCart,
  } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Total calculation
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (item.food?.price || 0) * (item.quantity || 0),
    0
  );

  // ✅ Place Order
  const handleBuyNow = async () => {
    try {
      setLoading(true);

      await placeOrderFromCart();

      alert("✅ Order placed successfully!");

      await loadCart(); // refresh cart

      navigate("/orders");
    } catch (error) {
      console.error("Order Error:", error);
      alert(error.message || "❌ Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Empty cart
  if (!cartItems.length) {
    return (
      <div className="cart-page">
        <h2 className="empty-cart">Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cartItems.map((item) => {
        const itemId = item.foodId; // ✅ correct ID
        
        return (
          <div key={itemId} className="cart-item">
            {/* ✅ Image */}
            {item.food?.image ? (
              <img
                src={item.food.image}
                alt={item.food.name}
                className="cart-image"
              />
            ) : (
              <div className="cart-image placeholder">No Image</div>
            )}

            <div className="cart-details">
              <h4 className="product-name">{item.food?.name}</h4>

              <p className="product-price">
                ₹{item.food?.price || 0}
              </p>

              {/* ✅ Quantity Controls */}
              <div className="quantity-controls">
                <button
                  className="qty-btn"
                  onClick={() =>
                    decreaseQuantity(itemId, item.quantity)
                  }
                >
                  −
                </button>

                <span className="qty-value">{item.quantity}</span>

                <button
                  className="qty-btn"
                  onClick={() =>
                    increaseQuantity(itemId, item.quantity)
                  }
                >
                  +
                </button>
              </div>

              <p className="subtotal">
                Subtotal: ₹
                {(item.food?.price || 0) * (item.quantity || 0)}
              </p>

              {/* ✅ Remove */}
              <button
                className="remove-btn"
                onClick={() => removeItemFromCart(itemId)}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      {/* ✅ Total */}
      <div className="cart-total">
        <h3>Total Amount: ₹{totalAmount}</h3>

        <button
          className="buy-btn"
          onClick={handleBuyNow}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}

export default CartPage;