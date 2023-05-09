import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { io } from "socket.io-client";
const getSocket = createAsyncThunk("chat/getSocket", async () => {
  //https://canyou.onrender.com/
  const socket = await io("http://localhost:4000");
  return socket;
});
export const getChatId = createAsyncThunk(
  "chat/getChatId",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`chat/${id}`);
      console.log(data);
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const chatReducer = createSlice({
  name: "chat",
  initialState: {
    chats: [],
  },
  reducers: {
    pushToChat: (state, { payload }) => {
      let chatIsExist = state.chatsId.find((chat) => chat._id === payload._id);
      if (!chatIsExist) state.chatsId = [...state.chatsId, payload];
    },
    removeChat: (state, { payload }) => {
      let cloneChat = state.chats.filter((chat) => {
        return chat._id !== payload;
      });
      state.chats = cloneChat;
    },
    newMessage: (state, { payload }) => {
      let findIndexOfChat = state.chats.findIndex(function (ch) {
        return ch._id == payload.chatId;
      });
      if (findIndexOfChat > -1)
        state.chats[findIndexOfChat].messages.push(payload);
    },
  },
  extraReducers: {
    [getChatId.fulfilled]: (state, { payload }) => {
      const checkExist = state.chats.findIndex((cht) => cht._id == payload._id);
      if (checkExist < 0)
        state.chats = [...state.chats, { ...payload, isActive: true }];
    },
  },
});

export default chatReducer.reducer;
export const { pushToChat, removeChat, newMessage } = chatReducer.actions;
