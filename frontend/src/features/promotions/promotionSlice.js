import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  promotions: null,
  error: null,
};

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.promotions = null;
      state.error = null;
    },
    setPromotions: (state, { payload }) => {
      state.loading = false;
      state.promotions = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.promotions = false;
      state.error = payload;
    },
  },
});

export const { setLoading, setPromotions, setError } = promotionSlice.actions;

export const promotionSelector = (state) => state.promotions;

export default promotionSlice.reducer;

export const getPromotions = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const config = {
      headers: {
        "content-type": "applications/json",
      },
    };
    const { data } = await axios.get("/api/promotions", config);
    dispatch(setPromotions(data));
  } catch (err) {
    const error =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(setError(error));
  }
};
