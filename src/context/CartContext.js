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

  // ✅ Load cart (FIXED: normalize quantity)
  const loadCart = async () => {
    try {
      const res = await getToCart();

      const normalized = (Array.isArray(res) ? res : []).map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 0, // 🔥 FIX
      }));

      setCartItems(normalized);
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

  // ✅ Increase quantity (FIXED + Optimistic)
  const increaseQuantity = async (foodId, currentQty) => {
    const qty = Number(currentQty) || 0;
    const newQty = qty + 1;

    // 🔥 optimistic UI
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
      console.error("Increase Error:", err);
      loadCart(); // rollback
    }
  };

  // ✅ Decrease quantity (FIXED + Optimistic)
  const decreaseQuantity = async (foodId, currentQty) => {
    const qty = Number(currentQty) || 0;

    if (qty <= 1) {
      await removeItemFromCart(foodId);
      return;
    }

    const newQty = qty - 1;

    // 🔥 optimistic UI
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
      console.error("Decrease Error:", err);
      loadCart(); // rollback
    }
  };

  // ✅ Remove item (Optimistic)
  const removeItemFromCart = async (id) => {
    const prevItems = [...cartItems];

    // 🔥 optimistic remove
    setCartItems((prev) =>
      prev.filter((item) => item.foodId !== id)
    );

    try {
      await removeCartItem(id);
    } catch (err) {
      console.error("Remove Error:", err);
      setCartItems(prevItems); // rollback
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