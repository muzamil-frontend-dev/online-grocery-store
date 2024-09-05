import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutUser } from '../auth/loginSlice';

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const orderListSlice = createSlice({
  name: 'orderList',
  initialState: initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.orders = [];
      state.error = null;
    },
    setOrders: (state, { payload }) => {
      state.loading = false;
      state.orders = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.orders = [];
      state.error = payload;
    },
  },
});

const { setError, setLoading, setOrders } = orderListSlice.actions;

export const orderListSelector = (state) => state.orderList;

export default orderListSlice.reducer;

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const { token } = getState().login.userInfo;

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get('/api/orders', config);
    dispatch(setOrders(data));
  } catch (err) {
    let errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;

    if (err.response && err.response.status === 401) {
      dispatch(logoutUser());
    }

    dispatch(setError(errorMessage));
  }
};
