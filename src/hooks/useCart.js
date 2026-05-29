import { useDispatch, useSelector } from "react-redux";

import {
  addItemToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
  clearCart,
} from "../redux/slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart
  );

  return {
    ...cart,

    addItemToCart: (product) =>
      dispatch(addItemToCart(product)),

    increaseQuantity: (foodId, currentQty) =>
      dispatch(
        increaseQuantity({
          foodId,
          currentQty,
        })
      ),

    decreaseQuantity: (foodId, currentQty) =>
      dispatch(
        decreaseQuantity({
          foodId,
          currentQty,
        })
      ),

    removeItemFromCart: (foodId) =>
      dispatch(removeItemFromCart(foodId)),

    clearCart: () =>
      dispatch(clearCart()),
  };
};