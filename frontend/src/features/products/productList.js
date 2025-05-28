import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
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

const { setLoading, setProducts, setError } = productListSlice.actions;

export const productListSelector = (state) => state.productList;

export default productListSlice.reducer;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get("/api/products");
    console.log("data: ", data);
    dispatch(setProducts(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
