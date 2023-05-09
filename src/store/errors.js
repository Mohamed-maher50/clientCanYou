import { createSlice } from "@reduxjs/toolkit";

const errorHandlerReducer = createSlice({
  name: "errors/handle",
  initialState: {
    errors: [],
  },
  reducers: {
    pushError: (state, { payload }) => {
      state.errors = [...state.errors, payload];
    },
    clearErrors: (state, { payload }) => {
      state.errors = [];
    },
  },
});
export default errorHandlerReducer.reducer;
export const { pushError, clearErrors } = errorHandlerReducer.actions;
