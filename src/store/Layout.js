import { createSlice } from "@reduxjs/toolkit";

const Layout = createSlice({
  name: "layout",
  initialState: {
    status: false,
    children: [],
  },
  reducers: {
    toggle: (state, payload) => {
      state.status = !state.status;
    },
    pushChildren: (state, { payload }) => {
      state.status = true;
      state.children = [];
      state.children = [...state.children, payload];
    },
    clear: (state) => {
      state.children = [];
    },
  },
});
export default Layout.reducer;
export const { toggle, pushChildren, clear } = Layout.actions;
