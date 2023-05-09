import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

import { getRequest } from "../utils/ProfileMethods";

export const getPosts = createAsyncThunk("user/posts", async (token) => {
  const [data, err] = await getRequest("/getPosts");
  return data;
});
export const addLike = createAsyncThunk(
  "posts/addLike",
  async (id, { rejectWithValue, getState }) => {
    let userId = getState().user.userData.user._id;

    try {
      const { data } = await axios.put(`/posts/likes/${id}`);
      return { id, userId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, content }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/posts/comments/${postId}`, {
        content,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const PostReducer = createSlice({
  name: "user/post",
  initialState: {
    posts: undefined,
  },
  reducers: {
    addPost: (state, { payload }) => {},
  },
  extraReducers: {
    [getPosts.pending]: (state, { payload }) => {},
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
    [getPosts.rejected]: (state, { payload }) => {},
    // add likes
    [addLike.fulfilled]: (state, { payload }) => {
      const { id, userId } = payload;
      state.posts = state.posts.filter(function (p, index) {
        if (this[index]._id == id) {
          if (p.likes.includes(userId)) {
            this[index].likes = this[index].likes.filter((id) => id != userId);
          } else this[index].likes.push(userId);
        }
        return this[index];
      }, state.posts);
    },
    [addComment.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
  },
});
export default PostReducer.reducer;
export const { addPost } = PostReducer.actions;
