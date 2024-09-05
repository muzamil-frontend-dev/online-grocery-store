import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/loginSlice";
import registerSlice from "./auth/registerSlice";
import cartSlice from "./cart/cartSlice";
import productDetailSlice from "./products/productDetail";
import productListSlice from "./products/productList";
import orderCreateSlice from "./order/orderCreateSlice";
import orderDetailSlice from "./order/orderDetailSlice";
import orderListSlice from "./order/orderListSlice";
import orderPaySlice from "./order/orderPaySlice";

const store = configureStore({
  reducer: {
    productList: productListSlice,
    productDetail: productDetailSlice,
    cart: cartSlice,
    login: loginSlice,
    register: registerSlice,
    orderDetail: orderDetailSlice,
    orderList: orderListSlice,
    orderCreate: orderCreateSlice,
    orderPay: orderPaySlice,
  },
});

export default store;
