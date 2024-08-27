import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setLoading, setUserInfo, setError } = loginSlice.actions;

export const loginSelector = (state) => state.login;

export default loginSlice.reducer;

// export const loginUser = (email, password) => async (dispach, getState) => {}
