import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutUser } from '../auth/loginSlice';

const initialState = {
  loading: false,
  order: null,
  error: null,
};

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.order = null;
    },
    setOrder: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.order = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.order = null;
    },
  },
});

const { setError, setLoading, setOrder } = orderDetailSlice.actions;

export const orderDetailSelector = (state) => state.orderDetail;

export default orderDetailSlice.reducer;

export const getOrderDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch(setOrder(data));
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;

    if (error.response && error.response.status === 401) {
      dispatch(logoutUser());
    }

    dispatch(setError(errorMessage));
  }
};
