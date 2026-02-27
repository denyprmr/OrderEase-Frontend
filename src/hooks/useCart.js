import { useState } from "react";

function useCart() {

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return { cart, addToCart, removeFromCart };
}

export default useCart;