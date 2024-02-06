import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  category: [],
  product: [],
  selectedProduct: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setCat: (state, { payload }) => {
      state.category = payload;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
    },
    setAProduct: (state, { payload }) => {
      state.selectedProduct = payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser, setCat, setProduct, setAProduct } = actions;
export default reducer;
