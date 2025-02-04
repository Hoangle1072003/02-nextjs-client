import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        successMessage: ''
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
            state.successMessage = 'Thêm vào giỏ hàng thành công!';
        },
        resetMessage: (state) => {
            state.successMessage = '';
        }
    }
});

export const {addToCart, resetMessage} = cartSlice.actions;
export default cartSlice.reducer;
