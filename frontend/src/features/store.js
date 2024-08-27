import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
