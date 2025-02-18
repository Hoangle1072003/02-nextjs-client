import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "authUser",
  initialState: {
    user: {
      email: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
