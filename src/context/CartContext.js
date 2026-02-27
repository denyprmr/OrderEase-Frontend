import { createContext, useState } from "react";
import {
  addToCart,
  updateCartItem,
  removeFromCartAPI,
} from "../api/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // 🔥 MUST HAVE THIS
  const [cartItems, setCartItems] = useState([]);

  // ================= ADD ITEM =================
  const addItemToCart = async (product) => {

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    const productId = product._id || product.id;

    if (!productId) {
      alert("Product ID not found!");
      return;
    }

    try {

      await addToCart(productId, 1);

      setCartItems((prev) => {

        const existingItem = prev.find(
          (item) => (item._id || item.id) === productId
        );

        if (existingItem) {
          return prev.map((item) =>
            (item._id || item.id) === productId
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });

    } catch (error) {
      alert("Failed to add item");
    }
  };

  // ================= REMOVE =================
  const removeItemFromCart = async (id) => {

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {

      await removeFromCartAPI(id);

      setCartItems((prev) =>
        prev.filter((item) => (item._id || item.id) !== id)
      );

    } catch (error) {
      alert("Failed to remove item");
    }
  };

  // ================= INCREASE =================
  const increaseQuantity = async (id) => {

    const item = cartItems.find(
      (i) => (i._id || i.id) === id
    );

    if (!item) return;

    const newQty = (item.quantity || 1) + 1;

    await updateCartItem(id, newQty);

    setCartItems((prev) =>
      prev.map((i) =>
        (i._id || i.id) === id
          ? { ...i, quantity: newQty }
          : i
      )
    );
  };

  // ================= DECREASE =================
  const decreaseQuantity = async (id) => {

    const item = cartItems.find(
      (i) => (i._id || i.id) === id
    );

    if (!item) return;

    const newQty = (item.quantity || 1) - 1;

    if (newQty <= 0) {
      await removeFromCartAPI(id);

      setCartItems((prev) =>
        prev.filter((i) =>
          (i._id || i.id) !== id
        )
      );
    } else {

      await updateCartItem(id, newQty);

      setCartItems((prev) =>
        prev.map((i) =>
          (i._id || i.id) === id
            ? { ...i, quantity: newQty }
            : i
        )
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};