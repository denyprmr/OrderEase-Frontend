import React, { useState } from "react";

import { checkoutOrder } from "../api/api";

import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import "./CartPage.css";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
  clearCart,
  loadCart,
} from "../redux/slices/cartSlice";



function CartPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);



  // ✅ Redux cart state
  const { cartItems = [] } = useSelector(
    (state) => state.cart
  );



  /* =========================
     TOTAL CALCULATION
  ========================= */

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      (item.food?.price || 0) *
        (item.quantity || 0),

    0
  );



  /* =========================
     PLACE ORDER
  ========================= */

  const handleBuyNow = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const idempotencyKey = uuidv4();

      await checkoutOrder(
        {
          paymentMethod: "COD",
        },
        idempotencyKey
      );

      alert("✅ Order placed successfully!");



      // ✅ Reload cart
      dispatch(loadCart());



      navigate("/orders");
    } catch (error) {
      console.error(
        "Checkout Error:",
        error
      );

      alert(
        error.message || "❌ Order failed"
      );
    } finally {
      setLoading(false);
    }
  };



  /* =========================
     EMPTY CART
  ========================= */

  if (!cartItems.length) {
    return (
      <div className="cart-page">
        <h2 className="empty-cart">
          Your Cart is Empty 🛒
        </h2>
      </div>
    );
  }



  return (
    <div className="cart-page">
      <h2 className="cart-title">
        Your Shopping Cart
      </h2>



      {cartItems.map((item) => {
        const itemId = item.foodId;

        return (
          <div
            key={itemId}
            className="cart-item"
          >

            {/* IMAGE */}
            {item.food?.image ? (
              <img
                src={item.food.image}
                alt={item.food.name}
                className="cart-image"
              />
            ) : (
              <div className="cart-image placeholder">
                No Image
              </div>
            )}



            <div className="cart-details">
              <h4 className="product-name">
                {item.food?.name}
              </h4>

              <p className="product-price">
                ₹{item.food?.price || 0}
              </p>



              {/* QUANTITY CONTROLS */}
              <div className="quantity-controls">

                {/* DECREASE */}
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    dispatch(
                      decreaseQuantity({
                        foodId: itemId,
                        currentQty: Number(
                          item.quantity
                        ),
                      })
                    )
                  }
                >
                  −
                </button>



                <span className="qty-value">
                  {item.quantity}
                </span>



                {/* INCREASE */}
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    dispatch(
                      increaseQuantity({
                        foodId: itemId,
                        currentQty: Number(
                          item.quantity
                        ),
                      })
                    )
                  }
                >
                  +
                </button>
              </div>



              {/* SUBTOTAL */}
              <p className="subtotal">
                Subtotal: ₹
                {(item.food?.price || 0) *
                  (item.quantity || 0)}
              </p>



              {/* REMOVE */}
              <button
                className="btn btn-danger"
                onClick={() =>
                  dispatch(
                    removeItemFromCart(itemId)
                  )
                }
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}



      {/* TOTAL */}
      <div className="cart-total">
        <h3>
          Total Amount: ₹{totalAmount}
        </h3>



        <button
          className="btn btn-primary"
          onClick={handleBuyNow}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Buy Now"}
        </button>
      </div>
    </div>
  );
}

export default CartPage;