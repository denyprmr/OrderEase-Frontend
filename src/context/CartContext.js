import { createContext, useState, useEffect } from "react";
import {
  getToCart,
  addToCart,
  updateCartItem,

} from "../api/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await getToCart();
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ================= ADD ITEM =================
  const addItemToCart = async (product) => {
  if (!product) return alert("Please login first!");

    const productId = product._id || product.id;
    if (!productId) return alert("Product ID not found!");

    try {
      await addToCart(productId, 1);

      // 🔥 Always sync from backend
      await loadCart();
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add item to cart.");
    }
  };

  // ================= REMOVE ITEM =================
  const removeItemFromCart = async (cartItemId) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => item.cartItemId !== cartItemId)
      );

      // await removeFromAPI(cartItemId);
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Could not remove item. Please try again.");
    }
  };

  // ================= INCREASE QUANTITY =================
  const increaseQuantity = async (cartItemId) => {
    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    const newQty = (item.quantity || 1) + 1;
    await updateCartItem(cartItemId, newQty);

    setCartItems((prev) =>
      prev.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i
      )
    );
  };

  // ================= DECREASE QUANTITY =================
  const decreaseQuantity = async (cartItemId) => {
    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    const newQty = Math.max((item.quantity || 1) - 1, 1);
    await updateCartItem(cartItemId, newQty);

    setCartItems((prev) =>
      prev.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i
      )
    );
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