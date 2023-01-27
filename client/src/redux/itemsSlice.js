import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  currentCategory: undefined,
  search: "",
  loading: false,
  error: null,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    itemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    itemsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    itemsSuccessAdd: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.loading = false;
      state.error = null;
    },
    setCurrentCategory: (state, action) => {
      state.items = [];
      state.currentCategory = action.payload.currentCategory;
    },
    changeSearchField: (state, action) => {
      state.search = action.payload.q;
    },
  },
});

export const {
  itemsRequest,
  itemsFailure,
  itemsSuccess,
  itemsSuccessAdd,
  setCurrentCategory,
  changeSearchField,
} = itemsSlice.actions;

export default itemsSlice.reducer;
