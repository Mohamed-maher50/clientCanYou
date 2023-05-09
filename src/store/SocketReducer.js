import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
const getSocket = createAsyncThunk("Socket.io/getSocket", async () => {
  //https://canyou.onrender.com/
  const socket = await io("http://localhost:4000");
  return socket;
});

const socketIo = createSlice({
  name: "Socket.io",
  initialState: {
    sockets: undefined,
  },

  extraReducers: {
    [getSocket.fulfilled]: (state, { payload }) => {
      state.sockets = payload;
    },
  },
});
export { getSocket };
export default socketIo.reducer;
