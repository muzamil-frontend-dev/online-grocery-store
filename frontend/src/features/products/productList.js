import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  products: [],
  error: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.products = [];
      state.error = null;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.products = [];
      state.error = payload;
    },
  },
});

const { setLoading, setError, setProducts } = productListSlice.actions;

export const productListSelector = (state) => state.productList;

export default productListSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get("/api/products");
    dispatch(setProducts(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
