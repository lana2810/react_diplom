// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import localStorageService from "../api/localStorage.service";

const initialState = {
  items: localStorageService.getCart() || [],
};

export const cartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemsAdd: (state, action) => {
      const sameIndex = state.items.findIndex(
        (it) => it.id === action.payload.id && it.size === action.payload.size
      );
      if (sameIndex === -1) {
        state.items = [...state.items, action.payload];
      } else {
        const tmpItems = [...state.items];
        tmpItems[sameIndex].count += action.payload.count;
        state.items = [...tmpItems];
      }

      localStorageService.updateCart(state.items);
    },
    itemsRemoveItem: (state, action) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id && item.size !== action.payload.size
      );
      localStorageService.updateCart(state.items);
    },

    cartRemove: (state) => {
      state.items = [];
      localStorageService.deleteCart();
    },
  },
});

export const { itemsAdd, itemsRemoveItem, cartRemove } = cartSlice.actions;

export default cartSlice.reducer;
