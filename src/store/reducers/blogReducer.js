import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import * as types from "../constants/actionTypes";
import { readDataFromFireBase } from "../actions/index";

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
  return response.data;
});

const initialState = { data: {} };

const blogReducer = createSlice({
  name: "blog",
  initialState,
  reducers: {
    readData: (state, action) => {
      // "mutate" the array by calling push()
      const newState = { ...state };
      newState.data = action.payload;
      return newState;
    },
  },
  extraReducers: {
    [fetchBlogData.fulfilled]: (state, action) => {
      // Add user to the state array
      state.data.push(action.payload);
    },
  },
});

export const { readData } = blogReducer.actions;

export default blogReducer.reducer;
