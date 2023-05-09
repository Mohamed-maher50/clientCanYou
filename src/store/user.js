import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "..";

const loginAuth = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    const { data } = await axios.post("auth/login", formData);
    if (!data) return rejectWithValue(data.response);
    return data;
  }
);
const registerAuth = createAsyncThunk(
  "user/registerAuth",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const changeProfilePicture = createAsyncThunk(
  "user/changeProfilePicture",
  async (payload, { getState }) => {
    try {
      const { data } = await axios.put("/avatar", payload);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = JSON.parse(localStorage.getItem("userInfo")) || false;
const addSkill = createAsyncThunk(
  "addSkill",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/addSkill", { data: payload });
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  }
);
const userReducer = createSlice({
  name: "user",
  initialState: {
    userData: initialState,
  },
  reducers: {
    updateUser: (state, { payload }) => {
      localStorage.setItem("userInfo", payload);
      state.userData = JSON.parse(payload);
    },
    logOut: (state, { payload }) => {
      state.userData = false;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: {
    [loginAuth.pending]: (state, { payload }) => {},
    [loginAuth.fulfilled]: (state, { payload }) => {
      state.userData = payload;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    },
    [loginAuth.rejected]: (state, d) => {},
    [registerAuth.pending]: (state) => {},
    [registerAuth.fulfilled]: (state, { payload }) => {
      state.userData = JSON.parse(payload);
      localStorage.setItem("userInfo", payload);
    },
    [registerAuth.rejected]: (state, { payload }) => {},
    [changeProfilePicture.pending]: (state, { payload }) => {},
    [changeProfilePicture.fulfilled]: (state, { payload }) => {
      const { user } = payload;

      state.userData.user = user;
      localStorage.setItem("userInfo", JSON.stringify(state.userData));
    },
    [addSkill.fulfilled]: (state, { payload }) => {
      state.userData.user.skills = payload;
    },
  },
});
export default userReducer.reducer;
export const { updateUser, logOut } = userReducer.actions;
export { loginAuth, registerAuth, addSkill };
