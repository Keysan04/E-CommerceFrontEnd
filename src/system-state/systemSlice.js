import { createSlice } from "@reduxjs/toolkit";
let i = 0;
const initialState = {
  showCart: false,
  counter: i + 1,
  payment: 0,
  cartItems: {},
};
const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setShowCart: (state, { payload }) => {
      state.showCart = payload;
    },
    setCounter: (state, { payload }) => {
      state.counter = payload;
    },
    setPayment: (state, { payload }) => {
      state.payment = payload;
    },
    setCartItems: (state, { payload }) => {
      state.cartItems = payload;
    },
  },
});

const { reducer, actions } = systemSlice;

export const { setShowCart, setCounter, setPayment, setCartItems } = actions;
export default reducer;
