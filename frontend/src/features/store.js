import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/loginSlice";
import registerSlice from "./auth/registerSlice";
import promotionSlice from "./promotions/promotionSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
    promotions: promotionSlice,
  },
});

export default store;
