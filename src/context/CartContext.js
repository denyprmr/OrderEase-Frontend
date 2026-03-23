import React, { createContext, useState, useEffect } from "react";
import {
  addToCart,
  getToCart,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartAPI,
} from "../api/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart
  const loadCart = async () => {
    try {
      const res = await getToCart();

      console.log("Cart Response:", res);

      setCartItems(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Load Cart Error:", err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Add item
  const addItemToCart = async (product) => {
    try {
      const productId = product._id || product.id;

      await addToCart(productId, 1);
      await loadCart();
    } catch (err) {
      console.error("Add to Cart Error:", err);
    }
  };

  // ✅ Increase quantity (FIXED + safe)
  const increaseQuantity = async (foodId, currentQty) => {
  const newQty = currentQty + 1;

  // optimistic UI
  setCartItems((prev) =>
    prev.map((item) =>
      item.foodId === foodId
        ? { ...item, quantity: newQty }
        : item
    )
  );

  try {
    await updateCartItem(foodId, newQty);
  } catch (err) {
    console.error(err);
    loadCart(); // rollback
  }
};

  // ✅ Decrease quantity (FIXED + safe)
  const decreaseQuantity = async (foodId, currentQty) => {
    try {
      const qty = Number(currentQty);

      if (qty <= 1) {
        await removeItemFromCart(foodId);
        return;
      }

      const newQty = qty - 1;

      console.log("Decrease:", foodId, newQty);

      await updateCartItem(foodId, newQty);
      await loadCart();
    } catch (err) {
      console.error("Decrease Error:", err);
    }
  };

  // ✅ Remove item
  const removeItemFromCart = async (id) => {
    try {
      console.log("Remove:", id);

      await removeCartItem(id);
      await loadCart();
    } catch (err) {
      console.error("Remove Error:", err);
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCartItems([]);
    } catch (err) {
      console.error("Clear Cart Error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loadCart,
        addItemToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};