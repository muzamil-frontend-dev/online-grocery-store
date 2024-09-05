import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resetUserCart } from "../cart/cartSlice";
let userInfoFromStorage = null;
try {
  userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
} catch (error) {
  userInfoFromStorage = null;
}

const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
      state.userInfo = null;
    },
    setUserInfo: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userInfo = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.userInfo = null;
    },
    setLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
  },
});

const { setError, setLoading, setUserInfo, setLogout } = loginSlice.actions;

export const loginSelector = (state) => state.login;

export default loginSlice.reducer;

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    let config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/auth/login`,
      {
        email,
        password,
      },
      config
    );
    dispatch(setUserInfo(data));
    localStorage.setItem("userInfo", JSON.stringify(getState().login.userInfo));
  } catch (err) {
    let error =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(setError(error));
  }
};

export const setUserInfoByRegister = (userInfo) => async (dispatch) => {
  dispatch(setUserInfo(userInfo));
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const logoutUser = () => async (dispatch) => {
  dispatch(setLogout());
  dispatch(resetUserCart());
  localStorage.clear();
};
