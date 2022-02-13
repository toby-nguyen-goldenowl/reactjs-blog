import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  readDataFromFireBase,
  handleComment,
  handleSave,
  handleLike,
} from "../../services/firebaseService";

export const fetchBlogData = createAsyncThunk("blogs/fetchBlog", async () => {
  const response = await readDataFromFireBase();
  return response;
});

export const handleCreatePost = createAsyncThunk(
  "blogs/handleCreatePost",
  async (params) => {
    await createPost(params);
  }
);

export const handleSubmitComment = createAsyncThunk(
  "blogs/handleComment",
  async (params, thunkAPI) => {
    await handleComment(params);
    thunkAPI.dispatch(fetchBlogData());
  }
);

export const handleLikeBlogItem = createAsyncThunk(
  "blogs/handleLike",
  async (params, thunkAPI) => {
    await handleLike(params);
    thunkAPI.dispatch(fetchBlogData());
  }
);
export const handleSavedBlogItem = createAsyncThunk(
  "blogs/handleSave",
  async (params) => {
    await handleSave(params);
    const response = await readDataFromFireBase();
    return response;
  }
);

const initialState = { data: {}, loading: true, error: "" };

const blogReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    readData: (state, action) => {
      const newState = { ...state };
      newState.data = action.payload;
      return newState;
    },
  },
  extraReducers: {
    // use for fetch Blog Data
    [fetchBlogData.fulfilled]: (state, action) => {
      const newState = { ...state };
      newState.data = action.payload;
      newState.loading = false;
      return newState;
    },
    [fetchBlogData.rejected]: (state, action) => {
      const newState = { ...state };
      newState.loading = false;
      newState.error = action.error;
      return newState;
    },
    [fetchBlogData.pending]: (state) => {
      const newState = { ...state };
      newState.loading = true;
      return newState;
    },
    // use for fetch Blog Data
    // blogs/handleCreatePost/fulfilled
    [handleCreatePost.fulfilled]: (state) => {
      const newState = { ...state };
      return newState;
    },
    // blogs/handleCreatePost/rejected

    [handleCreatePost.rejected]: (state, action) => {
      const newState = { ...state };
      newState.error = action.error;
      return newState;
    },
    // blogs/handleCreatePost/pending

    [handleCreatePost.pending]: (state) => {
      const newState = { ...state };
      return newState;
    },
    [handleSavedBlogItem.fulfilled]: (state, action) => {
      const newState = { ...state };
      newState.data = action.payload;
      return newState;
    },
    [handleSavedBlogItem.rejected]: (state, action) => {
      const newState = { ...state };
      newState.error = action.error;
      return newState;
    },
    [handleSavedBlogItem.pending]: (state) => {
      const newState = { ...state };
      return newState;
    },
  },
});

export const { readData } = blogReducer.actions;

export default blogReducer.reducer;
