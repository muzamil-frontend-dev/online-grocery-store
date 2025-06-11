import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  product: null,
  error: null,
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.product = null;
      state.error = null;
    },
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.product = null;
      state.error = payload;
    },
  },
});

const { setLoading, setProduct, setError } = productDetailSlice.actions;

export const productDetailSelector = (state) => state.productDetail;

export default productDetailSlice.reducer;

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setError(errorMessage));
  }
};
