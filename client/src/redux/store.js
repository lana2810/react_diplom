import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import itemsReducer from "./itemsSlice";
import cartReducer from "./cartSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(saga);
