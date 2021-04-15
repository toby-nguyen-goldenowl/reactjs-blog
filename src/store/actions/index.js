import { createAction } from "@reduxjs/toolkit";
import * as types from "../constants/actionTypes";
const authUser = createAction(types.AUTH_USERID);

// const authUser = (user) => ({
//   type: types.AUTH_USERID,
//   user,
// });

export default authUser;
