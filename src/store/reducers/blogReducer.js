import { createReducer } from "@reduxjs/toolkit";
import * as types from "../constants/actionTypes";

const blogReducer = createReducer(
  {
    data: {},
  },
  (builder) => {
    builder.addCase(types.READ_DATA, (state, action) => {
      // "mutate" the array by calling push()
      const newState = { ...state };
      newState.data = action.payload;
      return newState;
    });
  }
);
export default blogReducer;
