import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  addToCart,
  getToCart,
  updateCartItem,
  removeCartItem,
  clearCart as clearCartAPI,
} from "../../api/api";



const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};



/* =========================
   LOAD CART
========================= */

export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (_, thunkAPI) => {
    try {
      const res = await getToCart();

      const normalized = (
        Array.isArray(res) ? res : []
      ).map((item) => ({
        ...item,
        quantity: Number(item.quantity) || 0,
      }));

      return normalized;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Load Cart Failed"
      );
    }
  }
);



/* =========================
   ADD TO CART
========================= */

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (product, thunkAPI) => {
    try {
      const productId = product._id || product.id;

      await addToCart(productId, 1);

      thunkAPI.dispatch(loadCart());

      return productId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Add To Cart Failed"
      );
    }
  }
);



/* =========================
   INCREASE QUANTITY
========================= */

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ foodId, currentQty }, thunkAPI) => {
    try {
      const qty = Number(currentQty) || 0;
      const newQty = qty + 1;

      await updateCartItem(foodId, newQty);

      return {
        foodId,
        quantity: newQty,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Increase Failed"
      );
    }
  }
);



/* =========================
   DECREASE QUANTITY
========================= */

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ foodId, currentQty }, thunkAPI) => {
    try {
      const qty = Number(currentQty) || 0;

      if (qty <= 1) {
        await removeCartItem(foodId);

        return {
          remove: true,
          foodId,
        };
      }

      const newQty = qty - 1;

      await updateCartItem(foodId, newQty);

      return {
        remove: false,
        foodId,
        quantity: newQty,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Decrease Failed"
      );
    }
  }
);



/* =========================
   REMOVE ITEM
========================= */

export const removeItemFromCart =
  createAsyncThunk(
    "cart/removeItemFromCart",
    async (foodId, thunkAPI) => {
      try {
        await removeCartItem(foodId);

        return foodId;
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.message || "Remove Failed"
        );
      }
    }
  );



/* =========================
   CLEAR CART
========================= */

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      await clearCartAPI();

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Clear Cart Failed"
      );
    }
  }
);



/* =========================
   SLICE
========================= */

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* LOAD CART */
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })

      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      /* ADD TO CART */
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



      /* INCREASE */
      .addCase(
        increaseQuantity.fulfilled,
        (state, action) => {
          const item = state.cartItems.find(
            (i) =>
              i.foodId === action.payload.foodId
          );

          if (item) {
            item.quantity =
              action.payload.quantity;
          }
        }
      )



      /* DECREASE */
      .addCase(
        decreaseQuantity.fulfilled,
        (state, action) => {
          if (action.payload.remove) {
            state.cartItems =
              state.cartItems.filter(
                (item) =>
                  item.foodId !==
                  action.payload.foodId
              );

            return;
          }

          const item = state.cartItems.find(
            (i) =>
              i.foodId === action.payload.foodId
          );

          if (item) {
            item.quantity =
              action.payload.quantity;
          }
        }
      )



      /* REMOVE ITEM */
      .addCase(
        removeItemFromCart.fulfilled,
        (state, action) => {
          state.cartItems =
            state.cartItems.filter(
              (item) =>
                item.foodId !== action.payload
            );
        }
      )



      /* CLEAR CART */
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});



export default cartSlice.reducer;