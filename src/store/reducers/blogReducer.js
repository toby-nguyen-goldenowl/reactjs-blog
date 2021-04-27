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
    builder.addCase(types.SAVE_DATA, (state, action) => {
      // "mutate" the array by calling push()
      const newState = { ...state };
      const newData = { ...action.payload.dataOld };
      newData[action.payload.id].comments = action.payload.comments;
      newState.data = newData;
      return newState;
    });
  }
);
export default blogReducer;
