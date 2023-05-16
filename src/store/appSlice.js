import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("No friends");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    delPost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    getPost: (state, action) => {
      return state.posts.find((post) => post._id === action.payload);
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setFriends,
  setLogin,
  setLogout,
  setPost,
  setPosts,
  delPost,
  getPost,
} = appSlice.actions;

export default appSlice.reducer;
