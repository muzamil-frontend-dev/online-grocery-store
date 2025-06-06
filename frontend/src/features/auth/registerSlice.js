import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUserInfoByRegister } from "./loginSlice";

const initialState = {
  loading: false,
  success: false,
  error: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    setSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

const { setError, setLoading, setSuccess, reset } = registerSlice.actions;

export const registerSelector = (state) => state.register;

export default registerSlice.reducer;

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/auth/register`,
      {
        name,
        email,
        password,
      },
      config
    );
    dispatch(setSuccess());
    // data need to be add in login userinfo
    dispatch(setUserInfoByRegister(data));
  } catch (err) {
    let error =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(setError(error));
  }
};

export const resetRegister = () => async (dispatch) => {
  dispatch(reset());
};
