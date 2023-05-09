import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const settingSlice = createSlice({
  name: "setting",
  initialState: {
    theme: "dark",
  },
});
