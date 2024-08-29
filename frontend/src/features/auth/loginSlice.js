import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let userInfoFormStorage = null;
try {
  userInfoFormStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
} catch (error) {
  userInfoFormStorage = null;
}

const initialState = {
  loading: false,
  userInfo: userInfoFormStorage,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.userInfo = null;
      state.error = null;
    },
    setUserInfo: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.error = payload;
    },
    setLogout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    },
  },
});

export const { setLoading, setUserInfo, setError, setLogout } =
  loginSlice.actions;

export const loginSelector = (state) => state.login;

export default loginSlice.reducer;

export const loginUser = (email, password) => async (dispatch, getState) => {
  try {
    dispatch(setLoading());
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      config
    );
    dispatch(setUserInfo(data));
    localStorage.setItem("userInfo", JSON.stringify(getState().login.userInfo));
  } catch (err) {
    const error =
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

export const userLogout = () => async (dispatch) => {
  dispatch(setLogout());
  localStorage.clear();
};
