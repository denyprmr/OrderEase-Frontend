import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectedCategory } =
  productSlice.actions;

export default productSlice.reducer;