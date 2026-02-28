import React, { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {
  const { cartItems = [], removeItemFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  // Total amount
  const totalAmount = useMemo(
    () => cartItems.reduce((total, item) => total + (item.food?.price || 0) * item.quantity, 0),
    [cartItems]
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
          {item.food?.image ? (
            <img
              src={`http://localhost:3000/api/${item.food.image}`}
              alt={item.food.name}
              className="cart-image"
            />
          ) : (
            <div className="cart-image placeholder">No Image</div>
          )}

          <div className="cart-details">
            {/* Product Name */}
            <h4 className="product-name">{item.food?.name || "Product Name"}</h4>

            {/* Price */}
            <p className="product-price">₹{item.food?.price || 0}</p>

            {/* Quantity Controls */}
            <div className="quantity-controls">
              <button className="qty-btn" onClick={() => decreaseQuantity(item.cartItemId)}>−</button>
              <span className="qty-value">{item.quantity}</span>
              <button className="qty-btn" onClick={() => increaseQuantity(item.cartItemId)}>+</button>
            </div>

            {/* Subtotal */}
            <p className="subtotal">Subtotal: ₹{((item.food?.price || 0) * item.quantity).toFixed(2)}</p>

            {/* Remove Button */}
            <button className="remove-btn" onClick={() => removeItemFromCart(item.cartItemId)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Total Section */}
      <div className="cart-total">
        <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default CartPage;