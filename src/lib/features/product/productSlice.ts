import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productDetails",
  initialState: {
    product: {},
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
