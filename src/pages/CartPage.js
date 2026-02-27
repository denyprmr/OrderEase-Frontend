import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const {
    cartItems = [],
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);


  // ✅ Production-safe total calculation
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (item.food?.price || 0) * item.quantity,
    0
  );

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

      {cartItems.map((item) => (
        <div key={item.cartItemId} className="cart-item">
          {/* Product Image */}
          {item.image ? (
          <img
            src={`http://localhost:3000/api/${item.image}`}
            alt={item.name}
            className="cart-image"
          />
          ) : (
            <div className="cart-image placeholder">No Image</div>
          )}  
          <div className="cart-details">
            {/* Product Name */}
            <h4 className="product-name">{item.name}</h4>

            {/* Price */}
            <p className="product-price">₹{item.food?.price}</p>

            {/* Quantity Controls */}
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() =>
                  decreaseQuantity(item.cartItemId, item.quantity)
                }
              >
                −
              </button>

              <span className="qty-value">{item.quantity}</span>

              <button
                className="qty-btn"
                onClick={() =>
                  increaseQuantity(item.cartItemId, item.quantity)
                }
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <p className="subtotal">
              Subtotal: ₹{(item.food?.price || 0) * item.quantity}
            </p>

            {/* Remove Button */}
            <button
              className="remove-btn"
              onClick={() =>
                removeItemFromCart(item.cartItemId)
              }
            >
              Remove
            </button>

          </div>
        </div>
      ))}

      {/* Total Section */}
      <div className="cart-total">
        <h3>Total Amount: ₹{totalAmount}</h3>
      </div>
    </div>
  );
}

export default CartPage;