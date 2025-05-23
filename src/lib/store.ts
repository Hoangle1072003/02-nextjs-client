import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "@/lib/features/order/orderSlice";
import cartReducer from "@/lib/features/cart/cartSlice";
import productReducer from "@/lib/features/product/productSlice";
import drawerReducer from "@/lib/features/draw/drawerSlice";
import authUserLogin from "@/lib/features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      salesList: orderReducer,
      cart: cartReducer,
      productDetails: productReducer,
      drawer: drawerReducer,
      authUser: authUserLogin,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
