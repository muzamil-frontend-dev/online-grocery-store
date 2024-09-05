import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "../auth/loginSlice";

const initialState = {
  loading: false,
  order: null,
  error: null,
  success: false,
};

const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.order = null;
    },
    setOrder: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.order = payload;
      state.success = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.order = null;
      state.success = false;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.order = null;
      state.success = false;
    },
  },
});

const { setError, setLoading, setOrder, reset } = orderCreateSlice.actions;

export const orderCreateSelector = (state) => state.orderCreate;

export default orderCreateSlice.reducer;

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch(setOrder(data));
  } catch (err) {
    let error =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      dispatch(logoutUser());
    }

    dispatch(setError(error));
  }
};

export const resetRegister = () => (dispatch) => {
  dispatch(reset());
};
