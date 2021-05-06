import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as types from "../constants/actionTypes";
// import { readDataFromFireBase } from "../actions/index";
import {
  createPost,
  readDataFromFireBase,
  handleComment,
} from "../../services/firebaseService";

// const blogReducer = createReducer(
//   {
//     data: {},
//   },
//   (builder) => {
//     builder.addCase(types.READ_DATA, (state, action) => {
//       // "mutate" the array by calling push()
//       const newState = { ...state };
//       newState.data = action.payload;
//       return newState;
//     });
//   }
// );
export const fetchBlogData = createAsyncThunk("blogs/fetchBlog", async () => {
  const response = await readDataFromFireBase();
  return response;
});

export const handleCreatePost = createAsyncThunk(
  "blogs/handleCreatePost",
  async (params) => {
    const response = await createPost(params);
    return response;
  }
);

export const handleSubmitComment = createAsyncThunk(
  "blogs/handleComment",
  async (params, thunkAPI) => {
    await handleComment(params);
    thunkAPI.dispatch(fetchBlogData());
  }
);

const initialState = { data: {}, loading: true, error: "", isSuccess: false };

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
      newState.isSuccess = true;
      return newState;
    },
    // blogs/handleCreatePost/rejected

    [handleCreatePost.rejected]: (state, action) => {
      const newState = { ...state };
      newState.error = action.error;
      newState.isSuccess = false;
      return newState;
    },
    // blogs/handleCreatePost/pending

    [handleCreatePost.pending]: (state) => {
      const newState = { ...state };
      newState.isSuccess = false;
      return newState;
    },
    // blogs/handleComment
    // [handleSubmitComment.fulfilled]: (state, action) => {
    //   const newState = { ...state };
    //   newState.data = action.payload;
    //   newState.loading = false;
    //   return newState;
    // },
    // [handleSubmitComment.rejected]: (state, action) => {
    //   const newState = { ...state };
    //   newState.loading = false;
    //   newState.error = action.error;
    //   return newState;
    // },
    // [handleSubmitComment.pending]: (state) => {
    //   const newState = { ...state };
    //   newState.loading = true;
    //   return newState;
    // },
  },
});

export const { readData } = blogReducer.actions;

export default blogReducer.reducer;
