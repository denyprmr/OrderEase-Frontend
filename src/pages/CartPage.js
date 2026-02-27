import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartPage.css";

function CartPage() {

  const {
    cartItems,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2 className="empty-cart">Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <h2>Your Shopping Cart</h2>

      {cartItems.map((item) => (
        <div key={item._id} className="cart-item">

          <img
            src={item.image}
            alt={item.name}
            className="cart-image"
          />

          <div className="cart-details">

            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

            <div className="quantity-controls">

              <button
                className="qty-btn"
                onClick={() => decreaseQuantity(item._id)}
              >
                −
              </button>

              <span>{item.quantity || 1}</span>

              <button
                className="qty-btn"
                onClick={() => increaseQuantity(item._id)}
              >
                +
              </button>

            </div>

            <p>
              Subtotal: ₹{item.price * (item.quantity || 1)}
            </p>

            <button
              className="remove-btn"
              onClick={() => removeItemFromCart(item._id)}
            >
              Remove
            </button>

          </div>

        </div>
      ))}

      <div className="cart-total">
        <h3>Total Amount: ₹{totalAmount}</h3>
      </div>

    </div>
  );
}

export default CartPage;