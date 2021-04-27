// import { createAction } from "@reduxjs/toolkit";
import * as types from "../constants/actionTypes";
// const authUser = createAction(types.AUTH_USERID);

export const authUser = (payload) => ({
  type: types.AUTH_USERID,
  payload,
});
// const authUser = (user) => ({
//   type: types.AUTH_USERID,
//   user,
// });

export const readBlog = (payload) => ({
  type: types.READ_DATA,
  payload,
});
