import { configureStore } from "@reduxjs/toolkit";
import productDetailSlice from "./products/productDetail";
import productListSlice from "./products/productList";

const store = configureStore({
  reducer: {
    productList: productListSlice,
    productDetail: productDetailSlice,
  },
});

export default store;
