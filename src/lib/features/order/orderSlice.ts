import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "salesList",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
