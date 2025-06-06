import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      state.error = null;
      state.product = null;
    },
    setProduct: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.product = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.product = null;
    },
  },
});

const { setError, setLoading, setProduct } = productDetailSlice.actions;

export const productDetailSelector = (state) => state.productDetail;

export default productDetailSlice.reducer;

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(setProduct(data));
  } catch (err) {
    let error =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(setError(error));
  }
};
